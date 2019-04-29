import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import Cookie from "js-cookie";
import Header from "../../components/Header";
import ZipCodeInput from "../../components/ZipcodeInput";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import axios from "axios";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    global.analytics.page("Step 1");
    global.analytics.track("Sign-Up Initiated", {});
    let customerReferralCookie = Cookie.get("customer_referral");
    let partnerReferralCookie = Cookie.get("partner_referral");
    let salesRepCookie = Cookie.get("ce_rep_referral");

    if (partnerReferralCookie) {
      window.localStorage.setItem("Partner", partnerReferralCookie);
    }
    if (this.props && this.props.query.partner) {
      window.localStorage.setItem("Partner", this.props.query.partner);
    }
    if (customerReferralCookie) {
      window.localStorage.setItem("Referrer", customerReferralCookie);
    }
    if (this.props && this.props.query.advocate) {
      window.localStorage.setItem("Referrer", this.props.query.advocate);
    }
    if (salesRepCookie) window.localStorage.setItem("SalesRep", salesRepCookie);
    if (this.props && this.props.query.rep) {
      window.localStorage.setItem("SalesRep", this.props.query.rep);
    }

    if (this.props) {
      if (this.props.query.utm_campaign) {
        window.localStorage.setItem(
          "UtmCampaign",
          this.props.query.utm_campaign
        );
      }
      if (this.props.query.utm_source) {
        window.localStorage.setItem("UtmSource", this.props.query.utm_source);
      }
      if (this.props.query.utm_medium) {
        window.localStorage.setItem("UtmMedium", this.props.query.utm_medium);
      }
    }
  }

  capitalize(word) {
    return word && word[0].toUpperCase() + word.slice(1);
  }

  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep title="Hi, I'm Martin! Let's see if we have a project in your area. What is your zip code?">
          <Formik
            initialValues={{
              postalCode: ""
            }}
            onSubmit={values => {
              localStorage.setItem(
                "postalCode",
                JSON.stringify(values.postalCode)
              );
              axios(`${API}/v1/zipcodes/${values.postalCode}`).then(
                response => {
                  if (
                    response.data.data.geostatus != "Live" &&
                    response.data.data.geostatus != "Near-Term"
                  ) {
                    Router.push({
                      pathname: "/onboarding/sorry"
                    });
                  } else {
                    Router.push({
                      pathname: "/onboarding/step2"
                    });
                  }
                }
              );
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <ZipCodeInput
                    value={props.values.postalCode}
                    onChangeEvent={props.setFieldValue}
                    onBlurEvent={props.setFieldTouched}
                    label="ZipCode"
                    fieldname="postalCode"
                  />
                  <Button primary disabled={!props.values.postalCode != ""}>
                    Next
                  </Button>
                </Form>
              </React.Fragment>
            )}
          />
        </SingleStep>
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

export default Step1;
