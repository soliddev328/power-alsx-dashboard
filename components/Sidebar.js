import React from "react"
import LogoIcon from "./Icons/LogoIcon"
import Menu from "../components/Menu"

export default function Header() {
  return (
    <div className="wrapper">
      <nav>
        <LogoIcon />
        <Menu />
      </nav>
      <style jsx>{`
          .wrapper {
            min-height: 100vh;
            width: 250px;
            background-color: #fff;
            border-right: 2px solid #41ef8b;
            padding: 48px 0;
          }
          nav {
            display: flex;
            flex-direction: column;
            padding: 0 2rem;
            margin: 0 auto;
          }
        `}</style>
    </div>
  )
}
