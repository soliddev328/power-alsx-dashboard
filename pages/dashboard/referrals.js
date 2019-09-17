import Main from "../../components/Main";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Button from "../../components/Button";
import Separator from "../../components/Separator";
import Panel from "../../components/Panel";
import Text from "../../components/Text";
import Image from "../../components/Image";
import Icon from "../../components/Icon";
import SegmentedInput from "../../components/SegmentedInput";
import Table from "../../components/Table";
import UsersInAreaMap from "../../components/Dashboard/UsersInAreaMap";

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

export default function Referrals() {
  return (
    <Main>
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
              4
            </Text>
          </Container>
          <Separator margin="10px auto" small />
          <Text noMargin>Friends Referred</Text>
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
              230
            </Text>
          </Container>
          <Separator margin="10px auto" small />
          <Text noMargin>Friends Signed Up</Text>
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
              230
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
          Let's make this city green, share your unique link and earn $25 per
          referral!
        </Text>
        <SegmentedInput hasBorder inputLabel="send" buttonText="send" />
      </Section>
      <Section columns="2">
        <Image src="/static/images/share/share.png" alt="" />
        <Container column>
          <Button secondary share="facebook" onClick={() => FacebookShare()}>
            Share on Facebook
          </Button>
          <Button secondary share="twitter" onClick={() => TwitterShare()}>
            Share on Twitter
          </Button>
          <Button secondary share="linkedin" onClick={() => LinkedinShare()}>
            Share on LinkedIn
          </Button>
        </Container>
      </Section>
      <Section>
        <Text noMargin h3>
          Share Your Referral Link
        </Text>
        <Text noMargin>
          Let's make this city green, share your unique link and earn $25 per
          referral!
        </Text>
        <SegmentedInput hasBorder inputLabel="send" buttonText="send" />
      </Section>
      <Section>
        <Panel>
          <Container column alignLeft>
            <Text h3 noMargin>
              Help us bring clean energy to your community
            </Text>
            <Text style={{ marginBottom: "20px" }}>
              Share the link below and earn $25 per referral!
            </Text>
          </Container>
          <UsersInAreaMap />
          <SegmentedInput buttonText="Copy Link" hasBorder></SegmentedInput>
        </Panel>
      </Section>
      <Section>
        <Panel>
          <Text h3>Your referrals</Text>
          <Table
            data={[
              ["Jennifer Williams", "Status", "$15"],
              ["Jennifer Williams", "Status", "$15"],
              ["Jennifer Williams", "Status", "$15"],
              ["Jennifer Williams", "Status", "$15"]
            ]}
          />
        </Panel>
      </Section>
    </Main>
  );
}
