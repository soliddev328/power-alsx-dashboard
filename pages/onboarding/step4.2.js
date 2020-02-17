import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import { withFirebase } from "../../firebase";
import GeoSuggest from "../../components/GeoSuggest";
import Phoneinput from "../../components/Phoneinput";
import Input from "../../components/Input";
import Header from "../../components/Header";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function Step42(props) {
  const router = useRouter();
  const [postalCode, setPostalCode] = useState("");
  const [name, setName] = useState("user");
  const [leadId, setLeadId] = useState("user");
  const [error, setError] = useState("");

  useEffect(() => {
    global.analytics.page("Step 4.2");
    let storedPostalCode = "";
    let storedName = "";
    let storedLeadId = "";
    if (localStorage.getItem("postalCode")) {
      storedPostalCode = JSON.parse(localStorage.getItem("postalCode"));
    }
    if (localStorage.getItem("username")) {
      storedName = JSON.parse(localStorage.getItem("username"));
    }
    if (localStorage.getItem("leadId")) {
      storedLeadId = localStorage.getItem("leadId");
    }
    setLeadId(storedLeadId);
    setPostalCode(storedPostalCode);
    setName(storedName.firstName);
  }, []);

  const getPostalCode = values => {
    const components = values.address
      ? values.address.gmaps.address_components
      : null;

    const postalCode = components
      ? components.find(x => x.types[0] == "postal_code")
      : null;

    return postalCode ? postalCode.long_name : "";
  };

  const getStateAddress = values => {
    const components = values.address
      ? values.address.gmaps.address_components
      : null;
    const state = components
      ? components.find(x => x.types[0] == "administrative_area_level_1")
      : null;

    return state?.short_name | "";
  };

  const capitalize = word => {
    return word && word[0].toUpperCase() + word.slice(1);
  };

  const submit = values => {
    const phoneNumber = values.phoneNumber || "";
    const arrayAddress = values.address.description.split(",");
    const street = arrayAddress[0] || "";
    const city = arrayAddress[1] ? arrayAddress[1].replace(/\s/g, "") : "";

    const address = {
      street: street,
      city: city,
      state: getStateAddress(values),
      postalCode: postalCode || getPostalCode(values),
      apt: values?.apt || ""
    };

    localStorage.setItem("address", JSON.stringify(address));
    localStorage.setItem("phoneNumber", phoneNumber);

    //if (address.postalCode === postalCode) {
    props.firebase
      .doGetCurrentUserIdToken(idToken => {
        axios.put(
          `${API}/v1/subscribers`,
          {
            leadId: leadId,
            street: address.street,
            city: address.city,
            apt: address.apt,
            phone: values.phoneNumber
          },
          {
            headers: {
              Authorization: idToken
            }
          }
        );
      })
      .then(() => {
        if (props.firebase.auth.currentUser.isAnonymous) {
          router.push({
            pathname: "/onboarding/step5",
            query: {
              next: true
            }
          });
        } else {
          router.push({
            pathname: "/onboarding/step6",
            query: {
              next: true
            }
          });
        }
      });
    // } else {
    //   setError("Address has different zip code than the one initially provided.")
    // }
  };

  return (
    <main>
      <Header />
      <SingleStep
        title={`Thanks ${capitalize(
          name
        )}! What is your address and phone number please?`}
      >
        <Formik
          initialValues={{
            address: "",
            phoneNumber: "",
            apt: ""
          }}
          onSubmit={submit}
        >
          {props => (
            <Form>
              <GeoSuggest
                label="Address"
                fieldname="address"
                value={props.values.address}
                onChange={props.setFieldValue}
                onBlur={props.setFieldTouched}
              />
              <Input label="Apartment No." fieldname="apt" />
              <Phoneinput
                value={props.values.phoneNumber}
                onChangeEvent={props.setFieldValue}
                onBlurEvent={props.setFieldTouched}
                label="Phone"
                fieldname="phoneNumber"
              />
              <p className="error">{error}</p>
              <Button
                primary
                disabled={
                  !props.values.address != "" || !props.values.phoneNumber != ""
                }
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
        .error {
          height: 45px;
          color: red;
          text-align: center;
        }
      `}</style>
    </main>
  );
}

export default withFirebase(Step42);
