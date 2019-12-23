import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import NumberFormat from "react-number-format";
import { withFirebase } from "../../firebase";
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
  const { data } = await axios.get(`${API}/v1/subscribers/${userUid}`, {
    headers: {
      Authorization: idToken
    }
  });
  return data?.data;
};

const getProjectInfo = async (projectId, idToken) => {
  const { data } = await axios.get(`${API}/v1/projects/${projectId}`, {
    headers: {
      Authorization: idToken
    }
  });
  return data?.data ? data.data[0] : {};
};

function MySource(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [overlayDescription, setOverlayDescription] = useState(false);
  const [projectInfo, setProjectInfo] = useState({});
  const [{ selectedAccount }] = useStateValue();

  useEffect(() => {
    setIsLoading(true);
    props.firebase.doUpdateUser(async idToken => {
      global.analytics.page("Your project");
      const userInfo = await getUserData(user.uid, idToken);
      if (userInfo?.accounts) {
        if (
          userInfo.accounts[selectedAccount.value].onboardingStatus ===
          "Unassigned"
        ) {
          setOverlayDescription(
            "Please stay tuned to learn more about the status of your project and your connection timeline! We will provide more details shortly, both here and by email -- and please feel free to always reach out with any questions at"
          );
        } else if (
          userInfo.accounts[selectedAccount.value].onboardingStatus ===
          "Project Live"
        ) {
          setOverlayDescription(
            "Common Energy can connect you to our available project in your community in as little as 2-5 weeks. We'll keep you posted on our progress along the way -- and please feel free to always reach out with any questions at"
          );
        } else if (
          userInfo.accounts[selectedAccount.value].onboardingStatus ===
          "No Project"
        ) {
          setOverlayDescription(
            "Currently, all our projects in your area are filled. However, because of your interest, we're able to work with a developer on a new project to bring more clean energy and savings to your community! Please stand-by for an update on new projects in a few weeks -- and feel free to reach out with any questions at"
          );
        } else if (
          userInfo.accounts[selectedAccount.value].onboardingStatus ===
          "Project Not Live"
        ) {
          setOverlayDescription(
            "We're excited to let you know that we have an available project in your area, but we are not ready to connect you, as it is not yet ready and active. However, we will make sure we update you as we take the project through to completion. Please know that as an early subscriber, you've taken an important step in making this project a success! Feel free to reach out with any questions at"
          );
        } else if (
          userInfo.accounts[selectedAccount.value].onboardingStatus ===
          "Meter Live"
        ) {
          setOverlayDescription(false);
        }

        const projectData = await getProjectInfo(
          userInfo.accounts[selectedAccount.value].projectId,
          idToken
        );
        setProjectInfo(projectData);
        setIsLoading(false);
      }
    });
  }, [selectedAccount.value]);

  return (
    <Main isLoading={isLoading && !overlayDescription}>
      <Head>
        <title>Common Energy - Your Project</title>
      </Head>
      <Text h2 hasDecoration>
        Your Project
      </Text>
      {!overlayDescription && (
        <Text noMargin>
          Congratulations! This is the new clean energy project you’re helping
          to build. When the project iscompleted this image will be replaced
          with a picture of the finished solar farm.
        </Text>
      )}
      <div className="inner">
        <Section
          disabled={overlayDescription}
          overlayDescription={overlayDescription}
        >
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
        {!overlayDescription && (
          <Section disabled={!projectInfo}>
            <Panel>
              <Text h3>Project Summary</Text>
              <Section columns="2" noGap noMargin>
                <div className="item">
                  <Text noMargin bold>
                    Project Name:
                  </Text>
                  <Text noMargin>
                    {projectInfo ? `${projectInfo.name}` : ""}
                  </Text>
                </div>
                <div className="item">
                  <Text noMargin bold>
                    Project Address:
                  </Text>
                  <Text noMargin>
                    {projectInfo
                      ? `${projectInfo.town}, ${projectInfo.state}`
                      : ""}
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
              </Section>
            </Panel>
          </Section>
        )}
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

        @media (max-width: 1200px) {
          .item {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </Main>
  );
}

export default withFirebase(MySource);
