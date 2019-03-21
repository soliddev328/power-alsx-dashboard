import React from "react";

export default class DiscountIcon extends React.Component {
  render() {
    return (
      <span className="wrapper">
        <svg
          width="15px"
          height="16px"
          viewBox="0 0 15 16"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            stroke="none"
            strokeWidth="1"
            fill="#FFFFFF"
            fillRule="nonzero"
            d="M9.38857895,4.79242105 L11.8236316,3.57491053 C12.4533632,3.25973684 12.5890579,2.42030526 12.0913105,1.92254211 L10.6283211,0.45955263 C10.0719947,-0.09677368 9.12276316,0.14932105 8.90632105,0.90547895 L7.79674737,4.79237368 L7.26508421,4.79237368 L6.15551053,0.90547895 C5.93902105,0.14930526 4.98980526,-0.09678947 4.43351053,0.45955263 L2.97052105,1.92254211 C2.47278947,2.42027368 2.60846842,3.25972105 3.2382,3.57491053 L5.67325263,4.79242105 L0.10067353,4.79242105 L0.10067353,6.65021053 L14.9612526,6.65021053 L14.9612526,4.79242105 L9.38857895,4.79242105 Z M1.02939474,15.0093155 L6.60197368,15.0093155 L6.60197368,7.57894737 L1.02939474,7.57894737 L1.02939474,15.0093155 Z M8.45968421,15.0093155 L14.0322632,15.0093155 L14.0322632,7.57894737 L8.45968421,7.57894737 L8.45968421,15.0093155 Z"
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
