import React from "react";

export default class Progressbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="progress__wrapper">
        <progress max="100" value={this.props.completion} />
        <p className="completion">
          <span>Percentage of Completion </span>
          <span className="highlight">{this.props.completion}%</span>
        </p>
        <style jsx>{`
          progress {
            display: block;
            margin: 1em 0;
            width: 100%;
            border: none;
            background: rgba(54, 87, 180, 0.1);
            border-radius: 8px;
            position: relative;
          }

          progress:after {
            content: "";
            width: 14px;
            height: 14px;
            display: block;
            background-color: #2479ff;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -55%);
            left: ${this.props.completion}%;
            transition: left 0.8s ease-in-out;
            animation: translate 0.8s ease-in-out forwards;
          }

          progress::-moz-progress-bar {
            border-radius: 8px;
          }

          @media screen and (-webkit-min-device-pixel-ratio: 0) {
            progress {
              height: 5px;
            }
          }

          progress::-webkit-progress-bar {
            border-radius: 8px;
            background: rgba(54, 87, 180, 0.1);
          }

          progress::-webkit-progress-value {
            border-radius: 8px;
            background: #2479ff;
            transition: all 0.8s ease-in-out;
            width: 0;
            animation: expandWidth 0.8s ease-in-out forwards;
          }

          .completion {
            display: flex;
            color: #000;
            font-weight: 600;
            justify-content: space-between;
          }

          .highlight {
            color: #2479ff;
            font-size: 1.2em;
          }

          @keyframes expandWidth {
            from {
              width: 0;
            }
          }

          @keyframes translate {
            from {
              left: 0;
            }
          }
        `}</style>
      </div>
    );
  }
}
