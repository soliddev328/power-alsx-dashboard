import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { withFirebase } from "../firebase";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import SingleStep from "../components/SingleStep";

function EmailLogin(props) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  const actionCodeSettings = {
    url: "https://my.commonenergy.us/emailsignin",
    handleCodeInApp: true
  };

  const sendSecureLoginLink = values => {
    const { email } = values;
    props.firebase
      .doSendSignInEmail(email, actionCodeSettings)
      .then(() => {
        setEmailSent(true);
        localStorage.setItem("email", email);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <main>
      <Header first />
      <SingleStep
        isFirst
        prefix={
          emailSent
            ? "A secure login link has been sent, check your inbox"
            : "Enter the email that you used when you signed up for Common Energy and we will send you an email with a secure login link."
        }
      >
        {!emailSent && (
          <Formik
            defaultValues={{
              email: email
            }}
            initialValues={{
              email: email
            }}
            onSubmit={values => {
              sendSecureLoginLink(values);
            }}
          >
            {props => (
              <Form>
                <Input
                  type="email"
                  label={props.values.email ? false : "Email address"}
                  fieldname="email"
                  value={props.values.email}
                />
                <Button primary disabled={!!props.values.email !== true}>
                  Send secure login link
                </Button>
              </Form>
            )}
          </Formik>
        )}
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

export default withFirebase(EmailLogin);
