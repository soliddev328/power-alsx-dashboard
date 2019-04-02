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
      postalCode: ""
    };
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
              localStorage.setItem(
                "utility",
                JSON.stringify(values.currentUtility)
              );

              Router.push({
                pathname: "/onboarding/searching"
              });
            }}
            render={props => {
              return (
                <React.Fragment>
                  <Form>
                    <CustomSelect
                      zipCode={this.state.postalCode}
                      value={props.values.currentUtility}
                      onChange={props.setFieldValue}
                      onBlur={props.setFieldTouched}
                      error={props.errors.topics}
                      touched={props.touched.topics}
                      fieldname="currentUtility"
                    />
                    <Button
                      primary
                      disabled={!props.values.currentUtility != ""}
                    >
                      Check For Savings
                    </Button>
                  </Form>
                </React.Fragment>
              );
            }}
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
