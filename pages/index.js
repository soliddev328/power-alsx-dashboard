import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { withFirebase } from "../firebase";
import axios from "axios";
import SingleStep from "../components/SingleStep";
import Header from "../components/Header";
import Separator from "../components/Separator";
import Input from "../components/Input";
import Button from "../components/Button";
import CONSTANTS from "../globals";
import routeUser from "../lib/route-user";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function Index(props) {
  const router = useRouter();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const windowLocationHref = location.href;
    const email = localStorage.getItem("email") || false;
    if (props.firebase.doCheckIsSignInWithEmailLink(windowLocationHref)) {
      if (!email) {
        email = prompt("Please provide your email for confirmation");
      }
      props.firebase
        .doSignInWithEmailLink(email, windowLocationHref)
        .then(response => {
          const { user } = response;
          global.analytics.track("User Signed In", {});
          console.log(response.additionalUserInfo);
          console.log(response.additionalUserInfo.isNewUser);
          // if a lead that is tied to an anonymous user signs in through email
          // then we need to update the lead with the new firebase uid.
          //if (response.additionalUserInfo.isNewUser) {
          user.getIdToken(true).then(async idToken => {
            axios
              .put(
                `${API}/v1/subscribers`,
                {
                  leadFirebaseMerge: true,
                  email: email,
                  firebaseUserId: user.uid
                  // email verified checkbox
                },
                {
                  headers: {
                    Authorization: idToken
                  }
                }
              )
              .then(crmResponse => {
                console.log("Update made");
                console.log({ crmResponse });
                const user = crmResponse?.data?.data;
                if (user) {
                  user.isAnonymous = false;
                  // forward user to the right page
                  routeUser(user);
                } else {
                  console.log(`No user with ${email} in the system.`);
                }
              })
              .catch(error => {
                console.log(error);
              });
          });
          //}
          console.log(response);
          global.analytics.track("User Signed In", {});
          if (history && history.replaceState) {
            history.replaceState(
              {},
              document.title,
              location.href.split("?")[0]
            );
          }
        })
        .catch(error => {
          setError({ code: error.code, message: error.message });
        });
    }
  }, []);

  const authenticate = values => {
    props.firebase
      .doSignInWithEmailAndPassword(values.emailAddress, values.password)
      .then(response => {
        const { user } = response;
        global.analytics.track("User Signed In", {});
      })
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

        @media (max-width: 1024px) {
          main {
            padding: 0 15px;
          }
        }
      `}</style>
    </main>
  );
}

export default withFirebase(Index);
