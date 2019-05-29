import React from "react";
import SingleStep from "../components/SingleStep";
import Header from "../components/Header";
import { Formik, Form } from "formik";
import Input from "../components/Input";
import Button from "../components/Button";

export default class forgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailSent: false,
      error: null
    };
  }

  sendEmail(values) {
    const auth = window.firebase.auth();

    auth
      .sendPasswordResetEmail(values.emailAddress)
      .then(() => {
        this.setState({ emailSent: true });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  renderForm() {
    return (
      <Formik
        initialValues={{
          emailAddress: ""
        }}
        onSubmit={values => {
          this.sendEmail(values);
        }}
        render={props => (
          <React.Fragment>
            <Form>
              <Input
                label="Email"
                fieldname="emailAddress"
                type="email"
                required
                autoFocus
              />
              <p className="error">{this.state.error}</p>
              <Button primary disabled={!!props.values.emailAddress !== true}>
                Send reset password email
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

  renderThanks() {
    return (
      <p>
        Thanks! please check your email in order to restore your account.
        <style jsx>{`
          p {
            text-align: center;
          }
        `}</style>
      </p>
    );
  }

  renderContent() {
    const { emailSent } = this.state;
    return emailSent ? this.renderThanks() : this.renderForm();
  }

  render() {
    return (
      <main>
        <Header first />
        <SingleStep prefix="Please enter your email address">
          {this.renderContent()}
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
