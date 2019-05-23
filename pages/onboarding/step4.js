import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import Header from "../../components/Header";
import Input from "../../components/Input";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import Stepper from "../../components/Stepper";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

class Step4 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    global.analytics.page("Step 4");

    let storedPostalCode = "";
    let storedUtility = "";
    let storedAgreementChecked = false;
    let storedPartner = "";
    let storedReferrer = "";
    let storedSalesRep = "";
    let storedAffiliate = "";
    let storedUtmCampaign = "";
    let storedUtmMedium = "";
    let storedUtmSource = "";

    if (localStorage.getItem("utility")) {
      storedUtility = JSON.parse(localStorage.getItem("utility"));
    }
    if (localStorage.getItem("acceptedTermsAndConditions")) {
      storedAgreementChecked = JSON.parse(
        localStorage.getItem("acceptedTermsAndConditions")
      );
    }
    if (localStorage.getItem("postalCode")) {
      storedPostalCode = JSON.parse(localStorage.getItem("postalCode"));
    }
    if (localStorage.getItem("Partner")) {
      storedPartner = localStorage.getItem("Partner");
    }
    if (localStorage.getItem("Referrer")) {
      storedReferrer = localStorage.getItem("Referrer");
    }
    if (localStorage.getItem("SalesRep")) {
      storedSalesRep = localStorage.getItem("SalesRep");
    }
    if (localStorage.getItem("Affiliate")) {
      storedAffiliate = localStorage.getItem("Affiliate");
    }
    if (localStorage.getItem("UtmCampaign")) {
      storedUtmCampaign = localStorage.getItem("UtmCampaign");
    }
    if (localStorage.getItem("UtmMedium")) {
      storedUtmMedium = localStorage.getItem("UtmMedium");
    }
    if (localStorage.getItem("UtmSource")) {
      storedUtmSource = localStorage.getItem("UtmSource");
    }

    this.setState({
      utility: storedUtility.label,
      postalCode: storedPostalCode,
      referrer: storedReferrer,
      partner: storedPartner,
      salesRep: storedSalesRep,
      affiliate: storedAffiliate,
      utmCampaign: storedUtmCampaign,
      utmMedium: storedUtmMedium,
      utmSource: storedUtmSource,
      agreedTermsAndConditions: storedAgreementChecked
    });
  }

  render() {
    const email = localStorage.getItem("email");
    return (
      <main>
        <Header />
        <SingleStep title="Ok, now for the fun stuff. Let's create your account!">
          <Formik
            initialValues={{
              // password: "",
              emailAddress: email
            }}
            onSubmit={values => {
              localStorage.setItem("email", values.emailAddress);
              console.log(this.state.utility);
              axios
                .post(`${API}/v1/subscribers`, {
                  Email: values.emailAddress,
                  Referrer: this.state.referrer,
                  Partner: this.state.partner,
                  SalesRep: this.state.salesRep,
                  Affiliate: this.state.affiliate,
                  postalCode: this.state.postalCode,
                  agreementChecked: !!this.state.agreedTermsAndConditions,
                  utility: this.state.utility,
                  utmCampaign: this.state.utmCampaign,
                  utmMedium: this.state.utmMedium,
                  utmSource: this.state.utmSource
                })
                .then(response => {
                  localStorage.setItem("leadId", response.data.data.leadId);

                  // Call Segement events
                  global.analytics.identify(response.data.data.leadId, {
                    email: values.emailAddress
                  });
                  global.analytics.track("Lead Created", {});

                  Router.push({
                    pathname: "/onboarding/step5"
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            }}
            render={props => (
              <Form>
                <Input
                  type="email"
                  label="Email"
                  fieldname="emailAddress"
                  required
                />
                {/* <Input
                  type="password"
                  label="Password"
                  fieldname="password"
                  required /> */}
                <Button primary disabled={!props.values.emailAddress != ""}>
                  Next
                </Button>
              </Form>
            )}
          />
          <Stepper>
            <li className="steplist__step steplist__step-doing">1</li>
            <li className="steplist__step">2</li>
            <li className="steplist__step">3</li>
            <li className="steplist__step">4</li>
            <li className="steplist__step">5</li>
            <li className="steplist__step">6</li>
          </Stepper>
        </SingleStep>
        <style jsx>{`
          main {
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
        `}</style>
      </main>
    );
  }
}

export default Step4;
