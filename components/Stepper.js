import React from "react";

export default class Stepper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="steplist__wrapper">
        <ul className="steplist">{this.props.children}</ul>
        <style jsx>{`
          .steplist {
            display: flex;
            justify-content: center;
            font-size: 14px;
            font-family: var(--font-primary);
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
            background-color: var(--color-bg-primary);
            color: var(--color-primary);
            font-weight: 700;
            font-feature-settings: "tnum";
            border: 2px solid var(--color-primary);
            border-radius: 50%;
            overflow: hidden;
            transition: all 300ms ease-in-out;
          }

          :global(.steplist__step-doing) {
            border-color: var(--color-secondary);
          }

          :global(.steplist__step-done) {
            color: #fff;
            background-color: var(--color-secondary);
            border-color: var(--color-secondary);
          }
        `}</style>
      </div>
    );
  }
}
