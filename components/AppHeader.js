import React from "react";
import LogoIcon from "./Icons/LogoIcon";
import Menu from "../components/Menu";

export default class Header extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <header>
          <LogoIcon small />
          <Menu />
        </header>
        <style jsx>{`
          .wrapper {
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            background-color: #fff;
            border-bottom: 1px solid #41ef8b;
          }
          header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            z-index: 10000;
            max-width: 700px;
            padding: 0 2rem;
            margin: 0 auto;
          }
        `}</style>
      </div>
    );
  }
}
