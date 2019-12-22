import { useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import Header from "../../components/Header";
import RadioCard from "../../components/RadioCard";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";

function Step3() {
  const router = useRouter();
  useEffect(() => {
    global.analytics.page("Step 3");
  }, []);

  return (
    <main>
      <Header />
      <SingleStep title="Do you have an online account with your electric utility?">
        <Formik
          initialValues={{ isPaperOnly: "" }}
          onSubmit={values => {
            localStorage.setItem(
              "billingMethod",
              JSON.stringify(values.isPaperOnly)
            );
            router.push({
              pathname: "/onboarding/step4"
            });
          }}
        >
          {props => (
            <>
              <Form>
                <RadioCard
                  number="1"
                  name="isPaperOnly"
                  value="electronic"
                  heading="Yes"
                />
                <RadioCard
                  number="2"
                  name="isPaperOnly"
                  value="paper"
                  heading="No"
                />
                <Button primary disabled={!props.values.isPaperOnly != ""}>
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
      `}</style>
    </main>
  );
}

export default Step3;
