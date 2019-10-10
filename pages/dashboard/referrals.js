import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import axios from "axios";
import Main from "../../components/Main";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Panel from "../../components/Panel";
import Button from "../../components/Button";
import Separator from "../../components/Separator";
import Text from "../../components/Text";
import Image from "../../components/Image";
import Icon from "../../components/Icon";
import ReferralsTable from "../../components/Dashboard/ReferralsTable";
import SegmentedInput from "../../components/SegmentedInput";
import Table from "../../components/Table";
import UsersInAreaMap from "../../components/Dashboard/UsersInAreaMap";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const FacebookShare = () => {
  FB.ui({
    method: "share",
    href: "https://www.commonenergy.us"
  });
};

const TwitterShare = () => {
  console.log("Twitter share");
};

const LinkedinShare = () => {
  console.log("Linkedin share");
};

const getReferralsDetails = referralsDetails => {
  const allItems = [];
  referralsDetails.forEach(element => {
    const singleItem = [];
    singleItem.push(element.name);
    singleItem.push(element.status);
    singleItem.push(element.convertedDate);
    allItems.push(singleItem);
  });

  return allItems;
};

const getUserData = async (userUid, idToken) => {
  const response = await axios.get(`${API}/v1/subscribers/${userUid}`, {
    headers: {
      Authorization: idToken
    }
  });
  return response && response.data && response.data.data;
};

const getReferralsData = async (username, idToken) => {
  const response = await axios.get(
    `${API}/v1/subscribers/referrals/${username}`,
    {
      headers: {
        Authorization: idToken
      }
    }
  );
  return response && response.data && response.data.data;
};

const getReferralsDataDetails = async (username, idToken) => {
  const response = await axios.get(
    `${API}/v1/subscribers/referrals/details/${username}`,
    {
      headers: {
        Authorization: idToken
      }
    }
  );

  return (
    response && response.data && response.data.data && response.data.data[0]
  );
};

