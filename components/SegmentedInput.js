import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import axios from "axios";
import cn from "classnames";
import { Formik, Form } from "formik";
import Input from "./Input";
import Button from "./Button";
import CONSTANTS from "../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const getUserData = async (userUid, idToken) => {
  const response = await axios.get(`${API}/v1/subscribers/${userUid}`, {
    headers: {
      Authorization: idToken
    }
  });
  return response && response.data && response.data.data;
};

export default function SegmentedInput({
  inputLabel,
  referral,
  buttonText,
  hasBorder,
  onClick
}) {
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState();
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const copyLink = () => {
    copy(`https://www.commonenergy.us/referrals?advocate=${userName}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const inviteReferral = values => {
    if (values.emailAddress) {
      setSent(true);

      const payload = {
        email: values.emailAddress,
        username: userName
      };

      axios
        .post(`${API}/v1/subscribers/referrals`, payload, {
          headers: { Authorization: token }
        })
        .then(() => {
          setTimeout(() => setSent(false), 1000);
        });
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(async idToken => {
          setToken(idToken);
          const userInfo = await getUserData(user.uid, idToken);
          setUserName(userInfo.username);
        });
      } else {
        Router.push({
          pathname: "/"
        });
      }
    });
  }, []);

  return (
    <div className="segmented-input-wrapper">
      {referral ? (
        <>
          <input
            type="text"
            htmlFor="segmented-field"
            value={
              referral
                ? `https://www.commonenergy.us/referrals?advocate=${userName}`
                : ""
            }
            readOnly
            disabled
            className={cn({ "referral has-border": hasBorder })}
          />
          <label htmlFor="segmented-field">{inputLabel}</label>
          <Button
            maxWidth="170px"
            primary
            onClick={referral ? copyLink : onClick}
          >
            {copied ? "Copied!" : buttonText}
          </Button>
        </>
      ) : (
        <Formik
          initialValues={{}}
          onSubmit={values => {
            inviteReferral(values);
          }}
          render={props => (
            <Form>
              <Input
                fullWidth
                noMargin
                outerLabel
                scrollOnFocus={false}
                type="email"
                fieldname="emailAddress"
                label={inputLabel}
                className={cn({ "has-border": hasBorder })}
              />
              <Button
                maxWidth="170px"
                primary
                onClick={onClick}
                style={{ marginTop: "2.3em", marginBottom: "0" }}
              >
                {sent ? "Sent!" : buttonText}
              </Button>
            </Form>
          )}
        />
      )}
      <style jsx global>{`
        .segmented-input-wrapper {
          display: flex;
          align-items: center;
          position: relative;
          height: 3.75rem;
          width: 100%;
          margin: 0 auto;
          margin-bottom: 0.5rem;
        }

        .segmented-input-wrapper form {
          display: flex;
          align-items: center;
          position: relative;
          height: 3.75rem;
          width: 100%;
          margin: 0 auto;
        }

        .segmented-input-wrapper input {
          max-height: 53px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right: none;
        }

        .segmented-input-wrapper input.has-border {
          border: 1px solid #2479ff;
        }

        .segmented-input-wrapper button {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          text-transform: capitalize;
        }

        .segmented-input-wrapper label {
          position: absolute;
          top: -25%;
        }

        @media (max-width: 1200px) {
          :global(.segmented-input-wrapper .input__wrapper.outer-label label) {
            position: absolute;
            top: -35%;
            width: 150%;
          }
        }
      `}</style>
    </div>
  );
}
