import { Formik } from "formik";
import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import axios from "axios";
import Main from "../../components/Main";
import Section from "../../components/Section";
import Panel from "../../components/Panel";
import Text from "../../components/Text";
import Phoneinput from "../../components/Phoneinput";
import Input from "../../components/Input";
import Table from "../../components/Table";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const getUserData = async (userUid, idToken) => {
  const response = await axios.get(`${API}/v1/subscribers/${userUid}`, {
    headers: {
      Authorization: idToken
    }
  });
  return response && response.data && response.data.data;
};

const getPaymentMethods = accounts => {
  const allMethods = [];
  accounts.forEach(element => {
    const singleMethod = [];
    singleMethod.push(element.address.street);
    element.hasACH
      ? singleMethod.push("ACH")
      : singleMethod.push("Credit Card");
    allMethods.push(singleMethod);
  });

  return allMethods;
};

export default function Profile() {
  const [userData, setUserdata] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        global.analytics.page("Profile");
        user.getIdToken(true).then(async idToken => {
          const userInfo = await getUserData(user.uid, idToken);
          setUserdata(userInfo);
          setPaymentMethods(getPaymentMethods(userInfo.accounts));
          setIsLoading(false);
        });
      } else {
        Router.push({
          pathname: "/"
        });
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
      <Formik
        initialValues={{}}
        onSubmit={values => {}}
        render={props => (
          <>
            <Section columns="2">
              <Input
                readOnly
                outerLabel
                fullWidth
                label="Name"
                fieldname="name"
                value={userData && userData.firstName}
              />
              <Input
                readOnly
                outerLabel
                fullWidth
                label="Last Name"
                fieldname="last-name"
                value={userData && userData.lastName}
              />
            </Section>
            <Section columns="3">
              <Input
                readOnly
                outerLabel
                fullWidth
                label="Email"
                fieldname="email"
                value={userData && userData.email}
              />
              <Input
                readOnly
                outerLabel
                fullWidth
                label="Primary Address"
                fieldname="primary-address"
                value={
                  userData && userData.accounts
                    ? userData.accounts[0].address.street
                    : ""
                }
              />
              <Phoneinput
                readOnly
                outerLabel
                fullWidth
                value={(userData && userData.phone) || ""}
                onChangeEvent={props.setFieldValue}
                onBlurEvent={props.setFieldTouched}
                label="Phone Number"
                fieldname="phone-number"
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
      />
    </Main>
  );
}
