import React from "react";

export default class Separator extends React.Component {
  render() {
    return (
      <div className="separator__wrapper">
        <p>{this.props.text}</p>
        <style jsx>{`
          .separator__wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 3rem 0;
            height: 1px;
            background-color: var(--color-secondary);
          }

          p {
            display: inline-block;
            margin: 0;
            padding: 0 20px;
            background-color: var(--color-bg-secondary);
          }
        `}</style>
      </div>
    );
  }
}
