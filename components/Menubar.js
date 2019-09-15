import React, { useState } from "react"
import cn from "classnames"
import LogoIcon from "./Icons/LogoIcon"
import Menu from "./Menu"

export default function MenuBar() {
  const [menuVisibility, toggleVisibility] = useState(false)

  return (
    <div className="wrapper">
      <nav className="desktop">
        <LogoIcon />
        <Menu />
      </nav>
      <nav className="mobile">
        <LogoIcon medium />

        {!menuVisibility && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            style={{
              position: "absolute",
              display: "inline-block",
              right: "30px",
              top: "50%",
              margin: "0",
              transform: "translateY(-50%)"
            }}
            onClick={() => toggleVisibility(!menuVisibility)}
          >
            <path
              fill="#2479FF"
              fill-rule="evenodd"
              d="M0 0v3.086h20V0H0zm0 7.457v3.086h20V7.457H0zm0 7.457V18h20v-3.086H0z"
            />
          </svg>
        )}
        {menuVisibility && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            style={{
              position: "absolute",
              display: "inline-block",
              right: "30px",
              top: "50%",
              margin: "0",
              transform: "translateY(-50%)"
            }}
            onClick={() => toggleVisibility(!menuVisibility)}
          >
            <path
              fill="#2479FF"
              fill-rule="evenodd"
              d="M18 2.34L15.658 0 8.999 6.658 2.341 0 0 2.341 6.658 9 0 15.659 2.341 18 9 11.342 15.658 18 18 15.659 11.341 9z"
            />
          </svg>
        )}

        <div className={cn("overlay", { visible: menuVisibility })}>
          <Menu />
        </div>
      </nav>
      <style jsx>{`
        .wrapper {
          min-height: 100vh;
          width: 250px;
          background-color: #fff;
          border-right: 2px solid #41ef8b;
          padding: 48px 0;
          position: relative;
        }
        nav.desktop {
          display: flex;
          flex-direction: column;
          padding: 0 2rem;
          margin: 0 auto;
          position: sticky;
          top: 48px;
        }

        nav.mobile {
          display: none;
          padding: 0;
          margin: 0 auto;
          position: fixed;
          height: 75px;
          width: 100vw;
          z-index: 1000;
          background: #fff;
          border-bottom: 2px solid #41ef8b;
        }

        .overlay {
          position: absolute;
          transform: translate(100%, 75px);
          transition: transform 400ms ease-in-out;
          background: #fff;
          padding: 0 20px;
          height: 100vh;
          width: 100vw;
        }

        .overlay.visible {
          transform: translate(0, 75px);
        }

        @media (max-width: 800px) {
          .wrapper {
            min-height: auto;
            height: 75px;
            width: 100vw;
            border-right: none;
            padding: 0;
          }
          nav.desktop {
            display: none;
          }
          nav.mobile {
            display: flex;
          }
        }
      `}</style>
    </div>
  )
}
