import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { withFirebase } from "../../firebase";
import { useStateValue } from "../../state";
import Container from "../../components/Container";
import Text from "../Text";
import axios from "axios";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const getUserData = async (userUid, idToken) => {
  const response = await axios.get(`${API}/v1/subscribers/${userUid}`, {
    headers: {
      Authorization: idToken
    }
  });
  return response?.data?.data;
};

const getNearbyUsers = async (lat, lon, idToken) => {
  const response = await axios.get(
    `${API}/v1/subscribers/neighborhood/map?lat=${lat}&lon=${lon}`,
    {
      headers: {
        Authorization: idToken
      }
    }
  );
  return response?.data?.data;
};

function UsersInAreaMap(props) {
  const [empty, setEmpty] = useState(false);
  const [mapLocation, setMapLocation] = useState([]);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [{ selectedAccount }] = useStateValue();

  useEffect(() => {
    props.firebase.doUpdateUser(async idToken => {
      const userInfo = await getUserData(user.uid, idToken);

      if (userInfo && userInfo.accounts) {
        const nearbyUsersInfo = await getNearbyUsers(
          userInfo.accounts[selectedAccount.value].address.lat,
          userInfo.accounts[selectedAccount.value].address.lon,
          idToken
        );

        setMapLocation([
          parseFloat(userInfo.accounts[selectedAccount.value].address.lat),
          parseFloat(userInfo.accounts[selectedAccount.value].address.lon)
        ]);

        if (nearbyUsersInfo) {
          setNearbyUsers(nearbyUsersInfo);
        } else {
          setEmpty(true);
        }
      }
    });
  }, [selectedAccount.value]);

  return (
    <div className="wrapper">
      <Container height="250px">
        {mapLocation.length > 0 && (
          <GoogleMapReact
            center={mapLocation}
            zoom={13}
            options={{
              disableDefaultUI: true,
              gestureHandling: "none",
              zoomControl: false
            }}
            overlayViewDivStyle={{ pointerEvents: "none" }}
            bootstrapURLKeys={{
              key: "AIzaSyA1ifW2pZAo6qVj-vVYGI9ab3MHPeW-70w"
            }}
          ></GoogleMapReact>
        )}
      </Container>
      {!empty ? (
        <div className="users-orb">
          <Text h4 bold noMargin>
            {nearbyUsers.length}
          </Text>
          <Text small style={{ marginTop: "10px" }}>
            Common Energy subscribers in your area
          </Text>
        </div>
      ) : (
        <div className="users-orb">
          <Text>There are no subscribers nearby</Text>
        </div>
      )}
      <style jsx>{`
        .wrapper {
          position: relative;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .users-orb {
          position: absolute;
          left: 50%;
          top: 50%;
          background: #fff;
          border-radius: 50%;
          width: 180px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          flex-direction: column;
          padding: 0 20px;
          border: 2px solid #41ef8b;
          transform: translate(-50%, -50%);
        }

        .users-orb:before {
          content: "";
          border-radius: 50%;
          border: 2px solid #2479ff;
          width: 195px;
          height: 195px;
          position: absolute;
        }
      `}</style>
    </div>
  );
}

export default withFirebase(UsersInAreaMap);
