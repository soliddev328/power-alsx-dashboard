import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import Header from "../../components/Header";
import Input from "../../components/Input";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import Stepper from "../../components/Stepper";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

class Step8 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentUtility: "",
      forgotPwdLink: "",
      forgotEmailLink: "",
      createLoginLink: ""
    };
  }

  static async getInitialProps({ req, query, params }) {
    if (req) {
      try {
        return { query: req.query, params: req.params };
      } catch (err) {
        return { query: req.query, params: req.params };
      }
    }

    return { query, params };
  }

  getLinks() {
    let storedAddress = JSON.parse(localStorage.getItem("address"));
    let storedUtility = JSON.parse(localStorage.getItem("utility"));

    const rawParams = {
      utility: encodeURIComponent(storedUtility.label),
      state: storedAddress.state
    };

    const generatedParams = Object.entries(rawParams)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    axios(`${API}/v1/utilities/?${generatedParams}`).then(response => {
      if (response.data.data) {
        this.setState({
          forgotPwdLink: response.data.data[0].forgotPwdLink,
          forgotEmailLink: response.data.data[0].forgotEmailLink,
          createLoginLink: response.data.data[0].createLoginLink
        });
      }
    });
  }

  componentDidMount() {
    global.analytics.page("Step 8");

    let storedLeadId = "";
    let storedUtility = "";
    let storedBillingMethod = "";

    if (localStorage.getItem("leadId")) {
      storedLeadId = localStorage.getItem("leadId");
    }

    if (localStorage.getItem("utility")) {
      storedUtility = JSON.parse(localStorage.getItem("utility"));
    }

    if (localStorage.getItem("billingMethod")) {
      storedBillingMethod = JSON.parse(localStorage.getItem("billingMethod"));
    }

    this.setState(
      {
        leadId: storedLeadId,
        utility: storedUtility.label,
        currentUtility: storedUtility,
        billingMethod: storedBillingMethod
      },
      this.getLinks()
    );
  }

  renderUtilityLogin() {
    return (
      <React.Fragment>
        {this.props.query && this.props.query.error && (
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
            this.setState({ isLoading: true });

            axios
              .put(`${API}/v1/subscribers/utilities/link`, {
                leadId: this.state.leadId,
                utility: this.state.utility,
                utilityUsername: values.utilityUser,
                utilityPwd: values.utilityPassword
              })
              .then(response => {
                localStorage.setItem(
                  "linkedUtility",
                  JSON.stringify(response.data)
                );
                if (response.data.data && response.data.data[0]) {
                  if (response.data.data[0].hasLoggedIn) {
                    localStorage.setItem("partialConnection", false);
                    Router.push({
                      pathname: "/onboarding/step9"
                    });
                  } else {
                    this.setState({ isLoading: false });
                    Router.push({
                      pathname: "/onboarding/step8",
                      query: {
                        error: true
                      }
                    });
                  }
                } else {
                  localStorage.setItem("partialConnection", true);
                  Router.push({
                    pathname: "/onboarding/step9"
                  });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          }}
          render={props => (
            <React.Fragment>
              <Form>
                <Input label="User name" fieldname="utilityUser" />
                <Input
                  type="password"
                  label="Password"
                  fieldname="utilityPassword"
                  autoComplete="no"
                />

                <Button
                  primary
                  disabled={
                    !props.values.utilityUser != "" ||
                    !props.values.utilityPassword != ""
                  }
                >
                  Next
                </Button>
              </Form>
            </React.Fragment>
          )}
        />
        <style jsx>{`
          .error {
            text-align: center;
            color: red;
          }
        `}</style>
      </React.Fragment>
    );
  }

  renderAskForUtilityAccount() {
    return (
      <Formik
        initialValues={{
          utilityAccountNumber: ""
        }}
        onSubmit={values => {
          axios
            .put(`${API}/v1/subscribers`, {
              leadId: this.state.leadId,
              utilityAccountNumber: values.utilityAccountNumber
            })
            .then(() => {
              localStorage.setItem("partialConnection", true);
              Router.push({
                pathname: "/onboarding/step9"
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        }}
        render={props => (
          <React.Fragment>
            <Form>
              <Input label="Account Number" fieldname="utilityAccountNumber" />
              <Button
                primary
                disabled={!props.values.utilityAccountNumber != ""}
              >
                Next
              </Button>
            </Form>
          </React.Fragment>
        )}
      />
    );
  }

  renderForms() {
    const canLinkAccount =
      this.state.billingMethod &&
      this.state.billingMethod.billingMethod.indexOf("paper") !== 0;

    return canLinkAccount
      ? this.renderUtilityLogin()
      : this.renderAskForUtilityAccount();
  }

  renderLoader() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  renderText() {
    const canLinkAccount =
      this.state.billingMethod &&
      this.state.billingMethod.billingMethod.indexOf("paper") !== 0;
    const text = canLinkAccount
      ? "Ok great. Let's connect your account and get you saving!"
      : "No problem! We can use your account number to get you connected and saving.";

    return this.state.isLoading ? "" : text;
  }

  render() {
    const canLinkAccount =
      this.state.billingMethod &&
      this.state.billingMethod.billingMethod.indexOf("paper") !== 0;
    return (
      <main>
        <Header />
        <SingleStep title={this.renderText()}>
          {this.state && this.state.currentUtility && !this.state.isLoading && (
            <figure>
              <img
                src={this.state.currentUtility.image.src}
                alt={this.state.currentUtility.image.altText}
              />
            </figure>
          )}
          {this.state.isLoading ? this.renderLoader() : this.renderForms()}
          {!this.state.isLoading && canLinkAccount && (
            <div className="links">
              {this.state.createLoginLink && (
                <a className="cta" href={this.state.createLoginLink}>
                  Create an account
                </a>
              )}
              {this.state.forgotEmailLink && (
                <a className="cta" href={this.state.forgotEmailLink}>
                  Forgot username
                </a>
              )}
              {this.state.forgotPwdLink && (
                <a className="cta" href={this.state.forgotPwdLink}>
                  Forgot password
                </a>
              )}
            </div>
          )}
          {!this.state.isLoading && (
            <Stepper>
              <li className="steplist__step steplist__step-done">1</li>
              <li className="steplist__step steplist__step-done">2</li>
              <li className="steplist__step steplist__step-done">3</li>
              <li className="steplist__step steplist__step-done">4</li>
              <li className="steplist__step steplist__step-doing">5</li>
              <li className="steplist__step">6</li>
            </Stepper>
          )}
        </SingleStep>
        <style jsx>{`
          main {
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
}

export default Step8;
