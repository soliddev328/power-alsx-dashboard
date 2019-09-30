import { useEffect, useState } from "react";
import axios from "axios";
import { useStateValue } from "../../state";
import Main from "../../components/Main";
import Section from "../../components/Section";
import Panel from "../../components/Panel";
import Image from "../../components/Image";
import Text from "../../components/Text";
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

const getProjectInfo = async (projectId, idToken) => {
  const response = await axios.get(`${API}/v1/projects/${projectId}`, {
    headers: {
      Authorization: idToken
    }
  });
  return response && response.data && response.data.data[0];
};

export default function MySource() {
  const [userData, setUserdata] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [projectInfo, setProjectInfo] = useState({});
  const [{ selectedAccount }, dispatch] = useStateValue();

  useEffect(() => {
    setIsLoading(true);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        global.analytics.page("My Source");
        user.getIdToken(true).then(async idToken => {
          const userInfo = await getUserData(user.uid, idToken);
          const projectData = await getProjectInfo(
            userInfo.accounts[selectedAccount.value].projectId,
            idToken
          );
          setUserdata(userInfo);
          setProjectInfo(projectData);
          setIsLoading(false);
        });
      } else {
        Router.push({
          pathname: "/"
        });
      }
    });
  }, [selectedAccount.value]);

  return (
    <Main isLoading={isLoading}>
      <Text h2 hasDecoration>
        My Source
      </Text>
      <Section>
        {projectInfo ? (
          <Image
            hasBorder
            src={
              projectInfo.imageUrl
                ? projectInfo.imageUrl
                : "/static/images/illustrations/t&c.png"
            }
            alt=""
          />
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
      <Section disabled={!projectInfo}>
        <Panel>
          <Text h3>Project Summary</Text>
          <Text>
            Project Address: {projectInfo ? `${projectInfo.name}` : ""}
          </Text>
          <Text>
            Project Size: {projectInfo ? `${projectInfo.sizeDC} MW DC` : ""}{" "}
          </Text>
          <Text>
            Annual generation:{" "}
            {projectInfo ? `${projectInfo.annualGeneration} kWh` : ""}{" "}
          </Text>
          <Text>
            Annual avoided CO2:{" "}
            {projectInfo ? `${projectInfo.annualAvoidedC02} pounds` : ""}{" "}
          </Text>
          <Text>
            Equivalent trees planted:{" "}
            {projectInfo ? `${projectInfo.annualTreesPlanted} ` : ""}
          </Text>
        </Panel>
      </Section>
    </Main>
  );
}
