import { useState } from "react";
import SingleStep from "../components/SingleStep";
import Header from "../components/Header";
import { Formik, Form } from "formik";
import Input from "../components/Input";
import Button from "../components/Button";
import { withFirebase } from "../firebase";

function ForgotPassword(props) {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState();

  const sendEmail = values => {
    props.firebase
      .doSendPasswordResetEmail(values.emailAddress)
      .then(() => {
        setEmailSent(true);
      })
      .catch(error => {
        setEmailSent(false);
        setError(error.message);
      });
  };

  const renderForm = () => {
    return (
      <Formik
        initialValues={{
          emailAddress: ""
        }}
        onSubmit={values => {
          sendEmail(values);
        }}
      >
        {props => (
          <>
            <Form>
              <Input
                label="Email"
                fieldname="emailAddress"
                type="email"
                required
                autoFocus
              />
              <p className="error">{error}</p>
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
          </>
        )}
      </Formik>
    );
  };

  const renderThanks = () => {
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
  };

  const renderContent = () => {
    return emailSent ? renderThanks() : renderForm();
  };

  return (
    <main>
      <Header first />
      <SingleStep isFirst prefix="Please enter your email address">
        {renderContent()}
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

export default withFirebase(ForgotPassword);
