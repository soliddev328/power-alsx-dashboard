import React from "react";
import Router from "next/router";
import { Form, withFormik } from "formik";
import Header from "../../components/Header";
import Checkbox from "../../components/Checkbox";
import BulletItem from "../../components/BulletItem";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";

const formikEnhancer = withFormik({
  mapPropsToValues: props => {
    return {
      terms: props.agreement.terms,
      conditions: props.agreement.conditions
    };
  },
  mapValuesToPayload: x => x,
  handleSubmit: payload => {
    localStorage.setItem(
      "acceptedTermsAndConditions",
      JSON.stringify(payload.acceptedTermsAndConditions)
    );
    Router.push({
      pathname: "/onboarding/step5"
    });
  },
  displayName: "CustomForm"
});

class CustomForm extends React.Component {
  render() {
    return (
      <Form>
        <div className="content">
          {/* <BulletItem
            content="Clean energy credits each month"
            bulletIcon="dollar"
          /> */}
          <BulletItem content="$10-$20 monthly savings*" bulletIcon="gift" />
          <BulletItem
            content="90% reduction in carbon emissions"
            bulletIcon="co2"
          />
          {/* <BulletItem
            content="One unified monthly statement"
            bulletIcon="discount"
          />
          <BulletItem content="No cancellation fees" bulletIcon="cross" />
          <BulletItem content="Free signup" bulletIcon="money" /> */}
        </div>
        <Checkbox fieldname="acceptedTermsAndConditions">
          <p className="checkbox__label">
            I authorize Common Energy to act as my Agent and to enroll me in a
            clean energy savings program, according to these{" "}
            <a
              href={this.props.agreement.terms}
              target="_blank"
              rel="noopener noreferrer"
            >
              terms
            </a>{" "}
            and{" "}
            <a
              href={this.props.agreement.conditions}
              target="_blank"
              rel="noopener noreferrer"
            >
              conditions
            </a>
            .
          </p>
        </Checkbox>
        <p className="disclaimer">
          *Estimated based on a 10% contracted discount to your utility
        </p>
        <Button
          primary
          disabled={!this.props.values.acceptedTermsAndConditions}
        >
          Let's do this!
        </Button>
        <style jsx>{`
          .disclaimer {
            text-align: center;
          }
        `}</style>
      </Form>
    );
  }
}

const EnhancedCustomForm = formikEnhancer(CustomForm);

class Step4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUtility: ""
    };
  }

  componentDidMount() {
    global.analytics.page("Step 4");
    let utility = "";

    if (localStorage.getItem("utility")) {
      utility = JSON.parse(localStorage.getItem("utility"));
    }

    this.setState({ currentUtility: utility });
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep title="Great news! We've got a project in your area. We can lower your costs and emissions! Here's what we can offer:">
          <EnhancedCustomForm
            agreement={{
              terms: this.state.currentUtility.terms,
              conditions: this.state.currentUtility.conditions
            }}
          />
        </SingleStep>
        <style jsx>{`
          main {
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
          .content {
            margin: 0 auto;
          }
          .disclaimer {
            text-align: center;
            font-size: 0.8rem;
            margin-top: 0;
          }
          .checkbox__label {
            margin: 0.5em;
          }
        `}</style>
      </main>
    );
  }
}

export default Step4;
