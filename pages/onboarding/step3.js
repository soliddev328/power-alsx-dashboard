import React from "react";
import Router from "next/router";
import { Form, withFormik } from "formik";
import axios from "axios";
import Header from "../../components/Header";
import Checkbox from "../../components/Checkbox";
import BulletItem from "../../components/BulletItem";
import Progressbar from "../../components/Progressbar";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

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
    console.log(this.props.project.imageUrl);
    return (
      <Form>
        <div className="content">
          <figure>
            <img
              src={
                this.props.project.imageUrl !== ""
                  ? "/static/images/illustrations/t&c.png"
                  : this.props.project.imageUrl
              }
              alt=""
            />
          </figure>
          {this.props.project ? (
            <>
              <Progressbar completion={this.props.project.completion} />
              <BulletItem content="Location" bulletIcon="location" />
              <BulletItem content="Key terms" bulletIcon="discount" />
            </>
          ) : (
            <>
              <BulletItem
                content="10% contracted discount"
                bulletIcon="dollar"
              />
              <BulletItem
                content="Save 1 month of electric costs every year"
                bulletIcon="gift"
              />
              <BulletItem
                content="90% reduction in carbon emissions"
                bulletIcon="co2"
              />
            </>
          )}
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
          .content {
            margin-bottom: 2rem;
          }
          .disclaimer {
            text-align: center;
          }
          figure {
            max-width: 100vw;
            margin: 1.5rem -7%;
            border-radius: 4px;
            background-color: transparent;
          }
          img {
            max-width: 100%;
            min-height: 300px;
            opacity: 0;
            object-fit: cover;
            object-position: center;
            animation: fadeIn 1s ease-in-out forwards;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
            }
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
      utility: {
        project: {
          imageUrl: "",
          name: "",
          completion: ""
        },
        agreement: {
          terms: "",
          conditions: ""
        }
      }
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    global.analytics.page("Step 3");

    this.getData();
  }

  getData() {
    let utility = "";
    let state = "";

    if (localStorage.getItem("utility")) {
      utility = JSON.parse(localStorage.getItem("utility"));
    }

    if (localStorage.getItem("state")) {
      state = JSON.parse(localStorage.getItem("state"));
    }

    const rawParams = {
      state: state,
      utility: encodeURIComponent(utility.label)
    };

    const generatedParams = Object.entries(rawParams)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    axios(`${API}/v1/utilities?${generatedParams}`).then(response => {
      if (response.data.data) {
        const data = response.data.data[0];
        this.setState({
          utility: {
            agreement: {
              terms: data.agreement.termsLink,
              conditions: data.agreement.conditionsLink
            },
            project: {
              imageUrl: data.projects[0].imageUrl,
              name: data.projects[0].displayName,
              completion: data.projects[0].completion
            }
          }
        });
      }
    });
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          prefix="Great news!"
          title="We've got a project in your area."
          suffix={this.state.utility.project.name}
        >
          <EnhancedCustomForm
            agreement={this.state.utility.agreement}
            project={this.state.utility.project}
          />
        </SingleStep>
        <style jsx>{`
          main {
            display: block;
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
          :global(.checkbox__label) {
            margin-top: 0;
          }
        `}</style>
      </main>
    );
  }
}

export default Step3;
