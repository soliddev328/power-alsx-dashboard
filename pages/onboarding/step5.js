import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { withFirebase } from "../../firebase";
import Header from "../../components/Header";
import Input from "../../components/Input";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function Step5(props) {
  const router = useRouter();
  const [email, setEmail] = useState();

  useEffect(() => {
    global.analytics.page("Step 5");
    let storedEmailAddress = "";

    if (localStorage.getItem("email")) {
      storedEmailAddress = localStorage.getItem("email");
    }

    setEmail(storedEmailAddress);
  }, []);

  const submit = values => {
    props.firebase.doEmailAuthProvider(email, values.password, () => {
      router.push({
        pathname: "/onboarding/step6",
        query: {
          next: true
        }
      });
    });
  };

  return (
    <main>
      <Header />
      <SingleStep title="Please create a password for your account with us, so you can view your past bills, total emissions you've prevented, and your total savings">
        <Formik
          initialValues={{
            password: ""
          }}
          onSubmit={values => {
            submit(values);
          }}
        >
          {props => (
            <>
              <Form>
                <Input
                  type="password"
                  label="Create a Password"
                  fieldname="password"
                  required
                />
                <p className="password-explanation">
                  * This password will let you log back in later
                </p>
                <Button primary disabled={!!props.values.password !== true}>
                  Next
                </Button>
              </Form>
            </>
          )}
        </Formik>
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
        .password-explanation {
          max-width: 350px;
          margin: 0 auto;
          font-size: 12px;
        }
      `}</style>
    </main>
  );
}

export default withFirebase(Step5);
