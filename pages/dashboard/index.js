import React from "react"
import Router from "next/router"
import axios from "axios"
import Main from "../../components/Main"
import Container from "../../components/Container"
import Header from "../../components/Header"
import Button from "../../components/Button"
import Section from "../../components/Section"
import Panel from "../../components/Panel"
import Text from "../../components/Text"
import Separator from "../../components/Separator"
import Icon from "../../components/Icon"
import ProductionChart from "../../components/Dashboard/ProductionChart"
import UsersInAreaMap from "../../components/Dashboard/UsersInAreaMap"
import SegmentedInput from "../../components/SegmentedInput"

import CONSTANTS from "../../globals"

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        global.analytics.page("Dashboard")

        user.getIdToken(true).then(idToken => {
          axios
            .get(`${API}/v1/subscribers/${user.uid}`, {
              headers: {
                Authorization: idToken
              }
            })
            .then(data => {
              console.log("user data", data)
            })
            .catch(error => {
              console.error(error)
            })
        })
      } else {
        Router.push({
          pathname: "/"
        })
      }
    })
  }

  renderDashboard() {
    return (
      <Main>
        <Text h2 hasDecoration>
          Welcome user
        </Text>
        <Section columns="5">
          <span style={{ gridColumn: "1 / 4" }} className="desktop-only">
            <Text
              bold
              noMargin
              style={{ textAlign: "center", color: "#a8a8ba" }}
            >
              Your Impact
            </Text>
          </span>
          <span style={{ gridColumn: "4 / -1" }} className="desktop-only">
            <Text
              bold
              noMargin
              style={{ textAlign: "center", color: "#a8a8ba" }}
            >
              Your Savings
            </Text>
          </span>
          <span className="mobile-only">
            <Text
              bold
              noMargin
              style={{ textAlign: "center", color: "#a8a8ba" }}
            >
              Your Impact
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
                678 kWh
              </Text>
            </Container>
            <Separator margin="10px auto 25px auto" small />
            <Text noMargin>My energy</Text>
          </Panel>
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
                678 kWh
              </Text>
            </Container>
            <Separator margin="10px auto 25px auto" small />
            <Text noMargin>Clean Energy Generated</Text>
          </Panel>
          <Panel small specialShadow center>
            <Container column>
              <Icon
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="18"
                    viewBox="0 0 32 18"
                  >
                    <path
                      d="M24.9423006 8.75442c-.6876368.2539355-2.4589949.0178009-5.3154965-.7087673-1.7418473-.4355776-2.8678792-.6535481-3.3777402-.6535481-1.0545661 0-1.8783791.2121579-2.4710837.6357472-.141865.1213369-.2723525.2539356-.3911067.3996125v8.8096391c0 .2179705-.0711103.4057883-.213331.5634536-.1543094.1325987-.337774.199443-.5514605.199443-.213331 0-.3850624-.0668443-.5151943-.199443-.1543094-.1576653-.2311085-.3454831-.2311085-.5634536v-8.355534c-.3555516.0603051-.5987489.090821-.7288808.090821-1.4581172 0-2.6189932-.2056188-3.4844058-.6172197-.675548-.3149673-1.3276297-.8293775-1.9555338-1.5439573-.7228364-.9082103-1.3215853-1.6227901-1.7958911-2.1433762C3.176498 3.868249 1.87304586 3.0813756 0 2.3064907c3.045655-.774885 5.0900768-1.1628724 6.1332652-1.1628724 2.0387329 0 3.6326707.7025914 4.7821691 2.107411.4739503.5812545.9247897 1.4291596 1.3510961 2.5429886-.9006122-.8718818-1.9967778-1.3808428-3.2888524-1.5254299 1.0901212.4235893 2.3053966 1.2773069 3.644404 2.5607896.0359107.0239767.0711103.0544926.107021.090821.0117332-.0239768.0295108-.0417777.0529772-.0544926 2.2044199-2.2280213 4.492039-3.4511989 6.862146-3.6691693-2.4412173-.1696537-4.6577261.6357471-6.6484595 2.4158392.3079077-1.3557762.8529683-2.464156 1.6355374-3.3240494C15.9824002.7628966 17.8078021 0 20.1067988 0c1.3510961 0 2.6666371.2484863 3.9466228.7443691.8177687.3149673 1.8844235.8537176 3.1999645 1.6169775 1.3034522.7748849 2.287619 1.2892952 2.9510783 1.5439573.5927045.2299589 1.1914534.3872609 1.7955356.4719061-1.7660248 1.6108016-3.0157887 2.645798-3.7510694 3.1064422-1.0666548.7018649-2.1685093 1.1254541-3.30663 1.2707678z"
                      fill="#2479ff"
                      fillRule="evenodd"
                    />
                  </svg>
                }
              />
              <Text h2 bold style={{ marginTop: "20px" }}>
                500 lbs
              </Text>
            </Container>
            <Separator margin="10px auto 25px auto" small />
            <Text noMargin>CO2 Emissions Prevented</Text>
          </Panel>
          <span className="mobile-only">
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
                    width="16"
                    height="28"
                    viewBox="0 0 16 28"
                  >
                    <path
                      fill="#2479FF"
                      fillRule="nonzero"
                      stroke="#2479FF"
                      strokeWidth=".638"
                      d="M5.558.319L.438 16.126h4.594L2.11 26.11l12.982-14.83H9.337L15.26.32H5.558z"
                    />
                  </svg>
                }
              />
              <Text h2 bold style={{ marginTop: "20px" }}>
                $13,000
              </Text>
            </Container>
            <Separator margin="10px auto 25px auto" small />
            <Text noMargin>Estimated Lifetime Savings</Text>
          </Panel>
          <Panel small specialShadow center hasDecoration>
            <Container column>
              <Icon
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="32"
                    viewBox="0 0 25 32"
                  >
                    <path
                      fill="#2479FF"
                      fillRule="evenodd"
                      d="M17.148 8.246a37.44 37.44 0 0 1-4.847.296c-1.682 0-3.331-.1-4.847-.296C3.925 11.247 0 16.26 0 20.81c0 7.156 5.507 10.52 12.301 10.52 6.794 0 12.301-3.364 12.301-10.52 0-4.585-3.925-9.564-7.454-12.565zm-3.923 16.818v1.353a.26.26 0 0 1-.264.264h-1.32a.26.26 0 0 1-.264-.264v-1.32c-1.319-.098-2.407-1.12-2.539-2.439 0-.131.132-.264.265-.264h1.319c.131 0 .23.066.264.198.065.396.46.693.858.693h1.154c.693 0 1.319-.494 1.385-1.154.099-.79-.529-1.45-1.286-1.45h-.858c-1.615 0-3.067-1.188-3.232-2.837-.165-1.714 1.055-3.166 2.704-3.397v-1.319c0-.131.131-.264.264-.264h1.32c.13 0 .263.1.263.264v1.32c1.32.098 2.408 1.12 2.54 2.439a.26.26 0 0 1-.265.264h-1.319c-.1 0-.23-.066-.264-.198a.92.92 0 0 0-.89-.693h-1.154c-.693 0-1.286.494-1.385 1.154-.066.79.528 1.45 1.285 1.45h.99c1.847 0 3.297 1.55 3.1 3.43-.132 1.451-1.287 2.54-2.671 2.77zM12.3 6.597c1.583 0 3.1-.1 4.486-.264.923-1.979 1.748-3.991 1.748-4.881 0-1.32-1.683-2.012-2.672-.594C14.543 2.705 13.95 0 12.434 0c-1.517 0-2.308 2.507-3.496.824C7.849-.692 6.035.232 6.035 1.42c0 1.154.76 3.099 1.616 4.913a40.68 40.68 0 0 0 4.65.264z"
                    />
                  </svg>
                }
              />
              <Text h2 bold style={{ marginTop: "20px" }}>
                $11,000
              </Text>
            </Container>
            <Separator margin="10px auto 25px auto" small />
            <Text noMargin>Total Savings to Date</Text>
          </Panel>
        </Section>
        <Section>
          <Panel>
            <Container>
              <Text h3 style={{ marginBottom: "20px" }}>
                Production chart
              </Text>
            </Container>
            <ProductionChart />
          </Panel>
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
      </Main>
    )
  }

  render() {
    return this.renderDashboard()
  }
}

export default Dashboard
