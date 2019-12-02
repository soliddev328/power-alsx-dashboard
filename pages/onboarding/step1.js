import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import Cookie from "js-cookie";
import Header from "../../components/Header";
import Input from "../../components/Input";
import ZipCodeInput from "../../components/ZipcodeInput";
import SingleStep from "../../components/SingleStep";
import CustomSelect from "../../components/CustomSelect";
import Button from "../../components/Button";
import axios from "axios";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      postalCode: "",
      currentUtility: "",
      error: {
        code: false,
        message: ""
      }
    };
    this.select = React.createRef();
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
    localStorage.removeItem("username");

    const { query } = this.props;
    let storedReferrerPage = Cookie.get("ce_aff_slug");
    let storedCustomerReferral = Cookie.get("customer_referral");
    let storedPartnerReferral = Cookie.get("partner_referral");
    let storedSalesRep = Cookie.get("ce_rep_referral");
    let storedUtmCampaign = Cookie.get("_ce_campaign");
    let storedUtmSource = Cookie.get("_ce_source");
    let storedUtmMedium = Cookie.get("_ce_medium");
    let storedAffiliate = Cookie.get("ce_aff");

    if (document.referrer) {
      storedReferrerPage = document.referrer;
    }
    if (storedPartnerReferral) {
      localStorage.setItem("Partner", storedPartnerReferral);
    }
    if (storedSalesRep) {
      localStorage.setItem("SalesRep", storedSalesRep);
    }
    if (storedCustomerReferral) {
      localStorage.setItem("Referrer", storedCustomerReferral);
    }
    if (storedUtmCampaign) {
      localStorage.setItem("UtmCampaign", storedUtmCampaign);
    }
    if (storedUtmSource) {
      localStorage.setItem("UtmSource", storedUtmSource);
    }
    if (storedUtmMedium) {
      localStorage.setItem("UtmMedium", storedUtmMedium);
    }

    if (query.partner) {
      storedPartnerReferral = query.partner;
      localStorage.setItem("Partner", storedPartnerReferral);
    }
    if (query.advocate) {
      storedCustomerReferral = query.advocate;
      localStorage.setItem("Referrer", storedCustomerReferral);
    }
    if (query.rep) {
      storedSalesRep = query.rep;
      localStorage.setItem("SalesRep", storedSalesRep);
    }
    if (query.affiliate) {
      storedAffiliate = query.affiliate;
      localStorage.setItem("Affiliate", storedAffiliate);
    }
    if (query.utm_campaign) {
      storedUtmCampaign = query.utm_campaign;
      localStorage.setItem("UtmCampaign", storedUtmCampaign);
    }
    if (query.utm_source) {
      storedUtmSource = query.utm_source;
      localStorage.setItem("UtmSource", storedUtmSource);
    }
    if (query.utm_medium) {
      storedUtmMedium = query.utm_medium;
      localStorage.setItem("UtmMedium", storedUtmMedium);
    }
    // some partners pass that information to us
    if (query.utility) {
      localStorage.setItem("utility", query.utility);
    }

    this.setState({
      referrer: storedCustomerReferral,
      partner: storedPartnerReferral,
      salesRep: storedSalesRep,
      affiliate: storedAffiliate,
      utmCampaign: storedUtmCampaign,
      utmMedium: storedUtmMedium,
      utmSource: storedUtmSource,
      referrerPage: storedReferrerPage
    });
  }

  capitalize(word) {
    return word && word[0].toUpperCase() + word.slice(1);
  }

  autenticate(values) {
    let utility = "";
    const options = this.select.current.state.options;
    const singleOption = this.select.current.state.singleOption;

    const name = {
      firstName: values.firstName,
      lastName: values.lastName
    };

    utility = values.currentUtility;

    if (singleOption) {
      utility = options[0];
    }

    localStorage.setItem("email", values.emailAddress);
    localStorage.setItem("postalCode", JSON.stringify(values.postalCode));
    localStorage.setItem("username", JSON.stringify(name));

    if (options !== null && utility !== "") {
      localStorage.setItem("utility", JSON.stringify(utility));

      if (utility.paperOnly) {
        localStorage.setItem("billingMethod", JSON.stringify("paper"));
      } else {
        localStorage.setItem("billingMethod", JSON.stringify(""));
      }

      window.firebase
        .auth()
        .signInAnonymously()
        .catch(error => {
          if (error.code === "auth/email-already-in-use") {
            this.setState({
              error: {
                code: error.code,
                message: "Already have a login and password?",
                link: <a href="/">Go here</a>
              }
            });
          } else {
            this.setState({
              error: { code: error.code, message: error.message }
            });
          }
        })
        .then(userCredential => {
          const {
            referrer,
            partner,
            salesRep,
            affiliate,
            utmCampaign,
            utmMedium,
            utmSource,
            referrerPage
          } = this.state;

          if (userCredential) {
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
                      email: values.emailAddress,
                      firstName: name.firstName,
                      lastName: name.lastName,
                      utility: utility.label,
                      postalCode: values.postalCode,
                      firebaseUserId: userCredential.user.uid,
                      referrer: referrer,
                      partner: partner,
                      salesRep: salesRep,
                      affiliate: affiliate,
                      utmCampaign: utmCampaign,
                      utmMedium: utmMedium,
                      utmSource: utmSource,
                      referrerPage: referrerPage
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
                    global.analytics.alias(response.data.data.leadId);
                    global.analytics.identify(response.data.data.leadId, {
                      firstName: values.firstName,
                      lastName: values.lastName,
                      email: values.emailAddress
                    });

                    global.analytics.track("Lead Created", {});

                    Router.push({
                      pathname: "/onboarding/step2"
                    });
                  });
              });
          }
        });
    } else if (options === null) {
      Router.push({
        pathname: "/onboarding/sorry"
      });
    } else {
      this.setState({
        error: {
          message: "Please select your utility"
        }
      });
    }
  }

  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    const { error } = this.state;
    const { query } = this.props;

    return (
      <main>
        <Header />
        <SingleStep title="Hi, I’m Martin. If you provide a little information, I can check to see your savings opportunities.">
          <Formik
            initialValues={{
              postalCode: query.zipcode,
              currentUtility: "",
              emailAddress: query.email,
              firstName: query.fname,
              lastName: query.lname,
              password: ""
            }}
            onSubmit={values => {
              this.autenticate(values);
            }}
          >
            {props => (
              <>
                <Form>
                  <ZipCodeInput
                    value={props.values.postalCode}
                    onChangeEvent={props.setFieldValue}
                    onBlurEvent={props.setFieldTouched}
                    label="ZipCode"
                    fieldname="postalCode"
                  />
                  <CustomSelect
                    ref={this.select}
                    zipCode={props.values.postalCode}
                    value={props.currentUtility}
                    disabled={!props.values.postalCode}
                    onChange={props.setFieldValue}
                    onBlur={props.setFieldTouched}
                    touched={props.touched}
                    fieldname="currentUtility"
                  />
                  <div className="two-columns two-columns--responsive">
                    <Input label="First Name" fieldname="firstName" />
                    <Input label="Last Name" fieldname="lastName" />
                  </div>
                  <Input
                    type="email"
                    label="Email"
                    fieldname="emailAddress"
                    required
                  />
                  <p className="error">
                    {error.message} {error.link && error.link}
                  </p>
                  <Button
                    primary
                    disabled={
                      !!props.values.firstName !== true ||
                      !!props.values.lastName !== true ||
                      !!props.values.postalCode !== true ||
                      !!props.values.emailAddress !== true
                    }
                  >
                    Next
                  </Button>
                </Form>
              </>
            )}
          </Formik>
        </SingleStep>
        <style jsx>{`
          main {
            display: block;
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

export default Step1;
