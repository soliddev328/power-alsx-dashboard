import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import Header from "../../components/Header";
import Input from "../../components/Input";
import SSNInput from "../../components/SSNInput";
import { withFirebase } from "../../firebase";

import Dropdown from "../../components/Dropdown";
import Checkbox from "../../components/Checkbox";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function StepLMI(props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [leadId, setLeadId] = useState();

  useEffect(() => {
    global.analytics.page("Step LMI");

    let storedName = "";
    let storedLeadId = "";

    if (localStorage.getItem("username")) {
      storedName = JSON.parse(localStorage.getItem("username"));
    }
    if (localStorage.getItem("leadId")) {
      storedLeadId = localStorage.getItem("leadId");
    }
    setLeadId(storedLeadId);
    setName(`${storedName.firstName} ${storedName.lastName}`);
  }, []);

  const saveData = values => {
    // const spouseData = {};

    // if (values.householdMembers > 1) {
    //   spouseData.spouseFirstName = values.spouseFirstName;
    //   spouseData.spouseLastName = values.spouseLastName;
    //   spouseData.spouseSSN = values.spouseSSN;
    // } else {
    //   spouseData.spouseFirstName = "";
    //   spouseData.spouseLastName = "";
    //   spouseData.spouseSSN = "";
    // }

    props.firebase
      .doGetCurrentUserIdToken(idToken => {
        axios.put(
          `${API}/v1/subscribers`,
          {
            leadId: leadId,
            ssn: values.userSSN,
            spouseFirstName: values.spouseFirstName,
            spouseLastName: values.spouseLastName,
            spouseSSN: values.spouseSSN
          },
          {
            headers: {
              Authorization: idToken
            }
          }
        );
      })
      .then(() => {
        router.push({
          pathname: "/onboarding/step3",
          query: {
            next: true
          }
        });
      });
  };

  //TODO Add render step function to render only if met conditions

  return (
    <main>
      <Header />
      <SingleStep title="Great! Let's see if you qualify for a 25% discount under MD's low and moderate income program (if you don't tou still save 10%)">
        <div className="content">
          <Formik
            initialValues={{
              householdMembers: { value: 0, label: 0 },
              userName: name,
              userSSN: "",
              spouseFirstName: "",
              spouseLastName: "",
              spouseSSN: ""
            }}
            onSubmit={values => {
              saveData(values);
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
                <Input fieldname="userName" required value={name || ""} />
                <SSNInput
                  label="SSN"
                  fieldname="userSSN"
                  onChangeEvent={props.setFieldValue}
                  onBlurEvent={props.setFieldTouched}
                  required
                />

                <p>
                  If a joint return, enter spouse's info shown on tax return.
                </p>
                <Input
                  disabled={parseInt(props.values.householdMembers.value) < 2}
                  label="Spouse First Name"
                  fieldname="spouseFirstName"
                />
                <Input
                  disabled={parseInt(props.values.householdMembers.value) < 2}
                  label="Spouse Last Name"
                  fieldname="spouseLastName"
                />
                <SSNInput
                  disabled={parseInt(props.values.householdMembers.value) < 2}
                  label="Spouse SSN"
                  fieldname="spouseSSN"
                  onChangeEvent={props.setFieldValue}
                  onBlurEvent={props.setFieldTouched}
                />
                <Checkbox fieldname="attestInformation">
                  <p className="checkbox__label">
                    I authorize Common Energy to verify my income to see if I
                    qualify for the additional LMI discount.
                  </p>
                </Checkbox>
                {console.log(!props.values.userSSN.includes(" "))}
                <Button
                  primary
                  disabled={
                    !props.values.householdMembers != "" ||
                    !props.values.userName != "" ||
                    !props.values.userSSN != "" ||
                    props.values.userSSN.includes(" ")
                  }
                >
                  Next
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </SingleStep>
      <style jsx>{`
        main {
          display: block;
          height: 88vh;
          max-width: 700px;
          margin: 0 auto;
        }

        .content {
          max-width: 80%;
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

export default withFirebase(StepLMI);
