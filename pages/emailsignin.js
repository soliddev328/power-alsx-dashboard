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
    setEmail(window.localStorage.getItem("emailAddress"));
  }, []);

  const actionCodeSettings = {
    url: "https://my.commonenergy.us/emailsignin",
    handleCodeInApp: true,
    dynamicLinkDomain: "example.page.link" // TODO ADD PROPER LINK
  };

  const sendSecureLoginLink = values => {
    const { email } = values;

    props.firebase
      .doSendSignInEmail(email, actionCodeSettings)
      .then(() => {
        setEmailSent(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <main>
      <Header first />
      <SingleStep
        prefix={
          emailSent
            ? "An secure login link has been sent, check your inbox"
            : "Enter the email that you used when you signed up for Common Energy and we will send you an email with a secure login link."
        }
      >
        {!emailSent && email && (
          <Formik
            initialValues={{
              email: email
            }}
            onSubmit={values => {
              sendSecureLoginLink(values);
            }}
          >
            {props => (
              <Form>
                <Input type="email" label="Email address" fieldname="email" />
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