export default function Referrals() {
  const [userData, setUserData] = useState({});
  const [referralsData, setReferralsData] = useState({});
  const [referralsDetails, setReferralsDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        global.analytics.page("Referrals");

        user.getIdToken(true).then(async idToken => {
          const userInfo = await getUserData(user.uid, idToken);
          setUserData(userInfo);

          const referralsInfo = await getReferralsData(
            userInfo.username,
            idToken
          );
          setReferralsData(referralsInfo[0]);

          const referralsInfoDetails = await getReferralsDataDetails(
            userInfo.username,
            idToken
          );

          setReferralsDetails(referralsInfoDetails);

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
        <title>Common Energy - Referrals</title>
      </Head>
      <Text h2 hasDecoration>
        Your Referrals
      </Text>
      <Section columns="5">
        <Panel small specialShadow center>
          <Container column>
            <Icon
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="29"
                  viewBox="0 0 25 29"
                >
                  <path
                    fill="#2479FF"
                    fillRule="evenodd"
                    d="M12.5 0a2.895 2.895 0 0 0-2.885 2.885 2.89 2.89 0 0 0 2.244 2.804v3.987a4.474 4.474 0 0 0-2.925 1.722L5.59 9.335c.116-.313.18-.65.18-1.002 0-1.585-1.3-2.884-2.884-2.884A2.895 2.895 0 0 0 0 8.333c0 1.585 1.3 2.885 2.885 2.885a2.87 2.87 0 0 0 1.993-.811l3.435 2.113a4.467 4.467 0 0 0-.3 1.583c0 .553.115 1.081.3 1.572l-3.445 2.113a2.866 2.866 0 0 0-1.983-.8A2.895 2.895 0 0 0 0 19.871c0 1.585 1.3 2.884 2.885 2.884 1.585 0 2.884-1.3 2.884-2.884 0-.356-.07-.696-.19-1.012l3.355-2.063a4.468 4.468 0 0 0 2.925 1.733v3.986a2.89 2.89 0 0 0-2.244 2.805c0 1.585 1.3 2.884 2.885 2.884 1.585 0 2.885-1.3 2.885-2.884a2.89 2.89 0 0 0-2.244-2.805V18.53a4.468 4.468 0 0 0 2.925-1.733l3.355 2.063c-.12.316-.19.656-.19 1.012 0 1.585 1.3 2.884 2.884 2.884 1.585 0 2.885-1.3 2.885-2.884 0-1.585-1.3-2.885-2.885-2.885-.767 0-1.464.307-1.983.801l-3.445-2.113c.185-.49.3-1.02.3-1.572 0-.558-.114-1.09-.3-1.583l3.435-2.113c.52.5 1.22.811 1.993.811 1.585 0 2.885-1.3 2.885-2.885 0-1.585-1.3-2.884-2.885-2.884a2.895 2.895 0 0 0-2.884 2.884c0 .352.064.689.18 1.002l-3.345 2.063a4.474 4.474 0 0 0-2.925-1.722V5.689a2.89 2.89 0 0 0 2.244-2.804C15.385 1.3 14.085 0 12.5 0z"
                  />
                </svg>
              }
            />

            <Text h2 bold style={{ marginTop: "20px" }}>
              {(referralsData &&
                referralsData.leads &&
                referralsData.leads.allTime) ||
                0}
            </Text>
          </Container>
          <Separator margin="10px auto" small />
          <Text noMargin>Friends in Progress</Text>
        </Panel>
        <Panel small specialShadow center>
          <Container column>
            <Icon
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="#2479FF"
                    transform="translate(2 2)"
                  >
                    <path
                      strokeWidth="3"
                      d="M6 10.997L9.008 14l3.385-3.338L16 7"
                    />
                    <circle cx="11" cy="11" r="11" strokeWidth="2.5" />
                  </g>
                </svg>
              }
            />
            <Text h2 bold style={{ marginTop: "20px" }}>
              {(referralsData.contacts && referralsData.contacts.allTime) || 0}
            </Text>
          </Container>
          <Separator margin="10px auto" small />
          <Text noMargin>Friends Connected</Text>
        </Panel>
        <Panel small specialShadow center>
          <Container column>
            <Icon
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="27"
                  viewBox="0 0 16 27"
                >
                  <path
                    fill="#2479FF"
                    fillRule="nonzero"
                    stroke="#2479FF"
                    strokeWidth=".638"
                    d="M5.626.319L.442 15.88h4.653L2.132 25.73l13.152-14.61H9.458l6-10.8H5.626z"
                  />
                </svg>
              }
            />
            <Text h2 bold style={{ marginTop: "20px" }}>
              {(referralsData && referralsData.totalEarned) || 0}
            </Text>
          </Container>
          <Separator margin="10px auto" small />
          <Text noMargin>Total Earnings</Text>
        </Panel>
      </Section>
      <Section>
        <Text noMargin h3>
          Share Your Referral Link
        </Text>
        <Text noMargin>
          Let's make this city green, share your unique link and earn $50 per
          referral!
        </Text>
      </Section>
      <Section columns="2">
        <Image
          src="/static/images/share/share.png"
          alt=""
          bgColor="#fff"
          hasBorder
        />
        <Container column>
          <Button
            secondary
            transparent
            share="facebook"
            onClick={() => FacebookShare()}
          >
            Share on Facebook
          </Button>
          <Button
            secondary
            transparent
            share="twitter"
            onClick={() => TwitterShare()}
          >
            Share on Twitter
          </Button>
          <Button
            secondary
            transparent
            share="linkedin"
            onClick={() => LinkedinShare()}
          >
            Share on LinkedIn
          </Button>
        </Container>
      </Section>
      <Section>
        <SegmentedInput
          hasBorder
          inputLabel="Type your friends email here"
          buttonText="send"
        />
      </Section>
      <Section>
        <Panel>
          <Container column alignLeft>
            <Text h3 noMargin>
              Help us bring clean energy to your community
            </Text>
            <Text style={{ marginBottom: "20px" }}>
              Share the link below and earn $50 per referral!
            </Text>
          </Container>
          <UsersInAreaMap />
          <SegmentedInput
            buttonText="Copy Link"
            referral
            hasBorder
          ></SegmentedInput>
        </Panel>
      </Section>
      {referralsDetails && (
        <ReferralsTable data={referralsDetails}></ReferralsTable>
      )}
    </Main>
  );
}
