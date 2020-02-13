import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import { withFirebase } from "../../firebase";
import { FadeLoader } from "react-spinners";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function Step4(props) {
  const router = useRouter();
  const { query } = router;
  const [isLoading, setIsLoading] = useState(false);
  const [canLinkAccount, setCanLinkAccount] = useState(false);
  const [leadId, setLeadId] = useState();
  const [utility, setUtility] = useState();
  const [currentUtility, setCurrentUtility] = useState();
  const [postalCode, setPostalCode] = useState();
  const [billingMethod, setBillingMethod] = useState();
  const [forgotPwdLink, setForgotPwdLink] = useState();
  const [forgotEmailLink, setForgotEmailLink] = useState();
  const [createLoginLink, setCreateLoginLink] = useState();
  const [agreement, setAgreement] = useState({
    terms: "",
    conditions: ""
  });

  const getLinks = () => {
    let storedPostalCode = JSON.parse(localStorage.getItem("postalCode"));
    let storedUtility = JSON.parse(localStorage.getItem("utility"));

    if (storedPostalCode) {
      axios(`${API}/v1/zipcodes/${storedPostalCode}`).then(response => {
        if (response.data.data) {
          const rawParams = {
            utility: encodeURIComponent(storedUtility.label),
            state: response.data.data.state
          };

          const generatedParams = Object.entries(rawParams)
            .map(([key, val]) => `${key}=${val}`)
            .join("&");

          axios(`${API}/v1/utilities/?${generatedParams}`).then(response => {
            if (response.data.data) {
              const data = response.data.data[0];

              setForgotPwdLink(data.forgotPwdLink);
              setForgotEmailLink(data.forgotEmailLink);
              setCreateLoginLink(data.createLoginLink);
              setAgreement({
                terms: data.agreement.termsLink,
                conditions: data.agreement.conditionsLink
              });
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    global.analytics.page("Step 4");

    let storedLeadId = "";
    let storedUtility = "";
    let storedBillingMethod = "";
    let storedPostalCode = "";

    if (localStorage.getItem("postalCode")) {
      storedPostalCode = JSON.parse(localStorage.getItem("postalCode"));
    }

    if (localStorage.getItem("leadId")) {
      storedLeadId = localStorage.getItem("leadId");
    }

    if (localStorage.getItem("utility")) {
      storedUtility = JSON.parse(localStorage.getItem("utility"));
    }

    if (localStorage.getItem("billingMethod")) {
      storedBillingMethod = JSON.parse(localStorage.getItem("billingMethod"));
    }

    try {
      setLeadId(storedLeadId);
      setUtility(storedUtility.label);
      setCurrentUtility(storedUtility);
      setPostalCode(storedPostalCode);
      //console.log(storedBillingMethod);
      setBillingMethod(storedBillingMethod);
    } finally {
      //console.log(billingMethod); //billingMethod is undefined
      setCanLinkAccount(!storedBillingMethod?.includes("paper"));
      getLinks();
    }
  }, []);

  const renderText = () => {
    let text = canLinkAccount
      ? "Ok great. Let's connect your account and get you saving!"
      : "No problem! We can use your account number to get you connected and saving.";

    return isLoading ? "" : text;
  };

  const renderUtilityLogin = () => {
    return (
      <>
        {query && query.error && (
          <p className="error">
            There was a problem connecting, could you please verify your login.
          </p>
        )}
        <Formik
          initialValues={{
            utilityUser: "",
            utilityPassword: ""
          }}
          onSubmit={values => {
            props.firebase.doUpdateUser((user, idToken) => {
              setIsLoading(true);
              axios
                .put(
                  `${API}/v1/subscribers/utilities/link`,
                  {
                    leadId: leadId,
                    utility: utility,
                    agreementChecked: !!values.acceptedTermsAndConditions,
                    utilityUsername: values.utilityUser,
                    utilityPwd: values.utilityPassword
                  },
                  {
                    headers: {
                      Authorization: idToken
                    }
                  }
                )
                .then(response => {
                  const { data } = response?.data;

                  localStorage.setItem("linkedUtility", JSON.stringify(data));

                  if (data[0]) {
                    if (data[0].hasLoggedIn) {
                      localStorage.setItem("partialConnection", false);
                      router.push({
                        pathname: "/onboarding/step5",
                        query: {
                          next: true
                        }
                      });
                    } else {
                      setIsLoading(false);
                      router.push({
                        pathname: "/onboarding/step4",
                        query: {
                          error: true
                        }
                      });
                    }
                  } else {
                    localStorage.setItem("partialConnection", true);
                    router.push({
                      pathname: "/onboarding/step5",
                      query: {
                        next: true
                      }
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            });
          }}
        >
          {props => (
            <Form>
              <Input label="User name" fieldname="utilityUser" />
              <Input
                type="password"
                label="Password"
                fieldname="utilityPassword"
                autoComplete="no"
              />
              <Checkbox fieldname="acceptedTermsAndConditions">
                <p className="checkbox__label">
                  I authorize Common Energy to act as my Agent and to enroll me
                  in a clean energy savings program, according to these{" "}
                  <a
                    href={agreement.terms}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    terms
                  </a>{" "}
                  and{" "}
                  <a
                    href={agreement.conditions}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    conditions
                  </a>
                  .
                </p>
              </Checkbox>
              <Button
                primary
                disabled={
                  !props.values.acceptedTermsAndConditions != "" ||
                  !props.values.utilityUser != "" ||
                  !props.values.utilityPassword != ""
                }
              >
                Next
              </Button>
            </Form>
          )}
        </Formik>
        <style jsx>{`
          .error {
            text-align: center;
            color: red;
          }
        `}</style>
      </>
    );
  };

  const renderAskForUtilityAccount = () => {
    return (
      <Formik
        initialValues={{
          utilityAccountNumber: "",
          acceptedTermsAndConditions: false
        }}
        onSubmit={values => {
          props.firebase.doUpdateUser((user, idToken) => {
            axios
              .put(
                `${API}/v1/subscribers`,
                {
                  leadId: leadId,
                  agreementChecked: !!values.acceptedTermsAndConditions,
                  utilityAccountNumber: values.utilityAccountNumber
                },
                {
                  headers: {
                    Authorization: idToken
                  }
                }
              )
              .then(() => {
                localStorage.setItem("partialConnection", true);
                router.push({
                  pathname: "/onboarding/step4.2"
                });
              })
              .catch(error => {
                console.log(error);
              });
          });
        }}
      >
        {props => (
          <Form>
            <Input label="Account Number" fieldname="utilityAccountNumber" />
            <Checkbox fieldname="acceptedTermsAndConditions">
              <p className="checkbox__label">
                I authorize Common Energy to act as my Agent and to enroll me in
                a clean energy savings program, according to these{" "}
                <a
                  href={agreement.terms}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms
                </a>{" "}
                and{" "}
                <a
                  href={agreement.conditions}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  conditions
                </a>
                .
              </p>
            </Checkbox>
            <Button
              primary
              disabled={
                !props.values.utilityAccountNumber != "" ||
                !props.values.acceptedTermsAndConditions
              }
            >
              Next
            </Button>
          </Form>
        )}
      </Formik>
    );
  };

  const renderLoader = () => {
    return (
      <>
        <div className="loading">
          <FadeLoader
            className="spinner"
            height={15}
            width={4}
            radius={1}
            color={"#FF69A0"}
            loading={true}
          />
          <p>Connecting your account</p>
        </div>
        <p className="suffix">(this may take up to 10 seconds)</p>
        <style jsx>{`
          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .loading p {
            font-size: 1rem;
            text-align: center;
          }

          p.suffix {
            font-size: 0.8rem;
          }
        `}</style>
      </>
    );
  };

  return (
    <main>
      <Header />
      <SingleStep title={renderText()}>
        {currentUtility && !isLoading && (
          <figure>
            <img
              src={currentUtility?.image?.src}
              alt={currentUtility?.image?.altText}
            />
          </figure>
        )}
        {isLoading
          ? renderLoader()
          : canLinkAccount
          ? renderUtilityLogin()
          : renderAskForUtilityAccount()}
        {!isLoading && canLinkAccount && (
          <div className="links">
            {createLoginLink && (
              <a className="cta" href={createLoginLink}>
                Create an online utility account
              </a>
            )}
            {forgotEmailLink && (
              <a className="cta" href={forgotEmailLink}>
                Forgot your utility username
              </a>
            )}
            {forgotPwdLink && (
              <a className="cta" href={forgotPwdLink}>
                Forgot your utility password
              </a>
            )}
          </div>
        )}
      </SingleStep>
      <style jsx>{`
        main {
          display: block;
          height: 88vh;
          max-width: 700px;
          margin: 0 auto;
        }
        figure {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          margin: 0;
          margin-bottom: 1em;
          padding: 1em;
        }

        img {
          max-width: 60%;
        }

        .links {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </main>
  );
}

Step4.getInitialProps = ({ req, query, params }) => {
  if (req) {
    try {
      return { query: req.query, params: req.params };
    } catch (err) {
      return { query: req.query, params: req.params };
    }
  }

  return { query, params };
};

export default withFirebase(Step4);
