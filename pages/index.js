import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import Header from "../components/Header";
import Input from "../components/Input";
import SingleStep from "../components/SingleStep";
import Button from "../components/Button";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    global.analytics.track("Sign-Up Initiated", {});
    if (this.props && this.props.query.partner) {
      localStorage.setItem("Partner", this.props.query.partner);
    }
    if (this.props && this.props.query.advocate) {
      localStorage.setItem("Referrer", this.props.query.advocate);
    }
    if (this.props && this.props.query.rep) {
      localStorage.setItem("SalesRep", this.props.query.rep);
    }
  }

  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep title="Hi! I'm Scott. Let's see if we can save you money with lower cost clean electricity!">
          <Formik
            initialValues={{
              firstName: "",
              lastName: ""
            }}
            onSubmit={values => {
              localStorage.setItem("username", JSON.stringify(values));
              Router.push({
                pathname: "/onboarding/step2"
              });
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <div className="two-columns two-columns--responsive">
                    <Input label="First Name" fieldname="firstName" autoFocus />
                    <Input label="Last Name" fieldname="lastName" />
                  </div>
                  <Button
                    primary
                    disabled={
                      !props.values.firstName != "" ||
                      !props.values.lastName != ""
                    }
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

export default Index;
