import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/Button";
import SegmentedInput from "../../components/SegmentedInput";
import ReferralsList from "../../components/Dashboard/ReferralsList";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const FacebookShare = username => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=https%3A//www.commonenergy.us/referrals?advocate=${username}`,
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,width=800,height=600"
  );
};

const TwitterShare = username => {
  window.open(
    `https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.commonenergy.us%2Freferrals?advocate=${username}`,
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,width=800,height=600"
  );
};

const getUserData = async (userUid, idToken) => {
  const { data } = await axios.get(`${API}/v1/subscribers/${userUid}`, {
    headers: {
      Authorization: idToken
    }
  });
  return data && data.data;
};

function Sharing() {
  const [userData, setUserData] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(async idToken => {
          const userInfo = await getUserData(user.uid, idToken);
          if (userInfo) {
            setUserData(userInfo);
          }
        });
      }
    });
  }, []);

  return (
    <div className="sharing">
      <div className="sharing-actions">
        <div className="email">
          <SegmentedInput hasBorder inputLabel="" buttonText="send" />
        </div>
        <div className="social">
          <Button
            style={{
              marginBottom: 0,

              width: "65px"
            }}
            secondary
            transparent
            share="facebook"
            onClick={() => {
              FacebookShare(userData.username);
              global.analytics.track("Referral Link Clicked", {
                Platform: "Facebook"
              });
            }}
          />
          <Button
            style={{
              marginBottom: 0,
              marginLeft: "10px",

              width: "65px"
            }}
            secondary
            transparent
            share="twitter"
            onClick={() => {
              TwitterShare(userData.username);
              global.analytics.track("Referral Link Clicked", {
                Platform: "Twitter"
              });
            }}
          />
        </div>
        <div className="link">
          <SegmentedInput buttonText="Copy Referral Link" referral hasBorder />
        </div>
      </div>
      <div className="sharing-list">
        <ReferralsList />
      </div>
      <style jsx>{`
        .sharing-actions {
          display: grid;
          grid-template-columns: 3fr 1fr 1fr;
          align-items: end;
          margin-top: -2em;
        }

        .social {
          display: flex;
          padding: 0 1em;
          max-width: 200px;
          margin: 0 auto;
          margin-bottom: 0.5em;
        }

        @media (max-width: 800px) {
          .sharing-actions {
            grid-template-columns: 1fr;
            justify-content: center;
          }
          .social {
            padding-top: 2em;
            padding-bottom: 1em;
            justify-self: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Sharing;
