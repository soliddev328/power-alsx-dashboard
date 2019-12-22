import { useEffect, useState } from "react";
import qs from "query-string";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { withFirebase } from "../firebase";
import Header from "../components/Header";
import SingleStep from "../components/SingleStep";
import Input from "../components/Input";
import Button from "../components/Button";

function ResetPassword(props) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const parsedURL = qs.parse(window.location.search);
    setCode(parsedURL.oobCode);
  }, []);

  const saveNewPassword = values => {
    props.firebase
      .doConfirmPasswordReset(code, values.password)
      .then(() => {
        router.push({
          pathname: "/"
        });
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const renderForm = () => {
    return (
      <Formik
        initialValues={{
          password: "",
          passwordConfirmation: ""
        }}
        onSubmit={values => {
          saveNewPassword(values);
        }}
      >
        {props => (
          <>
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
          </>
        )}
      </Formik>
    );
  };

  return (
    <main>
      <Header first />
      <SingleStep prefix="Please enter your new password">
        {renderForm()}
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

export default withFirebase(ResetPassword);
