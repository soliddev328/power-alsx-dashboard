import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import Header from "../../components/Header";
import Input from "../../components/Input";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import axios from "axios";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

class Step5 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: {
        code: false,
        leadId: "",
        message: ""
      }
    };
  }

  componentDidMount() {
    global.analytics.page("Step 5");
    let storedLeadId = "";

    if (localStorage.getItem("leadId")) {
      storedLeadId = localStorage.getItem("leadId");
    }

    this.setState({
      leadId: storedLeadId
    });
  }

  submit(values) {
    const { leadId } = this.state;

    window.firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        axios
          .put(
            `${API}/v1/subscribers`,
            {
              leadId: leadId,
              password: values.password
            },
            {
              headers: {
                Authorization: idToken
              }
            }
          )
          .then(response => {
            Router.push({
              pathname: "/onboarding/step6"
            });
          });
      });
  }

  render() {
    const { error } = this.state;
    return (
      <main>
        <Header />
        <SingleStep title="Please create a password for your account with us, so you can view your past bills, total emissions you've prevented, and your total savings">
          <Formik
            initialValues={{
              password: ""
            }}
            onSubmit={values => {
              this.submit(values);
            }}
          >
            {props => (
              <>
                <Form>
                  <Input
                    type="password"
                    label="Create a Password"
                    fieldname="password"
                    required
                  />
                  <p className="password-explanation">
                    * This password will let you log back in later
                  </p>
                  <p className="error">
                    {error.message} {error.link && error.link}
                  </p>
                  <Button primary disabled={!!props.values.password !== true}>
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
          .password-explanation {
            max-width: 350px;
            margin: 0 auto;
            font-size: 12px;
          }
        `}</style>
      </main>
    );
  }
}

export default Step5;
