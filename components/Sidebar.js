import React from "react"
import LogoIcon from "./Icons/LogoIcon"
import Menu from "../components/Menu"

export default class Header extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <nav>
          <LogoIcon />
          <Menu />
        </nav>
        <style jsx>{`
          .wrapper {
            position: relative;
            min-height: 100vh;
            width: 250px;
            background-color: #fff;
            border-right: 2px solid #41ef8b;
          }
          nav {
            display: flex;
            flex-direction: column;
            position: sticky;
            top: 0;
            padding: 0 2rem;
            margin: 0 auto;
          }
        `}</style>
      </div>
    )
  }
}
