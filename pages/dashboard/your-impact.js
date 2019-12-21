import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import { withFirebase } from "../../firebase";
import { useStateValue } from "../../state";
import NumberFormat from "react-number-format";
import Main from "../../components/Main";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Separator from "../../components/Separator";
import Panel from "../../components/Panel";
import Text from "../../components/Text";
import Icon from "../../components/Icon";
import InvoicesTable from "../../components/InvoicesTable";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function MyImpact(props) {
  const [userData, setUserdata] = useState({});
  const [billingData, setBillingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [overlayDescription, setOverlayDescription] = useState(false);
  const [{ selectedAccount }] = useStateValue();

  const getUserData = async (userUid, idToken) => {
    const { data } = await axios.get(`${API}/v1/subscribers/${userUid}`, {
      headers: {
        Authorization: idToken
      }
    });
    return data?.data;
  };

  const getBillings = async (id, idToken) => {
    const { data } = await axios.get(
      `${API}/v1/subscribers/accounts/${id}/billings`,
      {
        headers: {
          Authorization: idToken
        }
      }
    );
    return data?.data;
  };

  useEffect(() => {
    setIsLoading(true);
    props.firebase.doUpdateUser(user => {
      if (user) {
        global.analytics.page("Your impact");

        user.getIdToken(true).then(async idToken => {
          const userData = await getUserData(user.uid, idToken);
          if (userData && userData.accounts) {
            setIsLoading(false);
            setUserdata(userData);
            if (
              userData.accounts[selectedAccount.value].onboardingStatus ===
              "Unassigned"
            ) {
              setOverlayDescription(
                "Please stay tuned to learn more about the status of your project and your connection timeline! We will provide more details shortly, both here and by email -- and please feel free to always reach out with any questions at"
              );
            } else if (
              userData.accounts[selectedAccount.value].onboardingStatus ===
              "Project Live"
            ) {
              setOverlayDescription(
                "Common Energy can connect you to our available project in your community in as little as 2-5 weeks. We'll keep you posted on our progress along the way -- and please feel free to always reach out with any questions at"
              );
            } else if (
              userData.accounts[selectedAccount.value].onboardingStatus ===
              "No Project"
            ) {
              setOverlayDescription(
                "Currently, all our projects in your area are filled. However, because of your interest, we're able to work with a developer on a new project to bring more clean energy and savings to your community! Please stand-by for an update on new projects in a few weeks -- and feel free to reach out with any questions at"
              );
            } else if (
              userData.accounts[selectedAccount.value].onboardingStatus ===
              "Project Not Live"
            ) {
              setOverlayDescription(
                "We're excited to let you know that we have an available project in your area, but we are not ready to connect you, as it is not yet ready and active. However, we will make sure we update you as we take the project through to completion. Please know that as an early subscriber, you've taken an important step in making this project a success! Feel free to reach out with any questions at"
              );
            } else if (
              userData.accounts[selectedAccount.value].onboardingStatus ===
              "Meter Live"
            ) {
              setOverlayDescription(false);
            }

            const billings = await getBillings(
              userData.accounts[selectedAccount.value].id,
              idToken
            );

            const finalData = [];

            billings.forEach(async item => {
              const tableItem = [];
              tableItem.push(item.endDate);
              tableItem.push(item.cleanEnergy);
              tableItem.push(Math.round(item.avoidedC02));
              tableItem.push(item.savings);
              tableItem.push(item.id);
              finalData.push(tableItem);
            });

            setBillingData(finalData);
          }
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
        <title>Common Energy - Your Impact</title>
      </Head>
      <Text h2 hasDecoration>
        Your Impact
      </Text>
      <Text h2 style={{ marginTop: "40px" }}>
        Cumulative Impact and Savings
      </Text>
      <Section
        columns="4"
        disabled={overlayDescription}
        overlayDescription={overlayDescription}
      >
        <Panel small specialShadow>
          <Text small noMargin>
            Clean Energy (kWh)
          </Text>
          <Separator margin="10px 0" small />
          <Container>
            <Icon
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="37"
                  viewBox="0 0 34 37"
                >
                  <g fill="#2479FF" fillRule="evenodd">
                    <path d="M3.984 18.045a.995.995 0 0 0-.996-.994H.996a.995.995 0 1 0 0 1.988h1.992c.55 0 .996-.445.996-.994zM33.004 17.05h-1.992a.995.995 0 1 0 0 1.989h1.992a.995.995 0 1 0 0-1.988zM5.421 10.225L3.696 9.23a.997.997 0 0 0-1.361.364.993.993 0 0 0 .365 1.358l1.725.994a.998.998 0 0 0 1.361-.364.993.993 0 0 0-.365-1.358zM31.3 25.137l-1.725-.994a.997.997 0 0 0-1.361.364.993.993 0 0 0 .365 1.358l1.725.994a.998.998 0 0 0 1.361-.364.993.993 0 0 0-.365-1.358zM9.165 6.28a.998.998 0 0 0 1.36.364.993.993 0 0 0 .365-1.358l-.996-1.723a1 1 0 0 0-1.36-.364.993.993 0 0 0-.366 1.358l.997 1.723zM16.063 2.998c0 .553.45.995.996.996.55 0 .996-.444.995-.994l-.002-1.99a1 1 0 0 0-.996-.995.993.993 0 0 0-.995.993l.002 1.99zM4.425 24.143l-1.725.994a.993.993 0 0 0-.365 1.358.997.997 0 0 0 1.36.364l1.726-.994a.993.993 0 0 0 .365-1.358.999.999 0 0 0-1.36-.364zM29.575 11.947l1.725-.994a.993.993 0 0 0 .365-1.358.998.998 0 0 0-1.36-.364l-1.726.994a.993.993 0 0 0-.365 1.358.997.997 0 0 0 1.36.364zM23.475 6.644a.998.998 0 0 0 1.36-.364l.997-1.723a.993.993 0 0 0-.365-1.358 1 1 0 0 0-1.361.364l-.996 1.723a.993.993 0 0 0 .365 1.358zM23.908 9.556c-2.573-2.089-5.945-2.891-9.255-2.202-4.3.894-7.694 4.413-8.443 8.755-.627 3.637.574 7.313 3.213 9.837 1.404 1.34 2.257 3.134 2.493 5.023h4.088v-4.67l-3.763-5.633-1.922-1.918a.992.992 0 0 1 0-1.406.997.997 0 0 1 1.409 0l1.288 1.285 1.288-1.285a.997.997 0 0 1 1.408 0L17 18.627l1.288-1.285a.997.997 0 0 1 1.408 0l1.288 1.285 1.288-1.285a.997.997 0 0 1 1.409 0 .992.992 0 0 1 0 1.406l-1.922 1.918-3.763 5.633v4.67h4.03c.117-1.786.967-3.536 2.484-4.96a10.973 10.973 0 0 0 3.447-7.964c0-3.307-1.476-6.401-4.05-8.49z" />
                    <path d="M18.992 19.45l-1.288 1.286a.997.997 0 0 1-1.408 0l-1.288-1.285-.71.709L17 24.206l2.703-4.046-.71-.71zM12.02 34.018A2.989 2.989 0 0 0 15.008 37h3.984a2.989 2.989 0 0 0 2.988-2.982v-1.06h-9.96v1.06z" />
                  </g>
                </svg>
              }
            />
            <Text h2 bold style={{ margin: "5px 0 0 20px" }}>
              {(userData?.accounts && (
                <NumberFormat
                  value={Math.round(
                    userData.accounts[selectedAccount.value]
                      .totalCleanEnergyGenerated
                  )}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" kWh"}
                />
              )) ||
                "0 kWh"}{" "}
            </Text>
          </Container>
        </Panel>
        <Panel small specialShadow>
          <Text small noMargin>
            Avoided CO2
          </Text>
          <Separator margin="10px 0" small />
          <Container>
            <Icon
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="31"
                  viewBox="0 0 41 31"
                >
                  <g fill="#2479FF" fillRule="evenodd">
                    <path d="M23.027 16.18c-1.012 0-1.518.56-1.518 1.682v4.46c0 1.121.506 1.682 1.518 1.682 1.025 0 1.536-.56 1.536-1.683v-4.46c0-1.12-.511-1.682-1.536-1.682z" />
                    <path d="M39.042 16.36c-.97-1.218-2.154-2.121-3.525-2.692a6.369 6.369 0 0 0 .336-2.062c0-1.764-.627-3.292-1.864-4.54-1.233-1.244-2.742-1.875-4.483-1.875-1.04 0-2.004.23-2.87.684a11.61 11.61 0 0 0-3.562-3.88C21.157.671 18.992 0 16.64 0c-3.156 0-5.888 1.143-8.122 3.396-2.237 2.256-3.372 5.018-3.372 8.21 0 .045 0 .093.002.144-1.422.812-2.607 1.946-3.525 3.374A10.132 10.132 0 0 0 0 20.691c0 2.829 1.01 5.28 3 7.288C4.985 29.983 7.41 31 10.206 31H32.08c2.448 0 4.569-.887 6.303-2.636C40.12 26.612 41 24.467 41 21.99c0-2.105-.66-3.999-1.958-5.628zm-26.254 7.644c.319 0 .583-.05.794-.151a.903.903 0 0 0 .452-.463c.091-.208.15-.379.18-.514.028-.134.053-.319.076-.555.045-.527.484-.79 1.314-.79.49 0 .836.087 1.041.26.205.174.307.503.307.984 0 1.089-.4 1.947-1.203 2.575-.802.629-1.829.943-3.08.943-1.217 0-2.204-.32-2.96-.96-.758-.64-1.136-1.643-1.136-3.012v-4.46c0-1.368.378-2.372 1.135-3.012.757-.639 1.744-.959 2.961-.959 1.251 0 2.278.298 3.08.892.802.595 1.203 1.414 1.203 2.457 0 .483-.102.81-.307.984-.205.175-.546.261-1.024.261-.853 0-1.297-.263-1.33-.79-.035-1.01-.541-1.515-1.52-1.515-1.024 0-1.536.561-1.536 1.683v4.46c0 1.121.518 1.682 1.553 1.682zm14.438-1.683c0 1.37-.382 2.373-1.144 3.013-.762.64-1.78.959-3.055.959-1.262 0-2.275-.32-3.037-.96-.762-.639-1.143-1.643-1.143-3.012v-4.46c0-1.368.38-2.372 1.143-3.011.762-.64 1.775-.96 3.037-.96 1.274 0 2.293.32 3.055.96.762.639 1.144 1.643 1.144 3.012v4.46zm6.358 2.476c.133 0 .248.068.346.205a.807.807 0 0 1 .146.482.857.857 0 0 1-.145.492c-.097.144-.212.216-.343.216h-3.703a.892.892 0 0 1-.474-.145c-.156-.096-.234-.213-.234-.35v-1.002c0-.296.112-.591.334-.887a3.93 3.93 0 0 1 .807-.795l.955-.705c.33-.235.61-.48.838-.736.229-.256.343-.505.343-.747a.747.747 0 0 0-.2-.514c-.134-.148-.334-.223-.601-.223a.84.84 0 0 0-.57.192c-.147.128-.22.33-.22.607 0 .163-.078.306-.232.426-.154.12-.357.18-.61.18-.48 0-.719-.276-.719-.83 0-.595.233-1.072.699-1.43.466-.36 1.013-.54 1.641-.54.648 0 1.216.188 1.703.563.488.375.731.88.731 1.517 0 .415-.111.806-.334 1.172a3.457 3.457 0 0 1-.805.923c-.313.249-.629.477-.946.684-.316.208-.587.41-.812.607-.225.197-.338.379-.338.544v.094h2.743z" />
                  </g>
                </svg>
              }
            />
            <Text h2 bold style={{ margin: "5px 0 0 20px" }}>
              {(userData?.accounts && (
                <NumberFormat
                  value={Math.round(
                    userData.accounts[selectedAccount.value].totalC02Avoided
                  )}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" lbs"}
                />
              )) ||
                "0 lbs"}{" "}
            </Text>
          </Container>
        </Panel>
        <Panel small specialShadow>
          <Text small noMargin>
            Equivalent Trees Planted
          </Text>
          <Separator margin="10px 0" small />
          <Container>
            <Icon
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                >
                  <g fill="#2479FF" fillRule="evenodd">
                    <path d="M17.949 9.665a1 1 0 0 0-.989-.833h-.002a1 1 0 0 0-.987.838l-3.754 23.163a.992.992 0 0 0 .226.804c.19.223.47.35.763.35h7.629c.294 0 .574-.128.764-.351a.992.992 0 0 0 .224-.808L17.949 9.665z" />
                    <path d="M30.174 12.405a5.929 5.929 0 0 0-1.545-4.39 6.026 6.026 0 0 0-3.122-1.823 8.881 8.881 0 0 0-2.909-4.24A8.939 8.939 0 0 0 17.028 0c-2.022 0-4 .693-5.572 1.952a8.88 8.88 0 0 0-2.908 4.24 6.026 6.026 0 0 0-3.123 1.823 5.938 5.938 0 0 0-1.544 4.39c-2.26.888-3.82 3.098-3.82 5.562 0 3.296 2.696 5.977 6.011 5.977h5.556l1.364-8.418-1.366-1.358a.992.992 0 0 1 0-1.408 1.006 1.006 0 0 1 1.417 0l.342.34.608-3.747c.113-.7.474-1.338 1.015-1.797a3.02 3.02 0 0 1 1.945-.716h.007a2.991 2.991 0 0 1 2.966 2.498l1.018 6.089 2.344-2.33a1.006 1.006 0 0 1 1.417 0 .992.992 0 0 1 0 1.409l-3.357 3.337 1.02 6.1h5.614c3.315 0 6.012-2.68 6.012-5.976 0-2.464-1.56-4.674-3.82-5.562z" />
                  </g>
                </svg>
              }
            />
            <Text h2 bold style={{ margin: "5px 0 0 20px" }}>
              {(userData?.accounts &&
                userData.accounts[selectedAccount.value].totalTreesPlanted >
                  0 && (
                  <NumberFormat
                    value={Math.round(
                      userData.accounts[selectedAccount.value].totalTreesPlanted
                    )}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                )) ||
                "0"}
            </Text>
          </Container>
        </Panel>
        <Panel small specialShadow>
          <Text small noMargin>
            Total Savings
          </Text>
          <Separator margin="10px 0" small />
          <Container>
            <Icon
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="34"
                  viewBox="0 0 27 34"
                >
                  <path
                    fill="#2479FF"
                    fillRule="evenodd"
                    d="M18.82 8.948a41.547 41.547 0 0 1-5.32.322 42.19 42.19 0 0 1-5.32-.322C4.308 12.206 0 17.645 0 22.584 0 30.35 6.044 34 13.5 34S27 30.35 27 22.584c0-4.975-4.308-10.378-8.18-13.636zM14.514 27.2v1.468a.285.285 0 0 1-.29.287h-1.448a.285.285 0 0 1-.29-.287v-1.431c-1.447-.108-2.642-1.217-2.786-2.648 0-.143.144-.287.29-.287h1.447c.145 0 .253.072.29.216.072.429.506.752.942.752h1.267c.76 0 1.447-.537 1.52-1.253.108-.858-.58-1.574-1.412-1.574h-.941c-1.773 0-3.366-1.289-3.547-3.078-.181-1.86 1.158-3.436 2.967-3.687v-1.431c0-.143.144-.287.29-.287h1.448c.144 0 .29.108.29.287v1.431c1.447.108 2.642 1.216 2.786 2.648a.285.285 0 0 1-.29.287H15.6c-.108 0-.253-.072-.29-.216a1.008 1.008 0 0 0-.976-.752h-1.267c-.76 0-1.41.537-1.52 1.253-.072.858.58 1.574 1.411 1.574h1.086c2.027 0 3.62 1.682 3.401 3.721-.144 1.576-1.41 2.757-2.93 3.007zM13.5 7.16c1.738 0 3.402-.109 4.923-.288 1.014-2.147 1.918-4.33 1.918-5.296 0-1.432-1.846-2.184-2.932-.645C15.962 2.936 15.31 0 13.646 0c-1.665 0-2.533 2.72-3.837.895C8.614-.751 6.624.252 6.624 1.54c0 1.252.832 3.363 1.773 5.331 1.556.18 3.294.287 5.103.287z"
                  />
                </svg>
              }
            />
            <Text h2 bold style={{ margin: "5px 0 0 20px" }}>
              {(userData?.accounts &&
                userData.accounts[selectedAccount.value].totalSavingsToDate >
                  0 && (
                  <NumberFormat
                    value={
                      userData.accounts[selectedAccount.value]
                        .totalSavingsToDate
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                )) ||
                "$0"}
            </Text>
          </Container>
        </Panel>
      </Section>
      <Text h2>Monthly Impact and Savings</Text>
      <Section tableSection>
        <Panel>
          <Text h3>Utility Invoices</Text>
          {billingData?.length > 0 ? (
            <InvoicesTable
              hasDownloads
              headers={[
                "Date",
                "Clean Energy Generated (kWh)",
                "Pounds of CO2 Avoided",
                "Savings with Common Energy"
              ]}
              data={billingData}
            />
          ) : (
            <Text>You have no Utility Invoices available yet</Text>
          )}
        </Panel>
      </Section>
    </Main>
  );
}

export default withFirebase(MyImpact);
