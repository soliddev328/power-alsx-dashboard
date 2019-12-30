import { useState, useEffect } from "react";
import axios from "axios";
import cn from "classnames";
import { FadeLoader } from "react-spinners";
import Menubar from "./Menubar";
import Text from "./Text";
import Button from "./Button";
import CONSTANTS from "../globals";
import { useStateValue } from "../state";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

export default function Main({ isLoading = true, children, popup = false }) {
  const [displayPopup, setDisplayPopUp] = useState();
  const [{ selectedAccount }] = useStateValue();
  const [accounts, setAccounts] = useState([]);

  const getUserData = async (userUid, idToken) => {
    const { data } = await axios.get(`${API}/v1/subscribers/${userUid}`, {
      headers: {
        Authorization: idToken
      }
    });
    return data && data.data;
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(async idToken => {
          const userData = await getUserData(user.uid, idToken);
          if (userData && userData.accounts) {
            userData.accounts.forEach((item, index) => {
              setAccounts(prevState => [
                ...prevState,
                {
                  value: index,
                  label: item.name
                }
              ]);
            });
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    const hidePopup = localStorage.getItem("hidePopup");
    const currentAccount = accounts[selectedAccount.value] || {};
    if (!hidePopup && currentAccount.onboardingStatus == "Unassigned") {
      setDisplayPopUp(!!popup);
    } else {
      setDisplayPopUp(false);
    }
  }, [popup, selectedAccount.value]);

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

  const renderPopUp = () => (
    <div className="popup">
      <div className="inner">
        <Text h3 style={{ color: "var(--color-primary)" }}>
          Thank you for joining Common Energy!
        </Text>
        <Text>
          We're delighted to have you as a customer and to enable you to save
          money and bring clean energy to your community.
        </Text>
        <Text>
          Your account will be set up shortly. In the meantime, you can increase
          your savings and enable more clean energy by referring your friends.
          <br />
          When you do, both you and your referral will recieve a $50 credit.
          <br />
          Refer 10 friends and receive free $1,000!
        </Text>
        <Button
          primary
          maxWidth="250px"
          onClick={() => {
            setDisplayPopUp(false);
            localStorage.setItem("hidePopup", true);
          }}
        >
          Got it!
        </Button>
      </div>
      <style jsx>{`
        .popup {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          position: absolute;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          min-height: 300px;
          background-color: rgba(255, 255, 255, 0.95);
          text-align: center;
          z-index: 1000;
        }

        .popup .inner {
          max-width: 785px;
          margin: 0 auto;
          border: 1px solid #2479ff;
          background-color: rgba(255, 255, 255, 1);
          border-radius: 5px;
          padding: 2em;
        }

        @media (max-width: 700px) {
          .popup {
            justify-content: flex-start;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );

  return (
    <>
      {displayPopup && renderPopUp()}
      <main className={cn({ "popup-rendered": displayPopup })}>
        <Menubar />
        <div className={cn("content", { loading: isLoading })}>
          {isLoading ? renderLoader() : children}
        </div>
      </main>
      <style jsx>{`
        main {
          display: grid;
          grid-template-columns: 250px 1fr;
        }

        main.popup-rendered {
          max-height: 100vh;
          overflow: hidden;
        }

        .content {
          padding: 40px 70px;
          max-width: 1200px;
          margin: 0;
          overflow-x: hidden;
          user-select: text;
        }

        .content:not(.loading) {
          transform: translateX(10px);
          opacity: 0;
          animation: fadeInFromRight 400ms ease-in-out forwards;
          animation-delay: 200ms;
        }

        @keyframes fadeInFromRight {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 1200px) {
          main {
            grid-template-columns: 1fr;
            overflow-x: hidden;
          }
          .content {
            padding: 0 20px;
            padding-top: 40px;
          }
        }
      `}</style>
    </>
  );
}
