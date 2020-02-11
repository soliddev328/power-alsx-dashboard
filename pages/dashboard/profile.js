import { Formik } from "formik";
import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import axios from "axios";
import Main from "../../components/Main";
import Section from "../../components/Section";
import Text from "../../components/Text";
import Phoneinput from "../../components/Phoneinput";
import Input from "../../components/Input";
import Table from "../../components/Table";
import CONSTANTS from "../../globals";
import { useStateValue } from "../../state";
import { withFirebase } from "../../firebase";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const getUserData = async (userUid, idToken) => {
  const response = await axios.get(`${API}/v1/subscribers/${userUid}`, {
    headers: {
      Authorization: idToken
    }
  });
  return response?.data?.data;
};

const getPaymentMethods = accounts => {
  const allMethods = [];

  if (accounts.length > 0) {
    accounts.forEach(element => {
      const singleMethod = [];
      singleMethod.push(element?.address?.street);
      element.hasACH
        ? singleMethod.push("ACH")
        : singleMethod.push("Credit Card");
      allMethods.push(singleMethod);
    });
  }

  return allMethods;
};

function Profile(props) {
  const [userData, setUserdata] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [{ selectedAccount }, dispatch] = useStateValue();

  useEffect(() => {
    props.firebase.doUpdateUser(async (user, idToken) => {
      global.analytics.page("Profile");
      const userInfo = await getUserData(user.uid, idToken);
      if (userInfo) {
        setUserdata(userInfo);
        setPaymentMethods(getPaymentMethods(userInfo.accounts || []));
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <Main isLoading={isLoading}>
      <Head>
        <title>Common Energy - Profile</title>
      </Head>
      <Text h2 hasDecoration>
        Profile
      </Text>
      <Formik initialValues={{}} onSubmit={values => {}}>
        {props => (
          <>
            <Section columns="2">
              <Input
                readOnly
                outerLabel
                fullWidth
                label="Name"
                fieldname="name"
                value={userData?.firstName}
              />
              <Input
                readOnly
                outerLabel
                fullWidth
                label="Last Name"
                fieldname="last-name"
                value={userData?.lastName}
              />
            </Section>
            <Section columns="3">
              <Input
                readOnly
                outerLabel
                fullWidth
                label="Email"
                fieldname="email"
                value={userData?.email}
              />
              <Input
                readOnly
                outerLabel
                fullWidth
                label="Primary Address"
                fieldname="primary-address"
                value={
                  userData?.accounts[selectedAccount.value]?.address?.street
                }
              />
              <Phoneinput
                readOnly
                outerLabel
                fullWidth
                value={userData?.phone || ""}
                onChangeEvent={props.setFieldValue}
                onBlurEvent={props.setFieldTouched}
                label="Phone Number"
                fieldname="phone-number"
              />
            </Section>
            <Section columns="3">
              <Input
                readOnly
                outerLabel
                fullWidth
                label="City"
                fieldname="city"
                value={userData?.accounts[selectedAccount.value]?.address?.city}
              />
              <Input
                readOnly
                outerLabel
                fullWidth
                label="State"
                fieldname="state"
                value={
                  userData?.accounts[selectedAccount.value]?.address?.state
                }
              />
              <Input
                readOnly
                outerLabel
                fullWidth
                label="Zip"
                fieldname="zipcode"
                value={
                  userData?.accounts[selectedAccount.value]?.address?.postalCode
                }
              />
            </Section>
            <Section>
              <Table
                headers={["Account Address", "Payment Method"]}
                data={paymentMethods}
              />
            </Section>
          </>
        )}
      </Formik>
    </Main>
  );
}

export default withFirebase(Profile);
