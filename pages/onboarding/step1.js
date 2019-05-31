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

    localStorage.removeItem("Partner");
    localStorage.removeItem("Referrer");
    localStorage.removeItem("SalesRep");
    localStorage.removeItem("Affiliate");
    localStorage.removeItem("postalCode");
    localStorage.removeItem("utility");
    localStorage.removeItem("email");
    localStorage.removeItem("fname");
    localStorage.removeItem("lname");

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
    if (this.props && this.props.query.affiliate) {
      localStorage.setItem("Affiliate", this.props.query.affiliate);
    }

    let utmCampaignCookie = Cookie.get("_ce_campaign");
    let utmSourceCookie = Cookie.get("_ce_source");
    let utmMediumCookie = Cookie.get("_ce_medium");
    if (utmCampaignCookie)
      localStorage.setItem("UtmCampaign", utmCampaignCookie);
    if (utmSourceCookie) localStorage.setItem("UtmSource", utmSourceCookie);
    if (utmMediumCookie) localStorage.setItem("UtmMedium", utmMediumCookie);
    if (this.props) {
      if (this.props.query.utm_campaign)
        localStorage.setItem("UtmCampaign", this.props.query.utm_campaign);
      if (this.props.query.utm_source)
        localStorage.setItem("UtmSource", this.props.query.utm_source);
      if (this.props.query.utm_medium)
        localStorage.setItem("UtmMedium", this.props.query.utm_medium);

      if (this.props.query.zipcode)
        localStorage.setItem("postalCode", this.props.query.zipcode);
      if (this.props.query.utility)
        localStorage.setItem("utility", this.props.query.utility);
      if (this.props.query.email)
        localStorage.setItem("email", this.props.query.email);
      if (this.props.query.fname)
        localStorage.setItem("fname", this.props.query.fname);
      if (this.props.query.lname)
        localStorage.setItem("lname", this.props.query.lname);
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
              postalCode: this.props.query.zipcode
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
