import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import Header from "../../components/Header";
import RadioCard from "../../components/RadioCard";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";

class Step6 extends React.Component {
  componentDidMount() {
    global.analytics.page("Step 6");

    let storedLeadId = "";
    let storedUtility = "";
    let storedAgreementChecked = false;
    let storedAddress = "";

    if (window.localStorage.getItem("leadId")) {
      storedLeadId = window.localStorage.getItem("leadId");
    }
    if (window.localStorage.getItem("utility")) {
      storedUtility = JSON.parse(window.localStorage.getItem("utility"));
    }
    if (window.localStorage.getItem("acceptedTermsAndConditions")) {
      storedAgreementChecked = JSON.parse(
        window.localStorage.getItem("acceptedTermsAndConditions")
      );
    }
    if (window.localStorage.getItem("address")) {
      storedAddress = JSON.parse(window.localStorage.getItem("address"));
    }

    this.setState({
      leadId: storedLeadId,
      utility: storedUtility.label,
      address: storedAddress,
      agreedTermsAndConditions: storedAgreementChecked
    });
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
              ? "You've completed most steps, we only need your utility information, Do you have an on-line account with your electric utility?"
              : "Do you have an on-line account with your electric utility?"
          }
        >
          <Formik
            initialValues={{
              billingMethod: ""
            }}
            onSubmit={values => {
              window.localStorage.setItem(
                "billingMethod",
                JSON.stringify(values)
              );
              Router.push({
                pathname: "/onboarding/step7"
              });
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <RadioCard
                    number="1"
                    name="billingMethod"
                    value="electronic"
                    heading="Yes"
                  />
                  <RadioCard
                    number="2"
                    name="billingMethod"
                    value="paper"
                    heading="No"
                  />
                  <Button
                    primary
                    disabled={!!props.values.billingMethod !== true}
                  >
                    Next
                  </Button>
                </Form>
              </React.Fragment>
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

export default Step6;
