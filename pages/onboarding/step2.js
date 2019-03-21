import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import GeoSuggest from "../../components/GeoSuggest";
import Header from "../../components/Header";
import Input from "../../components/Input";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    global.analytics.page("Step 2");
    let storedName = "";

    if (window.localStorage.getItem("username")) {
      storedName = JSON.parse(window.localStorage.getItem("username"));
    }

    this.setState({ name: storedName });
  }

  capitalize(word) {
    return word && word[0].toUpperCase() + word.slice(1);
  }

  getPostalCode(values) {
    const components = values.address
      ? values.address.gmaps.address_components
      : null;

    const postalCode = components
      ? components.find(x => x.types[0] === "postal_code")
      : null;

    return postalCode ? postalCode.long_name : "";
  }

  getStateAddress(values) {
    const components = values.address
      ? values.address.gmaps.address_components
      : null;
    const state = components
      ? components.find(x => x.types[0] === "administrative_area_level_1")
      : null;

    return state ? state.short_name : "";
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          title={`Nice to meet you ${this.capitalize(
            this.state.name.firstName
          )}. What is your home address?`}
        >
          <Formik
            initialValues={{
              address: "",
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

              window.localStorage.setItem("address", JSON.stringify(address));

              axios
                .get(`${API}/v1/zipcodes/${address.postalCode}`)
                .then(response => {
                  if (
                    response.data.data.geostatus !== "Live" &&
                    response.data.data.geostatus !== "Near-Term"
                  ) {
                    Router.push({
                      pathname: "/onboarding/sorry"
                    });
                  } else {
                    Router.push({
                      pathname: "/onboarding/step3"
                    });
                  }
                });
            }}
            render={props => (
              <React.Fragment>
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
                  <Button primary disabled={!!props.values.address !== true}>
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

export default Step2;
