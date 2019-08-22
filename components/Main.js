import React from "react"
import LogoIcon from "./Icons/LogoIcon"
import Menu from "../components/Menu"
import Sidebar from "../components/Sidebar"

export default function Main({ children }) {
  return (
    <main>
      <Sidebar />
      <div className="content">{children}</div>
      <style jsx>{`
        main {
          display: grid;
          grid-template-areas: "sidebar content";
          grid-template-columns: 250px 1fr;
          overflow: hidden;
        }

        .content {
          padding: 40px 70px;
          max-width: 1050px;
          margin: 0;
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
      `}</style>
    </main>
  )
}
