import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import Header from "../../components/Header";
import Text from "../../components/Text";

import Dropdown from "../../components/Dropdown";
import Checkbox from "../../components/Checkbox";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function StepLMI() {
  const router = useRouter();
  const [annualIncome, setAnnualIncome] = useState();

  useEffect(() => {
    global.analytics.page("Step LMI");
  }, []);

  useEffect(() => {
    const options = [
      { value: "", label: "Chocolate" },
      { value: "", label: "Strawberry" },
      { value: "", label: "Vanilla" }
    ];
  }, []);

  return (
    <main>
      <Header />
      <SingleStep title="Great! Let's see if you qualify for a 25% discount under MD's low and moderate income program (if you don't tou still save 10%)">
        <Formik
          initialValues={{
            householdMembers: 0,
            annualIncome: 0
          }}
          onSubmit={values => {
            // authenticate(values);
          }}
        >
          {props => (
            <Form>
              <div className="dropdown">
                <p>How many members of your household?</p>
                <Dropdown
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                    { value: "5", label: "5" },
                    { value: "6", label: "6" },
                    { value: "7", label: "7" },
                    { value: "8", label: "8" }
                  ]}
                  value={props.householdMembers}
                  onChange={props.setFieldValue}
                  onBlur={props.setFieldTouched}
                  touched={props.touched}
                  fieldname="householdMembers"
                ></Dropdown>
              </div>
              <div className="dropdown">
                <p>What is the annual income of your household?</p>
                <Dropdown
                  options={annualIncome}
                  value={props.annualIncome}
                  onChange={props.setFieldValue}
                  onBlur={props.setFieldTouched}
                  touched={props.touched}
                  disabled={!props.values.householdMembers}
                  fieldname="annualIncome"
                ></Dropdown>
              </div>
              <Checkbox fieldname="attestInformation">
                <p className="checkbox__label">
                  I attest that the above information is accurate. I understand
                  that this information will be used to determine my eligibility
                  as a low or moderate income household.
                </p>
              </Checkbox>
              <Button
                primary
                disabled={
                  !props.values.householdMembers != "" ||
                  !props.values.attestInformation != ""
                }
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

        .dropdown {
          display: grid;
          grid-template-columns: 3fr 1fr;
          align-items: center;
          margin: 20px 0;
        }

        .dropdown p {
          margin: 0;
        }
      `}</style>
    </main>
  );
}

export default StepLMI;
