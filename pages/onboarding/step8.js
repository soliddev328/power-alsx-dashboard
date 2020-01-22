import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import { Elements, StripeProvider } from "react-stripe-elements";
import { withFirebase } from "../../firebase";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import SingleStep from "../../components/SingleStep";
import Plaid from "../../components/Plaid";
import Checkout from "../../components/Checkout";
import CONSTANTS from "../../globals";

const { STRIPE_KEY, API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function Step8(props) {
  const router = useRouter();
  const [leadId, setLeadId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    global.analytics.page("Step 8");

    let storedPaymentMethod = "";
    let storedLeadId = "";
    let storedName = "";

    if (localStorage.getItem("paymentMethod")) {
      storedPaymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));
    }

    if (localStorage.getItem("leadId")) {
      storedLeadId = localStorage.getItem("leadId");
    }

    if (localStorage.getItem("leadId")) {
      storedLeadId = localStorage.getItem("leadId");
    }

    if (localStorage.getItem("username")) {
      storedName = JSON.parse(localStorage.getItem("username"));
    }

    setPaymentMethod(storedPaymentMethod.paymentMethod);
    setStripe(window.Stripe(STRIPE_KEY));
    setLeadId(storedLeadId);
    setName(storedName.firstName);
  }, []);

  const renderBankLink = () => {
    return (
      <SingleStep>
        <Plaid />
        <style jsx>{`
          .container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            grid-column-gap: 15px;
            grid-row-gap: 20px;
            justify-items: center;
          }
        `}</style>
      </SingleStep>
    );
  };

  const renderCreditCard = () => {
    return (
      <SingleStep title="Please enter your credit card information">
        <div className="container">
          <img className="cards" src="/static/images/banks/cards.png" alt="" />
          <StripeProvider stripe={stripe}>
            <Elements>
              <Checkout
                stripe={stripe}
                name={name}
                callback={payload => {
                  props.firebase.doGetCurrentUserIdToken(idToken => {
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
                  });
                }}
              />
            </Elements>
          </StripeProvider>
        </div>
        <style jsx>{`
          p {
            text-align: center;
            vertical-align: middle;
          }

          p.small {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
          }

          p svg {
            margin-right: 10px;
          }

          em .highlight {
            color: #2479ff;
            font-weight: 700;
          }

          .cards {
            display: block;
            max-width: 35%;
            margin: 0 auto;
            margin-bottom: 1em;
          }

          .container h5 {
            display: inline-block;
            font-size: 1rem;
            font-weight: 700;
            position: relative;
            color: #ff69a0;
          }

          .container h5 svg {
            position: absolute;
            right: 0;
            bottom: 0;
            transform: translate(50%, 30%);
          }
        `}</style>
      </SingleStep>
    );
  };

  const updateInfo = values => {
    if (values.bankAccountNumber !== values.bankAccountNumberConfirmation) {
      setError("Bank account number and confirmation don't match");
    } else if (values.bankRoutingNumber.length !== 9) {
      setError("Bank Routing Number should have 9 digits");
    } else if (values.bankAccountNumber.length < 4) {
      setError("Bank Account Number should have at least 4 digits");
    } else {
      props.firebase.doUpdateUser((user, idToken) => {
        axios
          .put(
            `${API}/v1/subscribers`,
            {
              leadId: leadId,
              bank: values.bankName,
              bankRoutingNumber: values.bankRoutingNumber,
              bankAccountNumber: values.bankAccountNumber
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
              pathname: "/dashboard"
            });
          })
          .catch(() => {});
      });
    }
  };

  const renderManualDataInsert = () => {
    return (
      <SingleStep title="Please provide the following information.">
        <Formik
          initialValues={{
            bankName: "",
            bankRoutingNumber: "",
            bankAccountNumber: "",
            bankAccountNumberConfirmation: ""
          }}
          onSubmit={values => {
            updateInfo(values);
          }}
        >
          {props => (
            <Form>
              <Input type="text" label="Bank Name" fieldname="bankName" />
              <Input
                type="text"
                label="Bank Routing Number (9 digits)"
                fieldname="bankRoutingNumber"
                maxLength="9"
              />
              <Input
                type="text"
                label="Bank Account Number (4 digits min)"
                fieldname="bankAccountNumber"
              />
              <Input
                type="text"
                label="Bank Account Number Confirmation"
                fieldname="bankAccountNumberConfirmation"
              />
              <p className="error">{error}</p>

              <Button
                primary
                disabled={
                  !props.values.bankName != "" ||
                  !props.values.bankRoutingNumber != "" ||
                  !props.values.bankAccountNumber != "" ||
                  !props.values.bankAccountNumberConfirmation != ""
                }
              >
                Next
              </Button>
            </Form>
          )}
        </Formik>
        <style jsx>{`
          .error {
            height: 23px;
            color: red;
            text-align: center;
          }
        `}</style>
      </SingleStep>
    );
  };

  const renderForm = () => {
    if (paymentMethod === "automatic") {
      return renderBankLink();
    } else if (paymentMethod === "creditCard") {
      return renderCreditCard();
    } else {
      return renderManualDataInsert();
    }
  };

  return (
    <main>
      <Header />
      {renderForm()}
      <style jsx>{`
        main {
          display: block;
          height: 88vh;
          max-width: 700px;
          margin: 0 auto;
        }
      `}</style>
    </main>
  );
}

export default withFirebase(Step8);
