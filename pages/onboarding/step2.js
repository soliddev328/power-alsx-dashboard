import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import Header from "../../components/Header";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CustomSelect from "../../components/CustomSelect";

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      postalCode: "",
      currentUtility: "",
      error: ""
    };

    this.select = React.createRef();
  }

  componentDidMount() {
    global.analytics.page("Step 2");

    let storedAddress = "";
    let storedPostalCode = "";

    if (localStorage.getItem("address")) {
      storedAddress = JSON.parse(localStorage.getItem("address"));
    }

    if (localStorage.getItem("postalCode")) {
      storedPostalCode = JSON.parse(localStorage.getItem("postalCode"));
    }

    this.setState({ address: storedAddress, postalCode: storedPostalCode });
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep title="And who provides your electric service today?">
          <Formik
            initialValues={{
              currentUtility: ""
            }}
            onSubmit={values => {
              if (values.currentUtility !== "") {
                localStorage.setItem(
                  "utility",
                  JSON.stringify(values.currentUtility)
                );

                Router.push({
                  pathname: "/onboarding/searching"
                });
              } else if (this.select.current.state.singleOption) {
                localStorage.setItem(
                  "utility",
                  JSON.stringify(this.select.current.state.options[0])
                );

                Router.push({
                  pathname: "/onboarding/searching"
                });
              } else {
                this.setState({ error: "Please select your provider" });
              }
            }}
            render={props => {
              return (
                <React.Fragment>
                  <Form>
                    <CustomSelect
                      ref={this.select}
                      zipCode={this.state.postalCode}
                      value={props.currentUtility}
                      onChange={props.setFieldValue}
                      onBlur={props.setFieldTouched}
                      error={props.errors}
                      touched={props.touched}
                      fieldname="currentUtility"
                    />
                    <p className="error">{this.state.error}</p>
                    <Button primary>Check For Savings</Button>
                  </Form>
                </React.Fragment>
              );
            }}
          />
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
        `}</style>
      </main>
    );
  }
}

export default Step2;
