import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements";
import withFirebase from "../firebase";
import Button from "../components/Button";
import CONSTANTS from "../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function CheckoutForm(props) {
  const router = useRouter();
  const [leadId, setLeadId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState();

  useEffect(() => {
    let storedLeadId = "";
    let storedEmail = "";

    if (localStorage.getItem("leadId")) {
      storedLeadId = localStorage.getItem("leadId");
    }

    if (localStorage.getItem("email")) {
      storedEmail = localStorage.getItem("email");
    }

    setLeadId(storedLeadId);
    setEmail(storedEmail);
  }, []);

  const submit = ev => {
    ev.preventDefault();
    props.firebase.doUpdateUser(idToken => {
      if (stripe) {
        props.stripe.createToken({ type: "card" }).then(payload => {
          if (payload.token) {
            axios
              .put(
                `${API}/v1/subscribers`,
                {
                  leadId: leadId,
                  email: email,
                  stripeToken: payload.token.id
                },
                {
                  headers: {
                    Authorization: idToken
                  }
                }
              )
              .then(() => {
                global.analytics.track("Sign-Up Completed", {});
                localStorage.setItem("usercreated", true);
                router.push({
                  pathname: "/"
                });
              });
          }
        });
      }
    });
  };

  return (
    <div className="checkout">
      <div className="card">
        <CardNumberElement
          placeholder="Card Number"
          style={{
            base: {
              margin: "5px",
              color: "#2479ff",
              fontSize: "16px",
              fontFamily: '"Poppins", sans-serif',
              fontSmoothing: "antialiased",
              "::placeholder": {
                color: "#2479ff"
              }
            },
            invalid: {
              color: "#e5424d",
              ":focus": {
                color: "#303238"
              }
            }
          }}
          onChange={event => {
            if (event.error) {
              setError(event.error.message);
            } else {
              setError("");
            }
          }}
        />
        <div className="columns">
          <CardExpiryElement
            style={{
              base: {
                color: "#2479ff",
                fontSize: "16px",
                fontFamily: '"Poppins", sans-serif',
                fontSmoothing: "antialiased",
                "::placeholder": {
                  fontSize: "12px",
                  color: "#2479ff"
                }
              },
              invalid: {
                color: "#e5424d",
                ":focus": {
                  color: "#303238"
                }
              }
            }}
            onChange={event => {
              if (event.error) {
                setError(event.error.message);
              } else {
                setError("");
              }
            }}
          />
          <CardCVCElement
            style={{
              base: {
                color: "#2479ff",
                fontSize: "16px",
                fontFamily: '"Poppins", sans-serif',
                fontSmoothing: "antialiased",
                "::placeholder": {
                  fontSize: "12px",
                  color: "#2479ff"
                }
              },
              invalid: {
                color: "#e5424d",
                ":focus": {
                  color: "#303238"
                }
              }
            }}
            onChange={event => {
              if (event.error) {
                setError(event.error.message);
              } else {
                setError("");
              }
            }}
          />
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      <Button primary onClick={submit}>
        Next
      </Button>
      <style jsx>{`
        .card {
          margin: 2rem 0;
          margin-bottom: 10px;
        }
        .columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .error {
          text-align: center;
          color: red;
          margin: 0;
        }
      `}</style>
      <style jsx global>{`
        .StripeElement {
          margin: 10px 0;
          background-color: white;
          padding: 0.8em 1em;
          border-radius: 3px;
          border: 1px solid transparent;
          caret-color: #41ef8b;
          transition: box-shadow 200ms ease-in;
        }

        .StripeElement + .StripeElement {
          margin-left: 10px;
        }

        .StripeElement--invalid {
          border-color: #fa755a;
        }

        .StripeElement--webkit-autofill {
          background-color: #fefde5 !important;
        }
      `}</style>
    </div>
  );
}

export default injectStripe(withFirebase(CheckoutForm));
