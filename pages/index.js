import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";

import { withFirebase } from "../firebase";

import SingleStep from "../components/SingleStep";
import Header from "../components/Header";
import Separator from "../components/Separator";
import Input from "../components/Input";
import Button from "../components/Button";

function Index(props) {
  const router = useRouter();
  const [error, setError] = useState();

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
          global.analytics.identify(user?.uid, {
            email: user?.email
          });
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
        global.analytics.identify(user?.uid, {
          email: user?.email
        });
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
      `}</style>
    </main>
  );
}

export default withFirebase(Index);
