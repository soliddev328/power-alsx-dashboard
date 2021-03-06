import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import axios from "axios";
import cn from "classnames";
import { Formik, Form } from "formik";
import Input from "./Input";
import Button from "./Button";
import CONSTANTS from "../globals";
import { withFirebase } from "../firebase";

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

function SegmentedInput(props) {
  const [userName, setUserName] = useState("");
  const [innerPlaceholder, setInnerPlaceholder] = useState(props.placeholder);
  const [token, setToken] = useState();
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const { inputLabel, referral, buttonText, hasBorder, onClick } = props;

  const copyLink = () => {
    const referralUrl = `https://www.commonenergy.us/referrals?advocate=${userName}`;
    copy(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
    global.analytics.track("Referral Link Copied", {
      "Referral URL": referralUrl
    });
  };

  const inviteReferral = (values, callback) => {
    if (values.emailAddress && !sent) {
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
          callback({
            emailAddress: ""
          });
          setInnerPlaceholder(
            "Your email has been sent! Why not send another? :)"
          );
          global.analytics.track("Referral Invite Sent", {
            "Referred Email": payload.email
          });
          setTimeout(() => {
            setSent(false);
          }, 3000);
        })
        .catch(error => {
          console.log(error);
          callback({
            emailAddress: ""
          });
          setInnerPlaceholder(
            "Your email has been sent! Why not send another? :)"
          );
          setTimeout(() => {
            setSent(false);
          }, 3000);
        });
    }
  };

  useEffect(() => {
    props.firebase.doUpdateUser(async (user, idToken) => {
      setToken(idToken);
      const userInfo = await getUserData(user.uid, idToken);
      if (userInfo) {
        setUserName(userInfo.username);
      }
    });
  }, []);

  return (
    <div className="segmented-input-wrapper">
      {referral ? (
        <Button
          style={{
            borderRadius: "5px",
            margin: 0
          }}
          primary
          onClick={copyLink}
        >
          {copied ? "Copied!" : buttonText}
        </Button>
      ) : (
        <Formik
          initialValues={{
            emailAddress: ""
          }}
          onSubmit={(values, { resetForm }) => {
            inviteReferral(values, resetForm);
          }}
        >
          {props => (
            <Form>
              <Input
                fullWidth
                noMargin
                outerLabel
                placeholder={innerPlaceholder}
                value={props.values.emailAddress || ""}
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
        </Formik>
      )}
      <style jsx global>{`
        .segmented-input-wrapper {
          display: flex;
          align-items: flex-end;
          position: relative;
          height: 5.75rem;
          width: 100%;
          margin: 0 auto;
          margin-bottom: 0.5rem;
        }

        .segmented-input-wrapper form {
          display: flex;
          align-items: center;
          position: relative;
          height: 5.75rem;
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
          .segmented-input-wrapper label {
            width: 200%;
            left: 0;
          }
          .segmented-input-wrapper {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default withFirebase(SegmentedInput);
