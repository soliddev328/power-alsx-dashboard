import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import Header from "../../components/Header";
import Input from "../../components/Input";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

class Step5 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: {
        code: false,
        message: ""
      }
    };
  }

  componentDidMount() {
    global.analytics.page("Step 5");

    let storedName = "";
    let storedUtility = "";
    let storedAgreementChecked = false;
    let storedAddress = "";
    let storedPartner = "";
    let storedReferrer = "";
    let storedSalesRep = "";
    let storedUtmCampaign = "";
    let storedUtmMedium = "";
    let storedUtmSource = "";

    if (window.localStorage.getItem("utility")) {
      storedUtility = JSON.parse(window.localStorage.getItem("utility"));
    }
    if (window.localStorage.getItem("acceptedTermsAndConditions")) {
      storedAgreementChecked = JSON.parse(
        window.localStorage.getItem("acceptedTermsAndConditions")
      );
    }
    if (window.localStorage.getItem("address")) {
      storedAddress = JSON.parse(window.localStorage.getItem("address"));
    }
    if (window.localStorage.getItem("username")) {
      storedName = JSON.parse(window.localStorage.getItem("username"));
    }
    if (window.localStorage.getItem("Partner")) {
      storedPartner = window.localStorage.getItem("Partner");
    }
    if (window.localStorage.getItem("Referrer")) {
      storedReferrer = window.localStorage.getItem("Referrer");
    }
    if (window.localStorage.getItem("SalesRep")) {
      storedSalesRep = window.localStorage.getItem("SalesRep");
    }
    if (window.localStorage.getItem("UtmCampaign")) {
      storedUtmCampaign = window.localStorage.getItem("UtmCampaign");
    }
    if (window.localStorage.getItem("UtmMedium")) {
      storedUtmMedium = window.localStorage.getItem("UtmMedium");
    }
    if (window.localStorage.getItem("UtmSource")) {
      storedUtmSource = window.localStorage.getItem("UtmSource");
    }

    this.setState({
      name: storedName,
      utility: storedUtility.label,
      address: storedAddress,
      referrer: storedReferrer,
      partner: storedPartner,
      salesRep: storedSalesRep,
      utmCampaign: storedUtmCampaign,
      utmMedium: storedUtmMedium,
      utmSource: storedUtmSource,
      agreedTermsAndConditions: storedAgreementChecked,
      pageLoaded: true
    });
  }

  autenticate(values) {
    if (values.password === values.passwordConfirmation) {
      window.firebase
        .auth()
        .createUserWithEmailAndPassword(values.emailAddress, values.password)
        .catch(error => {
          this.setState({
            error: { code: error.code, message: error.message }
          });
        })
        .then(userCredential => {
          window.localStorage.setItem(
            "firebaseUserId",
            userCredential.user.uid
          );
          window.firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(idToken => {
              axios
                .post(
                  `${API}/v1/subscribers`,
                  {
                    FirstName: this.state.name.firstName,
                    LastName: this.state.name.lastName,
                    Email: values.emailAddress,
                    Phone: "",
                    Referrer: this.state.referrer,
                    Partner: this.state.partner,
                    SalesRep: this.state.salesRep,
                    street: this.state.address.street,
                    state: this.state.address.state,
                    city: this.state.address.city,
                    postalCode: this.state.address.postalCode,
                    agreementChecked: !!this.state.agreedTermsAndConditions,
                    utility: this.state.utility,
                    utmCampaign: this.state.utmCampaign,
                    utmMedium: this.state.utmMedium,
                    utmSource: this.state.utmSource,
                    firebaseUserId: userCredential.user.uid
                  },
                  {
                    headers: {
                      Authorization: idToken
                    }
                  }
                )
                .then(response => {
                  window.localStorage.setItem(
                    "leadId",
                    response.data.data.leadId
                  );

                  // Call Segement events
                  global.analytics.identify(response.data.data.leadId, {
                    email: values.emailAddress
                  });
                  global.analytics.track("Lead Created", {});

                  if (!this.state.error.code) {
                    Router.push({
                      pathname: "/onboarding/step5.1"
                    });
                  }
                });
            });
        });
    } else {
      this.setState({
        error: { code: "6", message: "Passwords do not match" }
      });
    }
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep title="Ok, now for the fun stuff. Let’s create your account!">
          <Formik
            initialValues={{
              emailAddress: "",
              password: "",
              passwordConfirmation: ""
            }}
            onSubmit={values => {
              window.localStorage.setItem("email", values.emailAddress);
              this.autenticate(values);
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <Input
                    type="email"
                    label="Email"
                    fieldname="emailAddress"
                    required
                  />
                  <Input
                    type="password"
                    label="Password"
                    fieldname="password"
                    required
                  />
                  <Input
                    type="password"
                    label="Confirm Password"
                    fieldname="passwordConfirmation"
                    required
                  />
                  <p className="error">{this.state.error.message}</p>
                  <Button
                    primary
                    disabled={
                      !!props.values.emailAddress !== true ||
                      !!props.values.password !== true
                    }
                    onClick={() => {
                      this.setState({
                        error: {
                          code: false,
                          message: ""
                        }
                      });
                    }}
                  >
                    Next
                  </Button>
                </Form>
              </React.Fragment>
            )}
          />
        </SingleStep>
        <style jsx>{`
          main {
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
          .error {
            height: 52px;
            margin: 0;
            padding: 1em 0;
            text-align: center;
          }
        `}</style>
      </main>
    );
  }
}

export default Step5;
