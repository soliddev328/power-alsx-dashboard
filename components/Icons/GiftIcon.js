import React from 'react';

export default class DiscountIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className="wrapper">
        <svg width="37" height="37" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#FFF"
            d="M20.38857895 15.79242105l2.43505265-1.21751052c.6297316-.31517369.7654263-1.15460527.2676789-1.65236842l-1.4629894-1.46298948c-.5563264-.55632631-1.50555794-.31023158-1.72200005.44592632l-1.10957368 3.88689473h-.53166316l-1.10957368-3.88689473c-.21648948-.75617369-1.16570527-1.00226842-1.722-.44592632l-1.46298948 1.46298948c-.49773158.49773157-.36205263 1.33717894.26767895 1.65236842l2.43505263 1.21751052h-5.5725791v1.85778948H25.9612526v-1.85778948h-5.57267365zM12.02939474 26.0093155h5.57257894v-7.43036813h-5.57257894zM19.45968421 26.0093155h5.57257899v-7.43036813h-5.57257899z"
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
