import { useEffect, useState } from "react";
import axios from "axios";
import Main from "../../components/Main";
import Section from "../../components/Section";
import Panel from "../../components/Panel";
import Image from "../../components/Image";
import Text from "../../components/Text";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

export default function MySource({ image = true }) {
  const [userData, setUserdata] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        global.analytics.page("My Source");
        let storedContactId = {};

        if (localStorage.getItem("contactId")) {
          storedContactId = localStorage.getItem("contactId");
        }

        user.getIdToken(true).then(idToken => {
          axios
            .get(`${API}/v1/subscribers/accounts/${storedContactId}/billings`, {
              headers: {
                Authorization: idToken
              }
            })
            .then(response => {
              setUserdata(response.data.data);
              console.log(response);
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
    <Main>
      <Text h2 hasDecoration>
        My Source
      </Text>
      <Section>
        {image ? (
          <Image hasBorder src="/static/images/illustrations/t&c.png" alt="" />
        ) : (
          <Panel>
            <Text>test</Text>
          </Panel>
        )}
      </Section>
      <Section>
        <Panel>
          <Text h3>Project Summary</Text>
          <Text>Project Address: XYZ Country</Text>
          <Text>Project Size: 2.7MW DC</Text>
          <Text>Annual generation: 3,300,200 kWh</Text>
          <Text>Annual avoided CO2: 4.1M pounds</Text>
          <Text>Equivalent trees planted: 23</Text>
        </Panel>
      </Section>
    </Main>
  );
}
