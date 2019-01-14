import React from 'react';
import Router from 'next/router';
import Header from '../components/Header';
import Button from '../components/Button';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import SunIcon from '../components/Icons/SunIcon';
import LeafIcon from '../components/Icons/LeafIcon';
import LightningIcon from '../components/Icons/LightningIcon';
import BagIcon from '../components/Icons/BagIcon';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAbleToSeeDashboard: ''
    };
  }

  componentDidMount() {
    let usercreated = '';
    let storedName = '';

    if (localStorage.getItem('usercreated')) {
      usercreated = localStorage.getItem('usercreated');
    }
    if (localStorage.getItem('username')) {
      storedName = JSON.parse(localStorage.getItem('username'));
    }

    this.setState({ isAbleToSeeDashboard: usercreated, name: storedName });
  }

  renderDashboard() {
    return (
      <main>
        <AppHeader />
        <section>
          <div className="user-data">
            <h2>
              Welcome{' '}
              {this.state.name && (
                <span className="highlight">
                  {this.state.name.firstName}{' '}
                  <svg
                    width="49px"
                    height="41px"
                    viewBox="0 0 49 41"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="square"
                    >
                      <g
                        id="01-dashboard-mobile"
                        transform="translate(-192.000000, -87.000000)"
                        stroke="#41EF8B"
                        strokeWidth="4"
                      >
                        <g
                          id="burst"
                          transform="translate(221.291499, 101.518692) scale(-1, 1) rotate(-35.000000) translate(-221.291499, -101.518692) translate(197.791499, 89.000000)"
                        >
                          <path
                            d="M22.9677322,0.219626168 L22.9677322,12.5309289"
                            id="Line-3"
                          />
                          <path
                            d="M34.7430452,7.46904606 L34.6664713,18.9201941"
                            id="Line-3-Copy"
                            transform="translate(34.704758, 13.194620) rotate(43.000000) translate(-34.704758, -13.194620) "
                          />
                          <path
                            d="M9.58463414,7.13720049 L9.50806023,18.5883485"
                            id="Line-3-Copy-2"
                            transform="translate(9.546347, 12.862775) scale(-1, 1) rotate(43.000000) translate(-9.546347, -12.862775) "
                          />
                          <path
                            d="M10.0582353,24.7496981 L0.0361764282,24.7496981"
                            id="Line-2"
                          />
                          <path
                            d="M46.9554315,24.7496981 L36.9333727,24.7496981"
                            id="Line-2-Copy"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              )}
            </h2>
          </div>
        </section>

        <section>
          <div className="pane">
            <h2>
              Hey {this.state.name.firstName} <span className="accent">!</span>
            </h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Doloribus minus cum iste cumque tempore natus et quo sapiente ut
              quae voluptate ipsam quidem atque, sequi temporibus fugit quos ex!
              Eveniet.
            </p>
          </div>
        </section>

        <section className="disabled">
          <h3 className="title">Impacts</h3>
          <Card title="678 kWh" content="Lifetime solar energy produced">
            <SunIcon />
          </Card>
          <Card title="500 lbs" content="CO2 Emissions prevented">
            <LeafIcon />
          </Card>
        </section>
        <section className="disabled">
          <h3 className="title">Savings</h3>
          <Card title="$13,000" content="Estimated lifetime savings">
            <LightningIcon />
          </Card>
          <Card title="$11,000" content="Lifetime referral earnings">
            <BagIcon />
          </Card>
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
            margin-top: 0;
          }

          .title {
            text-align: center;
          }

          .accent {
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
              pathname: '/'
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
