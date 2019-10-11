import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import NumberFormat from "react-number-format";
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
        global.analytics.page("Your project");
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
      <Head>
        <title>Common Energy - Your project</title>
      </Head>
      <Text h2 hasDecoration>
        Your project
      </Text>
      <div className="inner">
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
            <div className="item">
              <Text noMargin bold>
                Project Name:
              </Text>
              <Text noMargin>{projectInfo ? `${projectInfo.name}` : ""}</Text>
            </div>

            <div className="item">
              <Text noMargin bold>
                Project Address:
              </Text>
              <Text noMargin>
                {projectInfo ? `${projectInfo.town}, ${projectInfo.state}` : ""}
              </Text>
            </div>
            <div className="item">
              <Text noMargin bold>
                Project Size:
              </Text>
              <Text noMargin>
                {projectInfo ? (
                  <NumberFormat
                    value={projectInfo.sizeDC}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" kW DC"}
                  />
                ) : (
                  ""
                )}{" "}
              </Text>
            </div>
            <div className="item">
              <Text noMargin bold>
                Annual generation:
              </Text>
              <Text noMargin>
                {projectInfo ? (
                  <NumberFormat
                    value={projectInfo.annualGeneration}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" kWh"}
                  />
                ) : (
                  ""
                )}{" "}
              </Text>
            </div>
            <div className="item">
              <Text noMargin bold>
                Annual avoided CO2:
              </Text>
              <Text noMargin>
                {projectInfo ? (
                  <NumberFormat
                    value={projectInfo.annualAvoidedC02}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" pounds"}
                  />
                ) : (
                  ""
                )}{" "}
              </Text>
            </div>
            <div className="item">
              <Text noMargin bold>
                Equivalent trees planted:
              </Text>
              <Text noMargin>
                {projectInfo ? (
                  <NumberFormat
                    value={projectInfo.annualTreesPlanted}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                ) : (
                  ""
                )}
              </Text>
            </div>
          </Panel>
        </Section>
      </div>
      <style jsx>{`
        .item {
          display: flex;
          align-items: center;
          margin: 1em 0;
        }
        .item :global(p:first-child) {
          margin-right: 5px;
        }
      `}</style>
    </Main>
  );
}
