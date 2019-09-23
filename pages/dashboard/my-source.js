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

export default function MySource() {
  const [userData, setUserdata] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [projectInfoIsAvailable, setProjectInfoIsAvailable] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        global.analytics.page("My Source");

        user.getIdToken(true).then(idToken => {
          axios
            .get(`${API}/v1/subscribers/${user.uid}`, {
              headers: {
                Authorization: idToken
              }
            })
            .then(response => {
              setUserdata(response.data.data);
              setIsLoading(false);
              // setProjectInfoIsAvailable(
              //   !!response.data.data.accounts[0].project
              // );
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
        My Source
      </Text>
      <Section>
        {userData.image ? (
          <Image hasBorder src="/static/images/illustrations/t&c.png" alt="" />
        ) : (
          <Panel>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 15 14"
              style={{
                display: "inline-flex",
                width: "18px",
                marginRight: "10px",
                marginBottom: "-2px"
              }}
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="#F63251"
                strokeWidth="1.5"
                transform="translate(-2 -2)"
              >
                <path d="M4.662 13.406L13.8 4.268M4.662 4.594l8.811 8.812" />
                <circle
                  cx="9.068"
                  cy="9"
                  r="6.231"
                  transform="rotate(-45 9.068 9)"
                />
              </g>
            </svg>
            <Text
              style={{
                display: "inline-flex",
                margin: "0"
              }}
            >
              No Project ready
            </Text>
          </Panel>
        )}
      </Section>
      <Section disabled={!projectInfoIsAvailable}>
        <Panel>
          <Text h3>Project Summary</Text>
          <Text>Project Address: {projectInfoIsAvailable ? `` : ""}</Text>
          <Text>
            Project Size:{" "}
            {projectInfoIsAvailable
              ? `${userData.accounts[0].project} MW DC`
              : ""}{" "}
          </Text>
          <Text>
            Annual generation:{" "}
            {projectInfoIsAvailable
              ? `${userData.accounts[0].project} kWh`
              : ""}{" "}
          </Text>
          <Text>
            Annual avoided CO2:{" "}
            {projectInfoIsAvailable
              ? `${userData.accounts[0].project} pounds`
              : ""}{" "}
          </Text>
          <Text>
            Equivalent trees planted:{" "}
            {projectInfoIsAvailable ? `${userData.accounts[0].project} ` : ""}
          </Text>
        </Panel>
      </Section>
    </Main>
  );
}
