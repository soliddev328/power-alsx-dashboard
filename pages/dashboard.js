import React from "react";
import Router from "next/router";
import Header from "../components/Header";
import Button from "../components/Button";
import AppHeader from "../components/AppHeader";
import Card from "../components/Card";
import SunIcon from "../components/Icons/SunIcon";
import LeafIcon from "../components/Icons/LeafIcon";
import LightningIcon from "../components/Icons/LightningIcon";
import BagIcon from "../components/Icons/BagIcon";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAbleToSeeDashboard: ""
    };
  }

  componentDidMount() {
    global.analytics.page("Dashboard");

    let usercreated = "";
    let storedName = "";

    if (localStorage.getItem("usercreated")) {
      usercreated = localStorage.getItem("usercreated");
    }
    if (localStorage.getItem("username")) {
      storedName = JSON.parse(localStorage.getItem("username"));
    }

    this.setState({ isAbleToSeeDashboard: usercreated, name: storedName });
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
              We’re delighted to have you as a customer and to provide you with
              100% clean, lower cost Electricity.
            </p>
            <p>The connection process will take 4-8 weeks.</p>
            <p>Here’s what happens next:</p>
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
            background-color: var(--color-bg-primary);
            border: 1px solid var(--color-primary);
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
            color: var(--color-secondary);
          }

          .highlight {
            color: var(--color-primary);
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
      : this.renderError();
  }
}

export default Dashboard;
