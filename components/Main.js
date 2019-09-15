import React from "react"
import LogoIcon from "./Icons/LogoIcon"
import Menu from "../components/Menu"
import Menubar from "./Menubar"

export default function Main({ children }) {
  return (
    <main>
      <Menubar />
      <div className="content">{children}</div>
      <style jsx>{`
        main {
          display: grid;
          grid-template-columns: 250px 1fr;
          overflow-x: hidden;
        }

        .content {
          padding: 40px 70px;
          max-width: 1200px;
          margin: 0;
          transform: translateX(10px);
          opacity: 0;
          animation: fadeInFromRight 400ms ease-in-out forwards;
          animation-delay: 200ms;
          overflow-x: hidden;
          user-select: text;
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
          }
          .content {
            padding: 0 20px;
            padding-top: 40px;
          }
        }
      `}</style>
    </main>
  )
}
