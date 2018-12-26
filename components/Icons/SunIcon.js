import React from 'react';

export default class SunIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className="wrapper">
        <svg
          width="29"
          height="29"
          viewBox="0 0 29 29"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="var(--color-primary)"
            fillRule="nonzero"
            stroke="var(--color-primary)"
            strokeWidth=".63750002"
          >
            <path d="M14.5 8.82541668c-3.1428481 0-5.67458332 2.53173522-5.67458332 5.67458332S11.3571519 20.1745833 14.5 20.1745833 20.1745833 17.6428481 20.1745833 14.5 17.6428481 8.82541668 14.5 8.82541668zM13.8520833.51208334h1.29583332v5.54916665H13.8520833zM13.8520833 22.93875h1.29583332v5.54916665H13.8520833zM22.93875 13.8520833h5.54916665v1.29583332H22.93875zM.51208334 13.8520833h5.54916665v1.29583332H.51208334zM24.84722138 23.93036767l-3.9238114-3.9238114-.91627943.91627943 3.9238114 3.9238114.91627943-.91627943zM9.0050491 8.072298L5.0812377 4.14848658l-.91627942.91627942L8.0887697 8.98857742 9.0050491 8.072298zM8.99711642 20.91487116l-.91627944-.91627944-3.92381141 3.92381142.91627943.91627943 3.92381142-3.92381141zM24.85515483 5.07273221l-.91627941-.9162794-3.9238114 3.9238114.9162794.9162794 3.9238114-3.9238114z" />
          </g>
        </svg>
        <style jsx>{`
          .wrapper {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            position: relative;
            margin: 0 5px;
            overflow: hidden;
            transition: all 300ms ease-in-out;
          }
        `}</style>
      </span>
    );
  }
}
