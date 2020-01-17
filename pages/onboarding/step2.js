import React from "react";
import Router from "next/router";
import axios from "axios";
import Header from "../../components/Header";
import Text from "../../components/Text";
import BulletItem from "../../components/BulletItem";
import Progressbar from "../../components/Progressbar";
import SingleStep from "../../components/SingleStep";
import NY from "../../components/States/NY";
import MD from "../../components/States/MD";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      utility: {
        project: {
          imageUrl: "/static/images/illustrations/t&c.png",
          name: "",
          completion: ""
        },
        billingMethod: ""
      }
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    global.analytics.page("Step 2");

    this.getData();
  }

  getData() {
    let utility = "";
    let state = "";
    let storedBillingMethod = "";

    if (localStorage.getItem("utility")) {
      utility = JSON.parse(localStorage.getItem("utility"));
    }

    if (localStorage.getItem("state")) {
      state = localStorage.getItem("state");
    }

    if (localStorage.getItem("billingMethod")) {
      storedBillingMethod = JSON.parse(localStorage.getItem("billingMethod"));
    }

    const rawParams = {
      state: state,
      utility: encodeURIComponent(utility.label)
    };

    const generatedParams = Object.entries(rawParams)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    return axios(`${API}/v1/utilities?${generatedParams}`)
      .then(response => {
        const data = response?.data?.data[0];
        this.setState({
          utility: {
            project: {
              imageUrl:
                data?.projects[0]?.imageUrl ||
                "/static/images/illustrations/t&c.png",
              name: data?.projects[0]?.displayName || false,
              state: data?.projects[0]?.state || false,
              completion: data?.projects[0]?.completion || false
            },
            billingMethod: storedBillingMethod
          }
        });
      })
      .catch(error => console.log(error));
  }

  renderState() {
    const { utility } = this.state;
    const { state, name } = utility?.project;

    switch (state) {
      case "NY":
        return <NY project={name} />;
        break;
      case "MD":
        return <MD project={name} />;
        break;

      default:
        return <NY project={name} />;
        break;
    }
  }

  render() {
    const { utility } = this.state;
    const { imageUrl, completion, name, state } = utility?.project;
    const projectAvailable = !!utility?.project?.name;

    return (
      <main>
        <Header />
        <SingleStep
          title={
            projectAvailable
              ? "Great news, we've got a clean energy project in your area!"
              : "Great news, we're building a project in your area!"
          }
          wide
        >
          <div className="content">
            {projectAvailable ? (
              <aside>
                <figure>
                  <img src={imageUrl} alt="" />
                  <figcaption>
                    {name}, {state}
                  </figcaption>
                  <div className="state-graphic">{this.renderState()}</div>
                </figure>
                {completion && <Progressbar completion={completion} />}
              </aside>
            ) : (
              <aside className="no-project">
                <figure>
                  <img src={imageUrl} alt="" />
                  <div className="state-graphic">{this.renderState()}</div>
                </figure>
                <Text
                  style={{
                    margin: "75px 20px 0 20px",
                    fontSize: "14px",
                    textAlign: "center"
                  }}
                >
                  Bring more clean energy to your community and save
                </Text>
              </aside>
            )}
            <aside>
              <h3>5 Reasons to Sign Up</h3>
              <div className="items">
                <BulletItem
                  content="State program with guaranteed saving"
                  bulletIcon="check"
                />
                <BulletItem
                  content="Save $5-20 per month for up to 20 years"
                  bulletIcon="check"
                />
                <BulletItem
                  content="Lower pollution in your community"
                  bulletIcon="check"
                />
                <BulletItem content="Free to enroll" bulletIcon="check" />
                <BulletItem
                  content="No impact on your electricity supply"
                  bulletIcon="check"
                />
              </div>
            </aside>
          </div>
          <Button
            primary
            onClick={() => {
              if (utility.billingMethod.indexOf("paper") >= 0) {
                Router.push({
                  pathname: "/onboarding/step4"
                });
              } else {
                Router.push({
                  pathname: "/onboarding/step3"
                });
              }
            }}
          >
            Next
          </Button>
        </SingleStep>
        <style jsx>{`
          main {
            display: block;
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }

          .content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            height: 375px;
            margin: 50px 0;
          }

          .content aside {
            overflow: hidden;
          }

          .content aside.no-project {
            position: relative;
            background-color: #fff;
          }

          .content aside.no-project figure:before {
            content: "";
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.7);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
          }

          .content aside:last-child {
            padding: 40px;
            background-color: #f3f3f4;
          }

          .disclaimer {
            text-align: center;
            font-size: 0.8rem;
            margin-top: 0;
          }

          :global(.checkbox__label) {
            margin-top: 0;
          }

          .disclaimer {
            text-align: center;
          }

          figure {
            max-width: 100%;
            height: 190px;
            margin: 0;
            background-color: transparent;
            display: flex;
            position: relative;
          }

          figcaption {
            position: absolute;
            left: 40px;
            bottom: 20px;
            color: #fff;
            font-size: 16px;
            font-weight: 500;
            line-height: 1.63;
            letter-spacing: 0.5px;
          }

          .state-graphic {
            position: absolute;
            width: 150px;
            right: 20px;
            bottom: -20%;
            z-index: 100;
          }

          img {
            max-width: 100%;
            object-fit: cover;
            object-position: top;
            opacity: 0;
            animation: fadeIn 400ms ease-in-out forwards;
            animation-delay: 0.4s;
          }

          .items {
            margin-top: 20px;
            opacity: 0;
            animation: fadeIn 400ms ease-in-out forwards;
            animation-delay: 0.6s;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }

          @media (max-width: 1000px) {
            .content {
              display: grid;
              grid-template-columns: 1fr;
              height: auto;
              max-width: 375px;
              margin: 20px auto;
            }
            .content aside:last-child {
              padding: 30px;
            }
          }
        `}</style>
      </main>
    );
  }
}

export default Step2;
