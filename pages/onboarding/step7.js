import React from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { Elements, StripeProvider } from "react-stripe-elements";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import SingleStep from "../../components/SingleStep";
import Plaid from "../../components/Plaid";
import Checkout from "../../components/Checkout";
import Stepper from "../../components/Stepper";
import CONSTANTS from "../../globals";
import Router from "next/router";

const { STRIPE_KEY, API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

class Step7 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      errorMessage: "",
      paymentMethod: "",
      stripe: null
    };
  }

  componentDidMount() {
    global.analytics.page("Step 7");

    let storedPaymentMethod = "";
    let storedLeadId = "";

    if (localStorage.getItem("paymentMethod")) {
      storedPaymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));
    }

    if (localStorage.getItem("leadId")) {
      storedLeadId = localStorage.getItem("leadId");
    }

    this.setState({
      paymentMethod: storedPaymentMethod.paymentMethod,
      leadId: storedLeadId,
      stripe: window.Stripe(STRIPE_KEY)
    });
  }

  renderBankLink() {
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
  }

  renderCreditCard() {
    return (
      <SingleStep title="Please enter your credit card information">
        <div className="container">
          <img className="cards" src="/static/images/banks/cards.png" alt="" />
          <StripeProvider stripe={this.state.stripe}>
            <Elements>
              <Checkout stripe={this.state.stripe} name={this.props.name} />
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
        <Stepper>
          <li className="steplist__step steplist__step-done">1</li>
          <li className="steplist__step steplist__step-done">2</li>
          <li className="steplist__step steplist__step-done">3</li>
          <li className="steplist__step steplist__step-done">4</li>
          <li className="steplist__step steplist__step-doing">5</li>
        </Stepper>
      </SingleStep>
    );
  }

  updateInfo(values) {
    if (values.bankAccountNumber !== values.bankAccountNumberConfirmation) {
      this.setState({
        errorMessage: "Bank account number and confirmation don't match"
      });
    } else if (values.bankRoutingNumber.length !== 9) {
      this.setState({
        errorMessage: "Bank Routing Number should have 9 digits"
      });
    } else if (values.bankAccountNumber.length < 4) {
      this.setState({
        errorMessage: "Bank Account Number should have at least 4 digits"
      });
    } else {
      window.firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          axios
            .put(
              `${API}/v1/subscribers`,
              {
                leadId: this.state.leadId,
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
              Router.push({
                pathname: "/dashboard"
              });
            })
            .catch(() => {});
        });
    }
  }

  renderManualDataInsert() {
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
            this.updateInfo(values);
          }}
          render={props => (
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
              <p className="error">{this.state.errorMessage}</p>

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
        />
        <style jsx>{`
          .error {
            height: 23px;
            color: red;
            text-align: center;
          }
        `}</style>
        <Stepper>
          <li className="steplist__step steplist__step-done">1</li>
          <li className="steplist__step steplist__step-done">2</li>
          <li className="steplist__step steplist__step-done">3</li>
          <li className="steplist__step steplist__step-done">4</li>
          <li className="steplist__step steplist__step-doing">5</li>
        </Stepper>
      </SingleStep>
    );
  }

  renderForm() {
    const { paymentMethod } = this.state;
    if (paymentMethod === "automatic") {
      return this.renderBankLink();
    } else if (paymentMethod === "creditCard") {
      return this.renderCreditCard();
    } else {
      return this.renderManualDataInsert();
    }
  }

  render() {
    const { paymentMethod } = this.state;
    return (
      <main>
        <Header />
        {paymentMethod && this.renderForm()}

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
}

export default Step7;
