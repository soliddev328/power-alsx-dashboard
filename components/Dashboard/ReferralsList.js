import { useEffect, useState } from "react";
import cn from "classnames";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import Section from "../Section";
import Text from "../Text";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const mapDetails = data => {
  const allItems = [];

  data?.contacts?.forEach(element => {
    allItems.push(element);
  });

  data?.leads?.forEach(element => {
    allItems.push(element);
  });

  return allItems;
};

const getUserData = async (userUid, idToken) => {
  const { data } = await axios.get(`${API}/v1/subscribers/${userUid}`, {
    headers: {
      Authorization: idToken
    }
  });
  return data && data.data;
};

const getReferralsDataDetails = async (username, idToken) => {
  const { data } = await axios.get(
    `${API}/v1/subscribers/referrals/details/${username}`,
    {
      headers: {
        Authorization: idToken
      }
    }
  );

  return data && data.data && data.data[0];
};

export default function ReferralsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState();
  const [referralsDetails, setReferralsDetails] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(async idToken => {
          const userInfo = await getUserData(user.uid, idToken);
          if (userInfo) {
            const referralsInfoDetails = await getReferralsDataDetails(
              userInfo.username,
              idToken
            );

            setReferralsDetails(referralsInfoDetails);
            setIsLoading(false);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    setContacts(mapDetails(referralsDetails));
  }, [referralsDetails]);

  const renderItems = () => {
    return (
      <ul>
        {contacts?.map((item, index) => {
          return (
            <li
              key={`referral-${index}`}
              className={cn({ active: item.status === "Enrolled" })}
            >
              <div className="status-name">
                {item.name ? (
                  <>
                    <Text noMargin>{item.name || item.email}</Text>
                    <Text noMargin small>
                      {item.email}
                    </Text>
                  </>
                ) : (
                  <Text noMargin>{item.email}</Text>
                )}
                {item.status === "Lead Created" && (
                  <Text small>(has not signed up)</Text>
                )}
              </div>
              <div className="status-indicator">
                <Text noMargin>$50</Text>
                <div className="status" />
              </div>
            </li>
          );
        })}
        <style jsx>{`
          ul {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1em 0.5em;
          }

          li:nth-child(even) {
            background-color: #f8f8f9;
          }

          li:not(.active) {
            opacity: 0.6;
          }

          .status-indicator {
            display: flex;
            align-items: center;
          }

          .status {
            width: 24px;
            height: 24px;
            border: 1px solid #2479ff;
            padding: 2px;
            margin-top: -1px;
            margin-left: 10px;
            border-radius: 12px;
            position: relative;
          }

          li.active .status:before {
            display: block;
            content: "";
            height: 16px;
            width: 16px;
            background-color: #2479ff;
            position: absolute;
            left: 50%;
            top: 50%;
            border-radius: 8px;
            transform: translate(-50%, -50%);
          }

          .status-name {
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </ul>
    );
  };

  const renderLoader = () => {
    return (
      <div className="wrapper">
        <FadeLoader
          className="spinner"
          height={15}
          width={4}
          radius={1}
          color={"#FF69A0"}
          loading
        />
        <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  };

  return (
    <Section tableSection>
      <Text h3 noMargin>
        Your Referrals
      </Text>
      {isLoading ? renderLoader() : renderItems()}
    </Section>
  );
}
