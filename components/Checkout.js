import { useState } from "react";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements";
import Button from "../components/Button";

function CheckoutForm({ stripe, callback }) {
  const [error, setError] = useState();

  const submit = ev => {
    ev.preventDefault();
    if (stripe) {
      stripe.createToken({ type: "card" }).then(payload => {
        if (payload.token) {
          callback(payload);
        }
      });
    }
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

export default injectStripe(CheckoutForm);
