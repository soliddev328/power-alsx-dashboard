import React from "react";
import axios from "axios";
import cn from "classnames";
import { FadeLoader } from "react-spinners";
import LogoIcon from "./Icons/LogoIcon";
import Menu from "../components/Menu";
import Menubar from "./Menubar";
import CONSTANTS from "../globals";
import { runInThisContext } from "vm";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

export const MainContext = React.createContext();

class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userData: null
    };

    this.renderChildren = this.renderChildren.bind(this);
    this.renderLoader = this.renderLoader.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(idToken => {
          axios
            .get(`${API}/v1/subscribers/${user.uid}`, {
              headers: {
                Authorization: idToken
              }
            })
            .then(response => {
              this.setState({ userData: response.data.data });
            });
        });
      }
    });
  }

  renderLoader() {
    return (
      <div className="wrapper">
        <FadeLoader
          className="spinner"
          height={15}
          width={4}
          radius={1}
          color={"#FF69A0"}
          loading
        />
        <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }

  renderChildren(information) {
    const { children } = this.props;
    return (
      <MainContext.Provider value={{ data: information }}>
        {children}
      </MainContext.Provider>
    );
  }

  render() {
    return (
      <main>
        <Menubar />
        <div className={cn("content", { loading: !this.state.userData })}>
          {this.state.userData
            ? this.renderChildren(this.state.userData)
            : this.renderLoader()}
        </div>
        <style jsx>{`
          main {
            display: grid;
            grid-template-columns: 250px 1fr;
          }
          .content {
            padding: 40px 70px;
            max-width: 1200px;
            margin: 0;
            overflow-x: hidden;
            user-select: text;
          }

          .content:not(.loading) {
            transform: translateX(10px);
            opacity: 0;
            animation: fadeInFromRight 400ms ease-in-out forwards;
            animation-delay: 200ms;
          }

          @keyframes fadeInFromRight {
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @media (max-width: 800px) {
            main {
              grid-template-columns: 1fr;
              overflow-x: hidden;
            }
            .content {
              padding: 0 20px;
              padding-top: 40px;
            }
          }
        `}</style>
      </main>
    );
  }
}

export default Main;
