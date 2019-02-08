import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import Phoneinput from "../../components/Phoneinput";
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

    if (localStorage.getItem("utility")) {
      storedUtility = JSON.parse(localStorage.getItem("utility"));
    }
    if (localStorage.getItem("acceptedTermsAndConditions")) {
      storedAgreementChecked = JSON.parse(
        localStorage.getItem("acceptedTermsAndConditions")
      );
    }
    if (localStorage.getItem("address")) {
      storedAddress = JSON.parse(localStorage.getItem("address"));
    }
    if (localStorage.getItem("username")) {
      storedName = JSON.parse(localStorage.getItem("username"));
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
      name: storedName,
      utility: storedUtility.label,
      address: storedAddress,
      referrer: storedReferrer,
      partner: storedPartner,
      salesRep: storedSalesRep,
      utmCampaign: storedUtmCampaign,
      utmMedium: storedUtmMedium,
      utmSource: storedUtmSource,
      agreedTermsAndConditions: storedAgreementChecked
    });
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep title="Ok, now for the fun stuff! What email and phone number would you like to use to create your account?">
          <Formik
            initialValues={{
              phoneNumber: "",
              emailAddress: ""
            }}
            onSubmit={values => {
              localStorage.setItem("email", values.emailAddress);
              localStorage.setItem("phone", values.phoneNumber);
              axios
                .post(`${API}/v1/subscribers`, {
                  FirstName: this.state.name.firstName,
                  LastName: this.state.name.lastName,
                  Phone: values.phoneNumber,
                  Email: values.emailAddress,
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
                  utmSource: this.state.utmSource
                })
                .then(function(response) {
                  localStorage.setItem("leadId", response.data.data.leadId);

                  // Call Segement events
                  global.analytics.identify(response.data.data.leadId, {
                    email: values.emailAddress
                  });
                  global.analytics.track("Lead Created", {});

                  Router.push({
                    pathname: "/onboarding/step6"
                  });
                })
                .catch(function(error) {
                  console.log(error);
                });
            }}
            render={props => (
              <Form>
                <Phoneinput
                  value={props.values.phoneNumber}
                  onChangeEvent={props.setFieldValue}
                  onBlurEvent={props.setFieldTouched}
                  label="Phone"
                  fieldname="phoneNumber"
                />
                <Input
                  type="email"
                  label="Email"
                  fieldname="emailAddress"
                  required
                />
                <Button
                  primary
                  disabled={
                    !props.values.phoneNumber != "" ||
                    !props.values.emailAddress != ""
                  }
                >
                  Next
                </Button>
              </Form>
            )}
          />
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

export default Step5;
