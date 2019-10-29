import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import Header from "../../components/Header";
import RadioCard from "../../components/RadioCard";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    global.analytics.page("Step 3");
  }

  render() {
    const { name, leadId, postalCode, errorMessage } = this.state;

    return (
      <main>
        <Header />
        <SingleStep title="Do you have an online account with your electric utility?">
          <Formik
            initialValues={{
              billingMethod: ""
            }}
            onSubmit={values => {
              localStorage.setItem("billingMethod", JSON.stringify(values));
              Router.push({
                pathname: "/onboarding/step4"
              });
            }}
            render={props => (
              <>
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
                  <Button primary disabled={!props.values.billingMethod != ""}>
                    Next
                  </Button>
                </Form>
              </>
            )}
          />
        </SingleStep>
        <style jsx>{`
          main {
            display: block;
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
        `}</style>
      </main>
    );
  }
}

export default Step3;
