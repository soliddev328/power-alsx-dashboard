import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import Cookie from "js-cookie";
import { withFirebase } from "../../firebase";
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

function Step1(props) {
  const selectRef = useRef(null);
  const router = useRouter();
  const { query } = router;
  const [isLoading, setIsLoading] = useState(false);
  const [queryData, setQueryData] = useState(false);
  const [error, setError] = useState(false);
  const [partner, setPartner] = useState(false);
  const [referrer, setReferrer] = useState(false);
  const [referrerPage, setReferrerPage] = useState(false);
  const [salesRep, setSalesRep] = useState(false);
  const [affiliate, setAffiliate] = useState(false);
  const [utmCampaign, setUtmCampaign] = useState(false);
  const [utmSource, setUtmSource] = useState(false);
  const [utmMedium, setUtmMedium] = useState(false);
  const [offer, setOffer] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    setQueryData({
      zipcode: query.zipcode,
      email: query.email,
      fname: query.fname,
      lname: query.lname
    });

    let storedReferrerPage = Cookie.get("ce_aff_slug");
    let storedCustomerReferral = Cookie.get("customer_referral");
    let storedPartnerReferral = Cookie.get("partner_referral");
    let storedOffer = Cookie.get("ce_offer");
    let storedSalesRep = Cookie.get("ce_rep_referral");
    let storedUtmCampaign = Cookie.get("_ce_campaign");
    let storedUtmSource = Cookie.get("_ce_source");
    let storedUtmMedium = Cookie.get("_ce_medium");
    let storedAffiliate = Cookie.get("ce_aff");

    const isAffiliatePage =
      storedReferrerPage && storedReferrerPage.includes("rep");
    if (!isAffiliatePage && document.referrer) {
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

    if (query.offer) {
      storedOffer = query.offer;
      localStorage.setItem("offer", storedOffer);
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

    setPartner(storedPartnerReferral);
    setReferrer(storedCustomerReferral);
    setSalesRep(storedSalesRep);
    setAffiliate(storedAffiliate);
    setUtmCampaign(storedUtmCampaign);
    setUtmSource(storedUtmSource);
    setUtmMedium(storedUtmMedium);
    setOffer(storedOffer);
    setReferrerPage(storedReferrerPage);
  }, [query]);

  const authenticate = values => {
    setIsLoading(true);
    let utility = "";
    const options = selectRef.current.state.options;
    const singleOption = selectRef.current.state.singleOption;

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

      props.firebase.doSignInAnonymously(userCredential => {
        localStorage.setItem("firebaseUserId", userCredential.user.uid);
        props.firebase.doUpdateUser((user, idToken) => {
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
                referrerPage: referrerPage,
                offer: offer
              },
              {
                headers: {
                  Authorization: idToken
                }
              }
            )
            .then(response => {
              localStorage.setItem("leadId", response.data.data.leadId);

              // Call Segement events
              global.analytics.alias(response.data.data.leadId);
              global.analytics.identify(response.data.data.leadId, {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.emailAddress
              });

              global.analytics.track("Lead Created", {});

              router.push({
                pathname: "/onboarding/step2",
                query: {
                  next: true
                }
              });
            })
            .catch(failure => {
              setIsLoading(false);
              const { response } = failure;
              const { data } = response;
              const { errors } = data;

              if (errors.code === "auth/email-already-exists") {
                setError({
                  code: errors.code,
                  message: (
                    <>
                      This email address has already been used to complete this
                      step. <a href="/emailsignin">Click here</a> to access your
                      account and complete sign-up.
                    </>
                  )
                });
              } else {
                setError({ code: errors.code, message: errors.message });
              }
            });
        });
      });
    } else if (options === null) {
      router.push({
        pathname: "/onboarding/sorry",
        query: {
          next: true
        }
      });
    } else {
      setError({
        message: "Please select your utility"
      });
    }
  };

  return (
    <main>
      <Header firstStep />
      <SingleStep title="Hi, I’m Martin. If you provide a little information, I can check to see your savings opportunities.">
        <Formik
          initialValues={{
            postalCode: queryData?.zipcode,
            currentUtility: "",
            emailAddress: queryData?.email,
            firstName: queryData?.fname,
            lastName: queryData?.lname
          }}
          onSubmit={values => {
            authenticate(values);
          }}
        >
          {props => (
            <Form>
              <ZipCodeInput
                value={props.values.postalCode}
                onChangeEvent={props.setFieldValue}
                onBlurEvent={props.setFieldTouched}
                label="ZipCode"
                fieldname="postalCode"
              />
              <CustomSelect
                ref={selectRef}
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
              <p className="error">{error.message}</p>
              <Button
                primary
                disabled={
                  !!props.values.firstName !== true ||
                  !!props.values.lastName !== true ||
                  !!props.values.postalCode !== true ||
                  !!props.values.emailAddress !== true ||
                  isLoading
                }
              >
                Next
              </Button>
            </Form>
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
          height: 65px;
          margin: 0;
          padding: 1em 0;
          text-align: center;
        }
        @media (max-width: 1024px) {
          main {
            padding: 0 15px;
          }
        }
      `}</style>
    </main>
  );
}

export default withFirebase(Step1);
