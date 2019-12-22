import React from "react";
import Router from "next/router";
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

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        code: false,
        message: ""
      }
    };
  }

  componentDidMount() {
    // window.firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     Router.push({
    //       pathname: "/dashboard"
    //     });
    //   }
    // });
  }

  componentDidUpdate() {
    this.props.firebase.doUpdateUser(user => {
      if (user) {
        Router.push({
          pathname: "/dashboard"
        });
      }
    });
  }

  autenticate(values) {
    const { error } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(values.emailAddress, values.password)
      .then(firebaseData => {
        if (!error.code) {
          this.props.firebase.doGetCurrentUser(idToken =>
            axios
              .get(`${API}/v1/subscribers/${firebaseData.user.uid}`, {
                headers: {
                  Authorization: idToken
                }
              })
              .then(response => {
                const user = response.data.data;

                window.localStorage.setItem("leadId", user.leadId);

                global.analytics.identify(user.leadId, {
                  email: user.email
                });

                global.analytics.track("User Signed In", {});

                // retrieve utility information
                const utility = user?.milestiones?.utility || false;

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
                  const postalCode = user.milestones.address.postalCode;
                  localStorage.setItem(
                    "postalCode",
                    JSON.stringify(postalCode)
                  );
                }

                if (user?.milestones?.utilityPaperOnly) {
                  localStorage.setItem(
                    "billingMethod",
                    JSON.stringify({ billingMethod: "paper" })
                  );
                }

                // forward to the right page
                if (user.signupCompleted) {
                  Router.push({
                    pathname: "/dashboard"
                  });
                } else if (!user.milestones.utilityInfoCompleted) {
                  Router.push({
                    pathname: "/onboarding/step2",
                    query: {
                      onboardingNotFinished: true
                    }
                  });
                } else if (
                  (user.milestones.utilityInfoCompleted &&
                    user.milestones.utilityLoginSuccessful) ||
                  !user.milestones.bankInfoCompleted
                ) {
                  Router.push({
                    pathname: "/onboarding/step6",
                    query: {
                      onboardingNotFinished: true
                    }
                  });
                } else if (
                  user.milestones.utilityInfoCompleted &&
                  !user.milestones.addressInfoCompleted
                ) {
                  Router.push({
                    pathname: "/onboarding/step4.2",
                    query: {
                      onboardingNotFinished: true
                    }
                  });
                }
              })
              .catch(err => {
                console.log(err);
              })
          );
        }
      })
      .catch(error => {
        this.setState({ error: { code: error.code, message: error.message } });
      });
  }

  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    const { error } = this.state;

    return (
      <main>
        <Header first />
        <SingleStep prefix="Enter your email address to sign in or create an account">
          <Formik
            initialValues={{
              emailAddress: "",
              password: ""
            }}
            onSubmit={values => {
              this.autenticate(values);
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
                <p className="error">{error.message}</p>
                <Button
                  primary
                  disabled={
                    !!props.values.emailAddress !== true ||
                    !!props.values.password !== true
                  }
                  onClick={() => {
                    this.setState({
                      error: {
                        code: false,
                        message: ""
                      }
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
              Router.push({
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
            height: 52px;
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
}

export default withFirebase(Index);
