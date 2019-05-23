import React from "react";
import Router from "next/router";
import Header from "../components/Header";
import Button from "../components/Button";
import AppHeader from "../components/AppHeader";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAbleToSeeDashboard: ""
    };
  }

  componentDidMount() {
    window.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        global.analytics.page("Dashboard");

        let usercreated = "";
        let storedName = "";

        if (window.localStorage.getItem("usercreated")) {
          usercreated = window.localStorage.getItem("usercreated");
        }
        if (window.localStorage.getItem("username")) {
          storedName = JSON.parse(window.localStorage.getItem("username"));
        }

        this.setState({ isAbleToSeeDashboard: usercreated, name: storedName });
      } else {
        Router.push({
          pathname: "/"
        });
      }
    });
  }

  renderDashboard() {
    return (
      <main>
        <AppHeader />

        <section>
          <div className="pane">
            <h2>
              Welcome to Common Energy<span className="accent">!</span>
            </h2>
            <p>
              We're delighted to have you as a customer and to provide you with
              100% clean, lower cost Electricity.
            </p>
            <p>
              The connection timing will vary by location and utility. In some
              cases, Common Energy can connect you to a project in as little as
              2 - 4 weeks. In other cases, your enrollment will literally help
              build a new clean energy project, which may take a couple months.
              We will keep you posted along the way!
            </p>
            <p>Here's what happens next:</p>
            <ul>
              <li>
                Common Energy will configure your electricity account to receive
                clean energy
              </li>
              <li>
                Common Energy will connect your account to a lower cost, clean
                energy source
              </li>
              <li>
                This energy will show up as a credit on your account, lowering
                your energy cost
              </li>
              <li>
                Common will send you one, unified monthly statement showing you
                your savings and impact!
              </li>
            </ul>
          </div>
        </section>

        <style jsx>{`
          main {
            display: block;
            max-width: 700px;
            margin: 0 auto;
            margin-top: 100px;
            padding: 0 2rem;
          }

          section {
            margin: 2rem 0;
            overflow: hidden;
          }

          section.disabled {
            filter: opacity(0.4);
            user-select: none;
            pointer-events: none;
          }

          .user-data {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .user-data h2 {
            font-size: 1.6rem;
          }

          .pane {
            background-color: #fff;
            border: 1px solid #2479ff;
            border-radius: 3px;
            padding: 1rem;
          }

          .pane h2 {
            text-align: center;
            margin-top: 0;
          }

          .pane ul {
            font-size: 14px;
            color: #555e80;
          }

          .pane ul li {
            margin-bottom: 5px;
          }

          .title {
            text-align: center;
          }

          .accent {
            padding: 0;
            color: #41ef8b;
          }

          .highlight {
            color: #2479ff;
            position: relative;
          }

          .highlight svg {
            position: absolute;
            right: 0;
            top: 0;
            transform: translate(40%, -15%) scale(0.8);
          }
        `}</style>
      </main>
    );
  }

  renderError() {
    return (
      <main>
        <Header />
        <h3>Sorry you're not allowed to see the dashboard yet</h3>
        <p>In order to see the dashboard please sign up</p>
        <Button
          primary
          onClick={() => {
            Router.push({
              pathname: "/"
            });
          }}
        >
          Sign up
        </Button>
        <style jsx>{`
          main {
            display: block;
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
            text-align: center;
          }
        `}</style>
      </main>
    );
  }

  render() {
    return this.state.isAbleToSeeDashboard
      ? this.renderDashboard()
      : () => {
          Router.push({
            pathname: "/"
          });
        };
  }
}

export default Dashboard;
