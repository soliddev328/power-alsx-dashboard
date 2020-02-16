import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import Header from "../../components/Header";
import Text from "../../components/Text";

import Checkbox from "../../components/Checkbox";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function StepLMI() {
  const router = useRouter();

  useEffect(() => {
    global.analytics.page("Step LMI");
  }, []);

  return (
    <main>
      <Header />
      <SingleStep title="Great! Let's see if you qualify for a 25% discount under MD's low and moderate income program (if you don't tou still save 10%)">
        <Formik
          initialValues={{}}
          onSubmit={values => {
            // authenticate(values);
          }}
        >
          {props => (
            <Form>
              {/* <ZipCodeInput
                value={props.values.postalCode}
                onChangeEvent={props.setFieldValue}
                onBlurEvent={props.setFieldTouched}
                label="ZipCode"
                fieldname="postalCode"
              />
              <CustomSelect
                ref={selectRef}
                zipCode={props.values.postalCode}
                value={props.currentUtility}
                disabled={!props.values.postalCode}
                onChange={props.setFieldValue}
                onBlur={props.setFieldTouched}
                touched={props.touched}
                fieldname="currentUtility"
              /> */}
              <Checkbox fieldname="attestInformation">
                <p className="checkbox__label">
                  I attest that the above information is accurate. I understand
                  that this information will be used to determine my eligibility
                  as a low or moderate income household.
                </p>
              </Checkbox>
              <Button
                primary
                onClick={() => {
                  console.log("state is MD and LMI is true");
                }}
              >
                Next
              </Button>
            </Form>
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

export default StepLMI;
