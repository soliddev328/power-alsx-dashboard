import React from "react";
import Router from "next/router";
import Header from "../../components/Header";
import { FadeLoader } from "react-spinners";
import SingleStep from "../../components/SingleStep";

class Searching extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    global.analytics.page("Searching");
  }

  renderLoader() {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        Router.push({
          pathname: "/onboarding/step2"
        });
      }, 2000);
    }

    return (
      <SingleStep>
        <div className="loading">
          <FadeLoader
            className="spinner"
            height={15}
            width={4}
            radius={1}
            color={"#FF69A0"}
            loading
          />
          <p>Searching for clean energy projects in your area...</p>
        </div>
        <style jsx>{`
          .loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .loading p {
            font-size: 1rem;
            text-align: center;
          }

          p.suffix {
            font-size: 0.8rem;
          }
        `}</style>
      </SingleStep>
    );
  }

  render() {
    return (
      <main>
        <Header />
        {this.renderLoader()}
        <style jsx>{`
          main {
            display: block;
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
        `}</style>
      </main>
    );
  }
}

export default Searching;
