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
          <span className="highlight">{this.props.completion}% Full</span>
        </p>
        <style jsx>{`
          .progress__wrapper {
            background-color: #2479ff;
            position: relative;
            padding: 16px 7%;
            margin-left: -7%;
            margin-right: -7%;
          }
          progress {
            display: block;
            width: 100%;
            border: 1px solid #fff;
            background: rgba(54, 87, 180, 0.1);
            border-radius: 12px;
            margin: 0;
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
            background: rgba(54, 87, 180, 0.1);
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
