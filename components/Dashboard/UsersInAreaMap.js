import { FadeLoader } from "react-spinners";
import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Container from "../../components/Container";
import Text from "../Text";
import axios from "axios";
import CONSTANTS from "../../globals";
import { runInThisContext } from "vm";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

export default class UsersInAreaMap extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      empty: false,
      loading: false,
      mapLocation: [],
      nearbyUsers: []
    };
  }

  componentDidMount() {
    const { mapLocation, nearbyUsers } = this.state;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(idToken => {
          axios
            .get(`${API}/v1/subscribers/${user.uid}`, {
              headers: {
                Authorization: idToken
              }
            })
            .then(subscribersResponse => {
              mapLocation.push(
                parseFloat(
                  subscribersResponse.data.data.accounts[0].address.lat
                )
              );
              mapLocation.push(
                parseFloat(
                  subscribersResponse.data.data.accounts[0].address.lon
                )
              );

              axios
                .get(
                  `${API}/v1/subscribers/neighborhood/map?lat=${subscribersResponse.data.data.accounts[0].address.lat}&lon=${subscribersResponse.data.data.accounts[0].address.lon}`,
                  {
                    headers: {
                      Authorization: idToken
                    }
                  }
                )
                .then(response => {
                  if (response.data.data) {
                    this.setState({ nearbyUsers: response.data.data });
                  } else {
                    this.setState({ empty: true });
                  }
                })
                .catch(error => {
                  console.error(error);
                });
            });
        });
      } else {
        Router.push({
          pathname: "/"
        });
      }
    });
  }

  render() {
    const { mapLocation, empty, nearbyUsers } = this.state;

    return (
      <div className="wrapper">
        <Container height="250px">
          {mapLocation.length > 0 && (
            <GoogleMapReact
              center={mapLocation}
              zoom={15}
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
            <Text>users in this area</Text>
          </div>
        ) : (
          <div className="users-orb">
            <Text>There are users nearby</Text>
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
}
