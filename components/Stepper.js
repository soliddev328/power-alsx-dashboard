import React from "react";

export default function Stepper({ children }) {
  return (
    <div className="steplist__wrapper">
      <ul className="steplist">{children}</ul>
      <style jsx>{`
        .steplist {
          display: flex;
          justify-content: center;
          font-size: 14px;
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          list-style: none;
          padding: 0;
          margin: 0;
          height: 2.5em;
        }

        .steplist__wrapper {
          margin: 2rem 0;
        }

        :global(.steplist__step) {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          flex: 0 0 auto;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          pointer-events: none;
          justify-content: center;
          width: 2.4em;
          height: 2.4em;
          line-height: 2.2em;
          margin: 0.65em 1em;
          background-color: #fff;
          color: #2479ff;
          font-weight: 700;
          font-feature-settings: "tnum";
          border: 2px solid #2479ff;
          border-radius: 50%;
          overflow: hidden;
          transition: all 300ms ease-in-out;
        }

        :global(.steplist__step-doing) {
          border-color: #41ef8b;
        }

        :global(.steplist__step-done) {
          color: #fff;
          background-color: #41ef8b;
          border-color: #41ef8b;
        }
      `}</style>
    </div>
  );
}
