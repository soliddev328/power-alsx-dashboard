import React from "react";

export default class Progressbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="progress-wrapper">
          <progress max="100" value={this.props.completion} />
        </div>
        <p className="completion">
          <span className="highlight">{this.props.completion}% Full</span>
        </p>
        <style jsx>{`
          .wrapper {
            background-color: #2479ff;
            position: relative;
            padding: 16px 7%;
            margin-left: -7%;
            margin-right: -7%;
            opacity: 0;
            animation: fadeIn 400ms ease-in-out forwards;
            animation-delay: 0.5s;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }

          .progress-wrapper {
            width: 100%;
            border: 1px solid #fff;
            border-radius: 12px;
            background: rgba(54, 87, 180, 0.1);
          }
          progress {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: none;
            display: block;
            width: 100%;
            margin: 0;
            transition: 0.3s all linear;
            animation: expandWidth 3s ease-in-out forwards;
          }

          progress::-moz-progress-bar {
            border-radius: 12px;
          }

          @media screen and (-webkit-min-device-pixel-ratio: 0) {
            progress {
              height: 23px;
            }
          }

          progress::-webkit-progress-bar {
            border-radius: 8px;
            background: rgba(54, 87, 180, 0);
          }

          progress::-webkit-progress-value {
            border-radius: 8px;
            background: #fff;
          }

          .completion {
            position: relative;
            display: flex;
            justify-content: flex-end;
            color: #000;
            font-weight: 600;
            margin: 0;
          }

          .highlight {
            color: #fff;
            font-size: 1.2em;
            margin: 0 1em;
          }

          @keyframes expandWidth {
            from {
              width: 0;
            }
          }
        `}</style>
      </div>
    );
  }
}
