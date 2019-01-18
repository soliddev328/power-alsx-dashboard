import React from "react";
import Router from "next/router";
import Header from "../../components/Header";
import { FadeLoader } from "react-spinners";
import SingleStep from "../../components/SingleStep";

class Step8 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    global.analytics.page("Searching");
  }

  renderLoader() {
    setTimeout(() => {
      Router.push({
        pathname: "/onboarding/step4"
      });
    }, 3000);

    return (
      <SingleStep>
        <div className="loading">
          <FadeLoader
            className="spinner"
            height={15}
            width={4}
            radius={1}
            color={"#FF69A0"}
            loading={true}
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
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
        `}</style>
      </main>
    );
  }
}

export default Step8;
