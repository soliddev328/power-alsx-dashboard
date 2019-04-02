import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import Phoneinput from "../../components/Phoneinput";
import Header from "../../components/Header";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import Stepper from "../../components/Stepper";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

class Step6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    global.analytics.page("Step 6");

    let storedLeadId = "";

    if (localStorage.getItem("leadId")) {
      storedLeadId = localStorage.getItem("leadId");
    }

    this.setState({
      leadId: storedLeadId
    });
  }

  capitalize(word) {
    return word && word[0].toUpperCase() + word.slice(1);
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          title={`Welcome ${this.capitalize(
            this.state.name.firstName
          )}! What phone number would you like to use with the account?`}
        >
          <Formik
            initialValues={{
              phoneNumber: ""
            }}
            onSubmit={values => {
              localStorage.setItem("phoneNumer", values.phoneNumber);
              axios
                .put(`${API}/v1/subscribers`, {
                  leadId: this.state.leadId,
                  phone: values.phoneNumber
                })
                .then(response => {
                  Router.push({
                    pathname: "/onboarding/step7"
                  });
                })
                .catch(error => {
                  console.log(error);
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
                <Button primary disabled={!props.values.phoneNumber != ""}>
                  Next
                </Button>
              </Form>
            )}
          />
          <Stepper>
            <li className="steplist__step steplist__step-done">1</li>
            <li className="steplist__step steplist__step-done">2</li>
            <li className="steplist__step steplist__step-doing">3</li>
            <li className="steplist__step">4</li>
            <li className="steplist__step">5</li>
            <li className="steplist__step">6</li>
          </Stepper>
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

export default Step6;
