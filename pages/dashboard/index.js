import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import { withFirebase } from "../../firebase";
import { useStateValue } from "../../state";
import Main from "../../components/Main";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Panel from "../../components/Panel";
import Text from "../../components/Text";
import Separator from "../../components/Separator";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import UsersInAreaMap from "../../components/Dashboard/UsersInAreaMap";
import ElectricityMixChart from "../../components/Dashboard/ElectricityMixChart";
import EmissionsChart from "../../components/Dashboard/EmissionsChart";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const Dashboard = props => {
  const router = useRouter();
  const [{ selectedAccount }] = useStateValue();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async (userUid, idToken) => {
    const response = await axios.get(`${API}/v1/subscribers/${userUid}`, {
      headers: {
        Authorization: idToken
      }
    });
    return response?.data?.data;
  };

  useEffect(() => {
    console.log("loaded");
    // if (!JSON.parse(localStorage.getItem("loggedIn"))) {
    //   router.push("/");
    // }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    props.firebase.doUpdateUser(async (user, idToken) => {
      global.analytics.page("Dashboard");
      const userInfo = await getUserData(user.uid, idToken);
      setUserData(userInfo);
      setIsLoading(false);
    });
  }, [selectedAccount.value]);

  return (
    <Main isLoading={isLoading} popup={true}>
      <Head>
        <title>Common Energy - Home</title>
      </Head>
      <Text h2 hasDecoration>
        Welcome {userData?.firstName}
      </Text>
      <Text noMargin>This is your impact and savings dashboard!</Text>
      <Section columns="4">
        <span className="label">
          <Text bold noMargin style={{ textAlign: "center", color: "#a8a8ba" }}>
            Your Impact
          </Text>
        </span>
        <span className="label desktop-only">
          <Text bold noMargin style={{ textAlign: "center", color: "#a8a8ba" }}>
            Your Savings
          </Text>
        </span>
        <Panel small specialShadow center>
          <Container column>
            <Icon
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                >
                  <g
                    fill="#2479FF"
                    fillRule="nonzero"
                    stroke="#2479FF"
                    strokeWidth=".638"
                  >
                    <path d="M14.5 8.825A5.663 5.663 0 0 0 8.825 14.5a5.663 5.663 0 0 0 5.675 5.675 5.663 5.663 0 0 0 5.675-5.675A5.663 5.663 0 0 0 14.5 8.825zM13.852.512h1.296v5.549h-1.296zM13.852 22.939h1.296v5.549h-1.296zM22.939 13.852h5.549v1.296h-5.549zM.512 13.852h5.549v1.296H.512zM24.847 23.93l-3.924-3.923-.916.916 3.924 3.924.916-.917zM9.005 8.072L5.081 4.148l-.916.917 3.924 3.924.916-.917zM8.997 20.915l-.916-.916-3.924 3.923.916.917 3.924-3.924zM24.855 5.073l-.916-.917-3.924 3.924.916.917 3.924-3.924z" />
                  </g>
                </svg>
              }
            />
            <Text h2 bold style={{ marginTop: "20px" }}>
              {(userData &&
                userData.accounts &&
                userData.accounts[selectedAccount.value]
                  .totalCleanEnergyGenerated > 0 && (
                  <NumberFormat
                    value={
                      userData.accounts[selectedAccount.value]
                        .totalCleanEnergyGenerated
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" kWh"}
                  />
                )) ||
                "0 kWh"}{" "}
            </Text>
          </Container>
          <span className="label desktop-only">
            <Text
              bold
              noMargin
              style={{ textAlign: "center", color: "#a8a8ba" }}
            >
              Your Savings
            </Text>
          </span>
          <Panel small specialShadow center>
            <Container column>
              <Icon
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                  >
                    <g
                      fill="#2479FF"
                      fillRule="nonzero"
                      stroke="#2479FF"
                      strokeWidth=".638"
                    >
                      <path d="M14.5 8.825A5.663 5.663 0 0 0 8.825 14.5a5.663 5.663 0 0 0 5.675 5.675 5.663 5.663 0 0 0 5.675-5.675A5.663 5.663 0 0 0 14.5 8.825zM13.852.512h1.296v5.549h-1.296zM13.852 22.939h1.296v5.549h-1.296zM22.939 13.852h5.549v1.296h-5.549zM.512 13.852h5.549v1.296H.512zM24.847 23.93l-3.924-3.923-.916.916 3.924 3.924.916-.917zM9.005 8.072L5.081 4.148l-.916.917 3.924 3.924.916-.917zM8.997 20.915l-.916-.916-3.924 3.923.916.917 3.924-3.924zM24.855 5.073l-.916-.917-3.924 3.924.916.917 3.924-3.924z" />
                    </g>
                  </svg>
                }
              />
              <Text h2 bold style={{ marginTop: "20px" }}>
                {(userData?.accounts &&
                  userData.accounts[selectedAccount.value]
                    .totalCleanEnergyGenerated > 0 && (
                    <NumberFormat
                      value={
                        userData.accounts[selectedAccount.value]
                          .totalCleanEnergyGenerated
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" kWh"}
                    />
                  )) ||
                  "0 kWh"}{" "}
              </Text>
            </Container>
            <Separator margin="10px auto 25px auto" small />
            <Text noMargin small>
              Clean Energy Generated
            </Text>
          </Panel>
          <Separator margin="10px auto 25px auto" small />
          <Text noMargin small>
            Savings to Date
          </Text>
        </Panel>
        <Panel small specialShadow center>
          <Container column>
            <Icon
              icon={
                <svg
                  width="100%"
                  viewBox="0 0 27 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.97017 3.35176C6.31674 3.43446 5.65863 3.47465 5 3.47208C4.31632 3.47208 3.64605 3.43143 3.02984 3.35176C1.5954 4.57158 0 6.60922 0 8.45866C0 11.3674 2.23844 12.7347 5 12.7347C7.76156 12.7347 10 11.3674 10 8.45866C10 6.59499 8.4046 4.57117 6.97017 3.35135V3.35176ZM5.37558 10.1878V10.7377C5.3758 10.7519 5.37317 10.766 5.36786 10.7791C5.36254 10.7922 5.35465 10.8041 5.34464 10.8141C5.33463 10.8241 5.32271 10.832 5.30959 10.8373C5.29648 10.8426 5.28242 10.8453 5.26827 10.8451H4.73173C4.71758 10.8453 4.70352 10.8426 4.69041 10.8373C4.67729 10.832 4.66537 10.8241 4.65536 10.8141C4.64535 10.8041 4.63746 10.7922 4.63214 10.7791C4.62683 10.766 4.6242 10.7519 4.62442 10.7377V10.2012C4.08829 10.1614 3.64605 9.74596 3.59239 9.20982C3.59239 9.15657 3.64605 9.10251 3.70011 9.10251H4.23624C4.28949 9.10251 4.32973 9.12934 4.34355 9.18299C4.36997 9.34396 4.53053 9.46468 4.6923 9.46468H5.16137C5.44305 9.46468 5.6975 9.26388 5.72433 8.99561C5.76457 8.6745 5.50931 8.40623 5.20161 8.40623H4.85286C4.19641 8.40623 3.60621 7.92334 3.53914 7.25307C3.47208 6.55638 3.96797 5.96618 4.63824 5.87229V5.33615C4.63824 5.2829 4.69149 5.22884 4.74555 5.22884H5.28209C5.33493 5.22884 5.38899 5.26949 5.38899 5.33615V5.87269C5.92554 5.91253 6.36778 6.32794 6.42143 6.86408C6.42165 6.87826 6.41901 6.89235 6.41367 6.9055C6.40833 6.91864 6.4004 6.93058 6.39035 6.94059C6.3803 6.95061 6.36833 6.95849 6.35516 6.96378C6.342 6.96907 6.3279 6.97166 6.31371 6.97138H5.77758C5.73693 6.97138 5.68409 6.94456 5.67027 6.8909C5.64979 6.81046 5.60312 6.73912 5.53763 6.68812C5.47213 6.63712 5.39152 6.60936 5.30851 6.60922H4.83944C4.55776 6.60922 4.31672 6.81002 4.27648 7.07829C4.24965 7.3994 4.4911 7.66767 4.7988 7.66767H5.2012C5.95196 7.66767 6.54134 8.2977 6.46126 9.06187C6.40761 9.65166 5.93814 10.0943 5.37558 10.1878V10.1878ZM4.99959 2.68149C5.64304 2.68149 6.25965 2.64084 6.82302 2.57418C7.1982 1.76978 7.53353 0.951955 7.53353 0.590196C7.53353 0.0536542 6.84944 -0.227624 6.44744 0.348752C5.91131 1.0995 5.67027 0 5.05406 0C4.43744 0 4.11593 1.01902 3.63304 0.334932C3.19039 -0.281278 2.45305 0.0943013 2.45305 0.577189C2.45305 1.04626 2.76197 1.83684 3.10991 2.57418C3.73737 2.64602 4.36844 2.68185 5 2.68149H4.99959Z"
                    fill="#2479FF"
                  />
                  <path
                    d="M23.9702 3.35176C23.3167 3.43446 22.6586 3.47465 22 3.47208C21.3163 3.47208 20.646 3.43143 20.0298 3.35176C18.5954 4.57158 17 6.60922 17 8.45866C17 11.3674 19.2384 12.7347 22 12.7347C24.7616 12.7347 27 11.3674 27 8.45866C27 6.59499 25.4046 4.57117 23.9702 3.35135V3.35176ZM22.3756 10.1878V10.7377C22.3758 10.7519 22.3732 10.766 22.3679 10.7791C22.3625 10.7922 22.3546 10.8041 22.3446 10.8141C22.3346 10.8241 22.3227 10.832 22.3096 10.8373C22.2965 10.8426 22.2824 10.8453 22.2683 10.8451H21.7317C21.7176 10.8453 21.7035 10.8426 21.6904 10.8373C21.6773 10.832 21.6654 10.8241 21.6554 10.8141C21.6454 10.8041 21.6375 10.7922 21.6321 10.7791C21.6268 10.766 21.6242 10.7519 21.6244 10.7377V10.2012C21.0883 10.1614 20.646 9.74596 20.5924 9.20982C20.5924 9.15657 20.646 9.10251 20.7001 9.10251H21.2362C21.2895 9.10251 21.3297 9.12934 21.3435 9.18299C21.37 9.34396 21.5305 9.46468 21.6923 9.46468H22.1614C22.4431 9.46468 22.6975 9.26388 22.7243 8.99561C22.7646 8.6745 22.5093 8.40623 22.2016 8.40623H21.8529C21.1964 8.40623 20.6062 7.92334 20.5391 7.25307C20.4721 6.55638 20.968 5.96618 21.6382 5.87229V5.33615C21.6382 5.2829 21.6915 5.22884 21.7455 5.22884H22.2821C22.3349 5.22884 22.389 5.26949 22.389 5.33615V5.87269C22.9255 5.91253 23.3678 6.32794 23.4214 6.86408C23.4217 6.87826 23.419 6.89235 23.4137 6.9055C23.4083 6.91864 23.4004 6.93058 23.3903 6.94059C23.3803 6.95061 23.3683 6.95849 23.3552 6.96378C23.342 6.96907 23.3279 6.97166 23.3137 6.97138H22.7776C22.7369 6.97138 22.6841 6.94456 22.6703 6.8909C22.6498 6.81046 22.6031 6.73912 22.5376 6.68812C22.4721 6.63712 22.3915 6.60936 22.3085 6.60922H21.8394C21.5578 6.60922 21.3167 6.81002 21.2765 7.07829C21.2497 7.3994 21.4911 7.66767 21.7988 7.66767H22.2012C22.952 7.66767 23.5413 8.2977 23.4613 9.06187C23.4076 9.65166 22.9381 10.0943 22.3756 10.1878V10.1878ZM21.9996 2.68149C22.643 2.68149 23.2597 2.64084 23.823 2.57418C24.1982 1.76978 24.5335 0.951955 24.5335 0.590196C24.5335 0.0536542 23.8494 -0.227624 23.4474 0.348752C22.9113 1.0995 22.6703 0 22.0541 0C21.4374 0 21.1159 1.01902 20.633 0.334932C20.1904 -0.281278 19.4531 0.0943013 19.4531 0.577189C19.4531 1.04626 19.762 1.83684 20.1099 2.57418C20.7374 2.64602 21.3684 2.68185 22 2.68149H21.9996Z"
                    fill="#2479FF"
                  />
                  <path
                    d="M16.0612 10.3573C15.2118 10.4648 14.3562 10.517 13.5 10.5137C12.6112 10.5137 11.7399 10.4609 10.9388 10.3573C9.07402 11.9431 7 14.592 7 16.9963C7 20.7776 9.90997 22.5552 13.5 22.5552C17.09 22.5552 20 20.7776 20 16.9963C20 14.5735 17.926 11.9425 16.0612 10.3568V10.3573ZM13.9883 19.2441V19.9591C13.9885 19.9775 13.9851 19.9957 13.9782 20.0128C13.9713 20.0298 13.961 20.0453 13.948 20.0583C13.935 20.0714 13.9195 20.0816 13.9025 20.0885C13.8854 20.0954 13.8672 20.0989 13.8488 20.0986H13.1512C13.1328 20.0989 13.1146 20.0954 13.0975 20.0885C13.0805 20.0816 13.065 20.0714 13.052 20.0583C13.039 20.0453 13.0287 20.0298 13.0218 20.0128C13.0149 19.9957 13.0115 19.9775 13.0117 19.9591V19.2616C12.3148 19.2098 11.7399 18.6697 11.6701 17.9728C11.6701 17.9035 11.7399 17.8333 11.8101 17.8333H12.5071C12.5763 17.8333 12.6286 17.8681 12.6466 17.9379C12.681 18.1471 12.8897 18.3041 13.1 18.3041H13.7098C14.076 18.3041 14.4068 18.043 14.4416 17.6943C14.4939 17.2768 14.1621 16.9281 13.7621 16.9281H13.3087C12.4553 16.9281 11.6881 16.3003 11.6009 15.429C11.5137 14.5233 12.1584 13.756 13.0297 13.634V12.937C13.0297 12.8678 13.0989 12.7975 13.1692 12.7975H13.8667C13.9354 12.7975 14.0057 12.8503 14.0057 12.937V13.6345C14.7032 13.6863 15.2781 14.2263 15.3479 14.9233C15.3481 14.9417 15.3447 14.9601 15.3378 14.9771C15.3308 14.9942 15.3205 15.0098 15.3075 15.0228C15.2944 15.0358 15.2788 15.046 15.2617 15.0529C15.2446 15.0598 15.2263 15.0632 15.2078 15.0628H14.5109C14.458 15.0628 14.3893 15.0279 14.3714 14.9582C14.3447 14.8536 14.2841 14.7608 14.1989 14.6946C14.1138 14.6283 14.009 14.5922 13.9011 14.592H13.2913C12.9251 14.592 12.6117 14.853 12.5594 15.2018C12.5246 15.6192 12.8384 15.968 13.2384 15.968H13.7616C14.7375 15.968 15.5037 16.787 15.3996 17.7804C15.3299 18.5472 14.7196 19.1226 13.9883 19.2441V19.2441ZM13.4995 9.48594C14.3359 9.48594 15.1375 9.4331 15.8699 9.34644C16.3577 8.30071 16.7936 7.23754 16.7936 6.76725C16.7936 6.06975 15.9043 5.70409 15.3817 6.45338C14.6847 7.42936 14.3714 6 13.5703 6C12.7687 6 12.3507 7.32473 11.7229 6.43541C11.1475 5.63434 10.189 6.12259 10.189 6.75035C10.189 7.36013 10.5906 8.3879 11.0429 9.34644C11.8586 9.43982 12.679 9.4864 13.5 9.48594H13.4995Z"
                    fill="#2479FF"
                  />
                </svg>
              }
            />
            <Text h2 bold style={{ marginTop: "20px" }}>
              {(userData &&
                userData.accounts &&
                userData.accounts[selectedAccount.value]
                  .lifetimeEstimatedSavings > 0 && (
                  <NumberFormat
                    value={Math.round(
                      userData.accounts[selectedAccount.value]
                        .lifetimeEstimatedSavings
                    )}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                )) ||
                "$1,000 - $2,000"}{" "}
            </Text>
          </Container>
          <Separator margin="10px auto 25px auto" small />
          <Text noMargin small>
            Forecasted Lifetime Savings
          </Text>
        </Panel>
      </Section>
      <Text h2 bold noMargin>
        Your Electricity and Impact
      </Text>
      <Section columns="2">
        <Panel>
          <ElectricityMixChart />
        </Panel>
        <Panel>
          <EmissionsChart />
        </Panel>
      </Section>
      <Section>
        <Panel>
          <Container column alignLeft>
            <Text h3 noMargin>
              Help us bring more clean energy to your community!
            </Text>
            <Text style={{ marginBottom: "20px" }}>
              You can earn <strong>over $1,000</strong> by helping spread the
              word about Common Energy. Find out how with the link below.
            </Text>
          </Container>
          <UsersInAreaMap />
          <Link href="/dashboard/referrals">
            <a className="inner-link">
              <Button primary>Refer Friends To Common Energy</Button>
            </a>
          </Link>
        </Panel>
      </Section>
      <style jsx>{`
        .label {
          grid-column: span 2;
        }

        .inner-link {
          text-decoration: none;
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @media (max-width: 700px) {
          .label {
            grid-column: span 2;
          }

          .inner-link {
            text-decoration: none;
          }

          @media (max-width: 700px) {
            .label {
              grid-column: 1 / -1;
            }
          }
        `}</style>
    </Main>
  );
};

export default withFirebase(Dashboard);
