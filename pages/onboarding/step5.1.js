import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import Phoneinput from "../../components/Phoneinput";
import Header from "../../components/Header";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

class Step51 extends React.Component {
  componentDidMount() {
    global.analytics.page("Step 5.1");
    let storedLeadId = "";

    if (window.localStorage.getItem("leadId")) {
      storedLeadId = window.localStorage.getItem("leadId");
    }

    this.setState({ leadId: storedLeadId });
  }

  static async getInitialProps({ query }) {
    const props = {
      displayMessage: query.onboardingNotFinished
    };

    return props;
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          title={
            this.props.displayMessage
              ? "Please follow the next steps in order to complete your registration"
              : "And what is your phone number?"
          }
        >
          <Formik
            initialValues={{
              phoneNumber: ""
            }}
            onSubmit={values => {
              window.localStorage.setItem("phone", values.phoneNumber);
              window.firebase
                .auth()
                .currentUser.getIdToken(true)
                .then(idToken => {
                  axios
                    .put(
                      `${API}/v1/subscribers`,
                      {
                        leadId: this.state.leadId,
                        phone: values.phoneNumber
                      },
                      {
                        headers: {
                          Authorization: idToken
                        }
                      }
                    )
                    .then(() => {
                      Router.push({
                        pathname: "/onboarding/step6"
                      });
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
            }}
            render={props => (
              <Form>
                <Phoneinput
                  value={props.values.phoneNumber}
                  onChangeEvent={props.setFieldValue}
                  onBlurEvent={props.setFieldTouched}
                  label="Phone"
                  fieldname="phoneNumber"
                />
                <Button primary disabled={!!props.values.phoneNumber !== true}>
                  Next
                </Button>
              </Form>
            )}
          />
        </SingleStep>
        <style jsx>{`
          main {
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
        `}</style>
      </main>
    );
  }
}

export default Step51;
