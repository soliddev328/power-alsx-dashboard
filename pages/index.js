import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";

import { withFirebase } from "../firebase";

import SingleStep from "../components/SingleStep";
import Header from "../components/Header";
import Separator from "../components/Separator";
import Input from "../components/Input";
import Button from "../components/Button";
import CONSTANTS from "../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function Index(props) {
  const router = useRouter();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loggedIn"))) {
      router.push("/dashboard");
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const windowLocationHref = location.href;
    const email = localStorage.getItem("email") || false;
    if (props.firebase.doCheckIsSignInWithEmailLink(windowLocationHref)) {
      if (!email) {
        email = prompt("Please provide your email for confirmation");
      }
      props.firebase
        .doSignInWithEmailLink(email, windowLocationHref)
        .then(firebaseUser => {
          if (history && history.replaceState) {
            history.replaceState(
              {},
              document.title,
              location.href.split("?")[0]
            );
          }
          authenticatedLogic(firebaseUser);
        })
        .catch(error => {
          setError({ code: error.code, message: error.message });
        });
    }
  }, []);

  const authenticatedLogic = firebaseUser => {
    const { uid } = firebaseUser.user;
    if (uid) {
      props.firebase.doGetCurrentUserIdToken(idToken => {
        axios
          .get(`${API}/v1/subscribers/${uid}`, {
            headers: {
              Authorization: idToken
            }
          })
          .then(response => {
            const user = response?.data?.data;

            localStorage.setItem("leadId", user?.leadId);
            localStorage.setItem("loggedIn", true);

            global.analytics.identify(user?.leadId, {
              email: user?.email
            });

            global.analytics.track("User Signed In", {});

            // retrieve utility information
            const utility = user?.milestones?.utility;
            const imageName = utility?.replace(/\s/g, "") || false;
            const utilityInfo = {
              image: {
                src: imageName
                  ? `/static/images/utilities/${imageName}.png`
                  : "/static/images/utilities/placeholder.png",
                altText: "Utility logo"
              },
              label: utility
            };

            localStorage.setItem("utility", JSON.stringify(utilityInfo));

            // retrieve postalcode
            if (user?.milestones?.address?.postalCode) {
              const postalCode = user?.milestones?.address?.postalCode;
              localStorage.setItem("postalCode", JSON.stringify(postalCode));
            }

            if (user?.milestones?.utilityPaperOnly) {
              localStorage.setItem(
                "billingMethod",
                JSON.stringify({ billingMethod: "paper" })
              );
            }

            const userStillNeedstoAddPwd =
              !user?.milestones?.bankInfoCompleted && firebaseUser?.isAnonymous;

            const userStillNeedsToAddUtilityInfo = !user?.milestones
              ?.utilityInfoCompleted;

            const userStillNeedstoAddBankInfo =
              (user?.milestones?.utilityInfoCompleted &&
                user?.milestones?.utilityLoginSuccessful) ||
              !user?.milestones?.bankInfoCompleted;

            const userStillNeedsToAddAddressInfo =
              user?.milestones?.utilityInfoCompleted &&
              !user?.milestones?.addressInfoCompleted;

            // forward to the right page
            if (user?.signupCompleted) {
              localStorage.setItem("loggedIn", true);
              router.push({
                pathname: "/dashboard"
              });
            } else if (userStillNeedsToAddUtilityInfo) {
              router.push({
                pathname: "/onboarding/step2",
                query: {
                  onboardingNotFinished: true
                }
              });
            } else if (userStillNeedsToAddAddressInfo) {
              router.push({
                pathname: "/onboarding/step4.2",
                query: {
                  onboardingNotFinished: true
                }
              });
            } else if (userStillNeedstoAddPwd) {
              router.push({
                pathname: "/onboarding/step5",
                query: {
                  onboardingNotFinished: true
                }
              });
            } else if (userStillNeedstoAddBankInfo) {
              router.push({
                pathname: "/onboarding/step7",
                query: {
                  onboardingNotFinished: true
                }
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  };

  const authenticate = values => {
    props.firebase
      .doSignInWithEmailAndPassword(values.emailAddress, values.password)
      .then(authenticatedLogic)
      .catch(failure => {
        localStorage.setItem("email", values.emailAddress);
        if (failure.code === "auth/wrong-password") {
          setError({
            code: failure.code,
            message: (
              <>
                The password is invalid or the user does not have a password.{" "}
                <a href="/emailsignin">Click here</a> to access your account and
                complete sign-up.
              </>
            )
          });
        } else {
          setError({ code: failure.code, message: failure.message });
        }
      });
  };

  return (
    !isLoading && (
      <main>
        <Header first />
        <SingleStep
          isFirst
          prefix="Enter your email address to sign in or create an account"
        >
          <Formik
            initialValues={{
              emailAddress: "",
              password: ""
            }}
            onSubmit={values => {
              authenticate(values);
            }}
          >
            {props => (
              <Form>
                <Input
                  label="Email"
                  fieldname="emailAddress"
                  type="email"
                  required
                  autoFocus
                />
                <Input
                  label="Password"
                  fieldname="password"
                  type="password"
                  required
                />
                <p className="error">{error?.message}</p>
                <Button
                  primary
                  disabled={
                    !!props.values.emailAddress !== true ||
                    !!props.values.password !== true
                  }
                  onClick={() => {
                    setError({
                      code: false,
                      message: ""
                    });
                  }}
                >
                  Sign in
                </Button>
              </Form>
            )}
          </Formik>
          <div className="link">
            <a href="/forgot-password" className="cta">
              Forgot password?
            </a>
          </div>
          <Separator text="I don't have an account" />
          <Button
            primary
            onClick={() => {
              router.push({
                pathname: "/onboarding/step1"
              });
            }}
          >
            Sign Up
          </Button>
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
          .link {
            display: flex;
            justify-content: center;
            margin: 25px 0;
          }
        `}</style>
      </main>
    )
  );
}

export default withFirebase(Index);
