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
      pathname: "/onboarding/step4"
    });
  },
  displayName: "CustomForm"
});

class CustomForm extends React.Component {
  render() {
    return (
      <Form>
        <div className="content">
          <BulletItem content="10% contracted discount" bulletIcon="dollar" />
          <BulletItem
            content="$10-$20 estimated monthly savings"
            bulletIcon="gift"
          />
          <BulletItem
            content="90% reduction in carbon emissions"
            bulletIcon="co2"
          />
          <figure>
            <img src="/static/images/illustrations/t&c.png" alt="" />
          </figure>
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
          figure {
            max-width: 70%;
            margin: 2rem auto;
            border-radius: 4px;
            border: 1px solid var(--color-primary);
            padding: 10px;
            background-color: #fff;
          }
          img {
            max-width: 100%;
          }
        `}</style>
      </Form>
    );
  }
}

const EnhancedCustomForm = formikEnhancer(CustomForm);

class Step3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUtility: ""
    };
  }

  componentDidMount() {
    global.analytics.page("Step 3");
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
        <SingleStep title="Great news! We've got a project in your area. Here's what we can offer:">
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

export default Step3;
