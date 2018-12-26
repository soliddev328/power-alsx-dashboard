import React from 'react';

export default class DiscountIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className="wrapper">
        <svg width="11" height="15" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.7434211 14.6473289c2.7375131 0 4.9565394-2.2078289 4.9565394-4.9307368 0-.8904342-.4732105-2.1494079-1.4240131-3.8368026a32.8803266 32.8803266 0 0 0-.8962763-1.4902237 48.74603348 48.74603348 0 0 0-1.5613027-2.300329 47.86874143 47.86874143 0 0 0-.659671-.8948157l-.0520921-.0681579-.1129474-.1465395c-.1441053-.1869474-.3563684-.1869474-.5004737 0l-.1129474.1460526-.0520921.0686448-.1450789.1923026c-.1626053.2176184-.3359211.4537368-.5145921.7025131a48.74595525 48.74595525 0 0 0-1.5613026 2.300329 32.88030508 32.88030508 0 0 0-.8962764 1.4897368C1.2600921 7.5671842.7868816 8.8261579.7868816 9.7165921c0 2.7229079 2.2190263 4.9307368 4.9565395 4.9307368zm-2.818329-5.0222631c0-.422579.3437105-.7643421.7672632-.7643421.4235526 0 .76775.3417631.76775.7643421.0009025.3638119.1463258.7123571.4042644.968926.2579385.256569.607253.4001346.9710645.3991003.4235526 0 .7672632.3417632.7672632.7638553s-.3437106.7643421-.7672632.7643421c-1.6070658 0-2.9103421-1.2964606-2.9103421-2.8967106v.0004869z"
            fill="#FFF"
            fillRule="nonzero"
            stroke="#FFF"
            strokeWidth=".5"
          />
        </svg>
        <style jsx>{`
          .wrapper {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 2.3rem;
            height: 2.3rem;
            margin: 0;
            background-color: var(--color-primary);
            font-weight: 700;
            border-radius: 50%;
            overflow: hidden;
            transition: all 300ms ease-in-out;
          }
        `}</style>
      </span>
    );
  }
}
