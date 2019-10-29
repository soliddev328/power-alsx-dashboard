import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import GeoSuggest from "../../components/GeoSuggest";
import Phoneinput from "../../components/Phoneinput";
import Input from "../../components/Input";
import Header from "../../components/Header";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import Stepper from "../../components/Stepper";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

class Step42 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "user",
      postalCode: "",
      errorMessage: ""
    };
  }

  componentDidMount() {
    global.analytics.page("Step 4.2");
    let storedPostalCode = "";
    let storedLeadId = "";
    let storedName = "";

    if (localStorage.getItem("postalCode")) {
      storedPostalCode = JSON.parse(localStorage.getItem("postalCode"));
    }
    if (localStorage.getItem("leadId")) {
      storedLeadId = localStorage.getItem("leadId");
    }
    if (localStorage.getItem("username")) {
      storedName = JSON.parse(localStorage.getItem("username"));
    }

    this.setState({
      postalCode: storedPostalCode,
      leadId: storedLeadId,
      name: storedName.firstName
    });
  }

  getPostalCode(values) {
    const components = values.address
      ? values.address.gmaps.address_components
      : null;

    const postalCode = components
      ? components.find(x => x.types[0] == "postal_code")
      : null;

    return postalCode ? postalCode.long_name : "";
  }

  getStateAddress(values) {
    const components = values.address
      ? values.address.gmaps.address_components
      : null;
    const state = components
      ? components.find(x => x.types[0] == "administrative_area_level_1")
      : null;

    return state ? state.short_name : "";
  }

  capitalize(word) {
    return word && word[0].toUpperCase() + word.slice(1);
  }

  render() {
    const { name, leadId, postalCode, errorMessage } = this.state;
    return (
      <main>
        <Header />
        <SingleStep
          title={`Thanks ${this.capitalize(
            name
          )}! What is your address and phone number please?`}
        >
          <Formik
            initialValues={{
              address: "",
              phoneNumber: "",
              apt: ""
            }}
            onSubmit={values => {
              const arrayAddress = values.address.description.split(",");
              const street = arrayAddress[0] ? arrayAddress[0] : "";
              const city = arrayAddress[1]
                ? arrayAddress[1].replace(/\s/g, "")
                : "";

              const address = {
                street: street,
                city: city,
                state: this.getStateAddress(values),
                postalCode: this.getPostalCode(values),
                apt: values.apt ? values.apt : ""
              };

              localStorage.setItem("address", JSON.stringify(address));

              //if (address.postalCode === postalCode) {
              window.firebase
                .auth()
                .currentUser.getIdToken(true)
                .then(idToken => {
                  axios
                    .put(
                      `${API}/v1/subscribers`,
                      {
                        leadId: leadId,
                        street: address.street,
                        state: address.state,
                        city: address.city,
                        apt: address.apt,
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
                    .catch(() => {});
                });
              // } else {
              //   this.setState({
              //     errorMessage:
              //       "Address has different zip code than the one initially provided."
              //   })
              // }
            }}
            render={props => (
              <Form>
                <GeoSuggest
                  label="Address"
                  fieldname="address"
                  value={props.values.address}
                  onChange={props.setFieldValue}
                  onBlur={props.setFieldTouched}
                  error={props.errors.topics}
                  touched={props.touched.topics}
                />
                <Input label="Apartment No." fieldname="apt" />
                <Phoneinput
                  value={props.values.phoneNumber}
                  onChangeEvent={props.setFieldValue}
                  onBlurEvent={props.setFieldTouched}
                  label="Phone"
                  fieldname="phoneNumber"
                />
                <p className="error">{errorMessage}</p>
                <Button primary disabled={!props.values.address != ""}>
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
          </Stepper>
        </SingleStep>
        <style jsx>{`
          main {
            display: block;
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
          .error {
            height: 45px;
            color: red;
            text-align: center;
          }
        `}</style>
      </main>
    );
  }
}

export default Step42;
