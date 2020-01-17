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
import UsersInAreaMap from "../../components/Dashboard/UsersInAreaMap";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const FacebookShare = username => {
  // FB.ui({
  //   method: "share",
  //   href: "https://www.commonenergy.us"
  // });
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=https%3A//www.commonenergy.us/referrals?advocate=${username}`,
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,width=800,height=600"
  );
};

const TwitterShare = username => {
  window.open(
    `https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.commonenergy.us%2Freferrals?advocate=${username}`,
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,width=800,height=600"
  );
};

const LinkedinShare = username => {
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.commonenergy.us%2Freferrals?advocate=${username}`,
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,width=800,height=600"
  );
};

const getUserData = async (userUid, idToken) => {
  const { data } = await axios.get(`${API}/v1/subscribers/${userUid}`, {
    headers: {
      Authorization: idToken
    }
  });
  return data && data.data;
};

const getReferralsData = async (username, idToken) => {
  const { data } = await axios.get(
    `${API}/v1/subscribers/referrals/${username}`,
    {
      headers: {
        Authorization: idToken
      }
    }
  );
  return data && data.data;
};

const getReferralsDataDetails = async (username, idToken) => {
  const { data } = await axios.get(
    `${API}/v1/subscribers/referrals/details/${username}`,
    {
      headers: {
        Authorization: idToken
      }
    }
  );

  return data && data.data && data.data[0];
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
          if (userInfo) {
            setUserData(userInfo);

            const referralsInfo = await getReferralsData(
              userInfo.username,
              idToken
            );

            referralsInfo
              ? setReferralsData(referralsInfo[0])
              : setReferralsData({});

            const referralsInfoDetails = await getReferralsDataDetails(
              userInfo.username,
              idToken
            );

            setReferralsDetails(referralsInfoDetails);

            setIsLoading(false);
          }
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
      <Text noMargin>
        Common Energy’s referral program enables you increase your impact and
        your savings. When you refer a friend, both you and they will receive a{" "}
        <b>$50 gift card.</b> That's a combined $100 for spreading the word.
        <b> Refer 10 people and receive $1,000!</b>
      </Text>
      <Section columns="4">
        <Panel small specialShadow center>
          <Container column>
            <Icon
              icon={
                <svg
                  height="28"
                  viewBox="0 0 33 28"
                  width="33"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m11.515 4.746c0-1.259.501-2.466 1.39-3.356a4.75 4.75 0 0 1 6.713 0 4.75 4.75 0 0 1 0 6.713 4.75 4.75 0 0 1 -6.713 0 4.75 4.75 0 0 1 -1.39-3.357zm15.246 4.808a4.02 4.02 0 1 0 -2.832-1.172 4.023 4.023 0 0 0 2.847 1.172zm-21.013-8.035a4.017 4.017 0 0 0 -3.715 2.474 4.018 4.018 0 1 0 6.56-1.287 4.018 4.018 0 0 0 -2.845-1.187zm21.028 9.966a6.943 6.943 0 0 0 -3.212.716 8 8 0 0 1 .915 1.312c1.682 3.049.935 7.581.03 10.824h6.307s2.943-6.978 1.103-10.28c-1.484-2.674-4.772-2.572-5.143-2.572zm-21.028 0c-.371 0-3.66-.102-5.143 2.571-1.84 3.303 1.103 10.306 1.103 10.306h6.306c-.904-3.242-1.651-7.795.03-10.824.261-.466.568-.906.916-1.31a6.943 6.943 0 0 0 -3.212-.743zm10.514-.203c-.463 0-4.574-.127-6.439 3.221-1.82 3.268.102 9.417.981 11.846a1.57 1.57 0 0 0 1.474 1.017h7.968a1.57 1.57 0 0 0 1.474-1.017c.879-2.429 2.8-8.593.98-11.846-1.865-3.353-5.976-3.221-6.438-3.221z"
                    fill="#0080f9"
                    fillRule="evenodd"
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
              ${(referralsData && referralsData.totalEarned) || 0}
            </Text>
          </Container>
          <Separator margin="10px auto" small />
          <Text noMargin>Total Earnings</Text>
        </Panel>
      </Section>
      <Text h2>Invite Friends and Save Even More</Text>
      <Text noMargin>
        Spreading the word about Common Energy is easy! Use the links below to
        email your friends and family and share on social media.
      </Text>
      <Section>
        <Panel>
          <Container>
            <SegmentedInput
              hasBorder
              inputLabel="Enter Your Friends' Email Addresses Here"
              buttonText="send"
            />
            <Button
              maxWidth="65px"
              style={{
                height: "50px"
              }}
              secondary
              transparent
              share="facebook"
              onClick={() => {
                FacebookShare(userData.username);
                global.analytics.track("Referral Link Clicked", {
                  Platform: "Facebook"
                });
              }}
            />
            <Button
              maxWidth="65px"
              style={{
                height: "50px"
              }}
              secondary
              transparent
              share="twitter"
              onClick={() => {
                TwitterShare(userData.username);
                global.analytics.track("Referral Link Clicked", {
                  Platform: "Twitter"
                });
              }}
            />
            <SegmentedInput
              buttonText="Copy Referral Link"
              referral
              hasBorder
            />
          </Container>
        </Panel>
      </Section>
      {referralsDetails && (
        <ReferralsTable data={referralsDetails}></ReferralsTable>
      )}
    </Main>
  );
}
