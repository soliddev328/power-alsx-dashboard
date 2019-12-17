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
    const { name, leadId, errorMessage } = this.state;
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
              localStorage.setItem("phoneNumber", values.phoneNumber);

              //if (address.postalCode === postalCode) {

              Router.push({
                pathname: "/onboarding/step5"
              });
              // } else {
              //   this.setState({
              //     errorMessage:
              //       "Address has different zip code than the one initially provided."
              //   })
              // }
            }}
          >
            {props => (
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
