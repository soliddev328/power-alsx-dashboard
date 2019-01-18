import React from "react";
import Router from "next/router";
import Header from "../../components/Header";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";

class Step8 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    global.analytics.page("Step 8");

    let storedPartialConnection = false;

    if (localStorage.getItem("partialConnection")) {
      storedPartialConnection = localStorage.getItem("partialConnection");
    }

    this.setState({
      partialConnection: storedPartialConnection
    });
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep>
          <div className="loading">
            {this.state && this.state.partialConnection ? (
              <p className="message">
                We are connecting your account and will contact you if we need
                more information
              </p>
            ) : (
              <React.Fragment>
                <svg width="55" height="55" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <circle cx="27.5" cy="27.5" r="27.5" fill="#41EF8B" />
                    <path
                      d="M32.9977909 21.3976621c1.6389735-1.6389735 4.2050581.8556542 2.494699 2.494699l-10.262155 10.333588c-.712883.6414974-1.7817447.6414974-2.494699 0l-5.1310774-5.2025105c-1.6389731-1.6389736.8556542-4.1336251 2.4946989-2.494699l3.9195632 3.9195632 8.9789703-9.0506407z"
                      fill="#FFF"
                    />
                  </g>
                </svg>
                <h3>Congratulations, you're connected!</h3>
              </React.Fragment>
            )}
          </div>
          <Button
            primary
            onClick={() => {
              Router.push({
                pathname: "/onboarding/step9"
              });
            }}
          >
            Next
          </Button>
        </SingleStep>
        <style jsx>{`
          main {
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
          .loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .message {
            text-align: center;
          }
          h3 {
            text-align: center;
          }
        `}</style>
      </main>
    );
  }
}

export default Step8;
