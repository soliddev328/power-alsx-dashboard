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

  const renderForm = () => {
    return (
      <Formik
        initialValues={{
          emailAddress: ""
        }}
        onSubmit={values => {
          if (!values.email) {
            setError("Required");
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            setError("Invalid email address");
          }

          props.firebase.doSendPasswordResetEmail(values.emailAddress, () => {
            setEmailSent(true);
          });
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

  const renderContent = () => {
    return emailSent ? null : renderForm();
  };

  return (
    <main>
      <Header first firstStep />
      <SingleStep
        isFirst
        prefix={
          emailSent
            ? "Thanks! please check your email in order to restore your account."
            : "Please enter your email address"
        }
      >
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
