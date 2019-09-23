import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import axios from "axios";
import cn from "classnames";
import Input from "./Input";
import Button from "./Button";
import CONSTANTS from "../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

export default function SegmentedInput({
  inputLabel,
  referral,
  buttonText,
  hasBorder,
  onClick
}) {
  const [value, setValue] = useState("");
  const [userName, setUserName] = useState("");
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    copy(`https://www.commonenergy.us/referrals?advocate=${userName}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(idToken => {
          axios
            .get(`${API}/v1/subscribers/${user.uid}`, {
              headers: {
                Authorization: idToken
              }
            })
            .then(response => {
              setUserName(response.data.data.username);
            })
            .catch(error => {
              console.error(error);
            });
        });
      } else {
        Router.push({
          pathname: "/"
        });
      }
    });
  }, []);

  return (
    <div className="wrapper">
      <input
        type="text"
        htmlFor="segmented-field"
        value={
          referral
            ? `https://www.commonenergy.us/referrals?advocate=${userName}`
            : ""
        }
        readOnly
        className={cn({ "has-border": hasBorder })}
      />
      <label htmlFor="segmented-field">{inputLabel}</label>
      <Button maxWidth="170px" primary onClick={referral ? copyLink : onClick}>
        {copied ? "Copied!" : buttonText}
      </Button>
      <style jsx>{`
        .wrapper {
          display: flex;
          align-items: center;
          position: relative;
          height: 3.75rem;
          width: 100%;
          margin: 0 auto;
          margin-bottom: 0.5rem;
        }
        .wrapper input {
          max-height: 53px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right: none;
        }
        .wrapper input.has-border {
          border: 1px solid #2479ff;
        }

        .wrapper :global(button) {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          text-transform: capitalize;
        }

        label {
          position: absolute;
          top: -25%;
        }
      `}</style>
    </div>
  );
}
