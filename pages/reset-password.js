import React from "react";
import qs from "query-string";
import { Formik, Form } from "formik";
import Router from "next/router";
import Header from "../components/Header";
import SingleStep from "../components/SingleStep";
import Input from "../components/Input";
import Button from "../components/Button";

export default class forgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      error: ""
    };
  }

  componentDidMount() {
    const parsedURL = qs.parse(window.location.search);
    this.setState({ code: parsedURL.oobCode });
  }

  saveNewPassword(values) {
    const auth = window.firebase.auth();
    const { code } = this.state;

    auth
      .confirmPasswordReset(code, values.password)
      .then(() => {
        Router.push({
          pathname: "/"
        });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  renderForm() {
    const { error } = this.state

    return (
      <Formik
        initialValues={{
          password: "",
          passwordConfirmation: ""
        }}
        onSubmit={values => {
          this.saveNewPassword(values);
        }}
        render={props => (
          <React.Fragment>
            <Form>
              <Input
                type="password"
                label="New Password"
                fieldname="password"
                required
              />
              <Input
                type="password"
                label="Confirm New Password"
                fieldname="passwordConfirmation"
                required
              />
              <p className="error">{error}</p>
              <Button
                primary
                disabled={
                  !!props.values.password !== true ||
                  !!props.values.passwordConfirmation !== true ||
                  props.values.passwordConfirmation !== props.values.password
                }
              >
                Back to Log in
              </Button>
            </Form>
            <style jsx>{`
              .error {
                height: 45px;
                padding: 0 90px;
                color: red;
                text-align: center;
              }
            `}</style>
          </React.Fragment>
        )}
      />
    );
  }

  render() {
    return (
      <main>
        <Header first />
        <SingleStep prefix="Please enter your new password">
          {this.renderForm()}
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
