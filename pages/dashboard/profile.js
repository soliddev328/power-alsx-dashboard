import { Formik } from "formik";
import { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import Main from "../../components/Main";
import Section from "../../components/Section";
import Panel from "../../components/Panel";
import Text from "../../components/Text";
import Input from "../../components/Input";
import Table from "../../components/Table";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const getPaymentMethods = accounts => {
  const allMethods = [];

  accounts.forEach(element => {
    const singleMethod = [];
    singleMethod.push(element.address.street);
    singleMethod.push("Testing Payment Method");
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

        user.getIdToken(true).then(idToken => {
          axios
            .get(`${API}/v1/subscribers/${user.uid}`, {
              headers: {
                Authorization: idToken
              }
            })
            .then(response => {
              setUserdata(response.data.data);
              setPaymentMethods(getPaymentMethods(response.data.data.accounts));
              setIsLoading(false);
            })
            .catch(error => {
              console.error(error);
            });
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
                outerLabel
                fullWidth
                label="Name"
                fieldname="name"
                value={userData.firstName}
              />
              <Input
                outerLabel
                fullWidth
                label="Last Name"
                fieldname="last-name"
                value={userData.lastName}
              />
            </Section>
            <Section columns="3">
              <Input
                outerLabel
                fullWidth
                label="Email"
                fieldname="email"
                value={userData.email}
              />
              <Input
                outerLabel
                fullWidth
                label="Primary Address"
                fieldname="primary-address"
                value={
                  userData.accounts ? userData.accounts[0].address.street : ""
                }
              />
              <Input
                outerLabel
                fullWidth
                label="Phone Number"
                fieldname="phone-number"
                value={userData.phone}
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
