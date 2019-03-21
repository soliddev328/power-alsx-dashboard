import React from "react";
import Router from "next/router";

export default class BankCard extends React.Component {
  render() {
    return (
      <button
        onClick={() => {
          Router.push({
            pathname: "/onboarding/step13",
            query: {
              bankCode: this.props.code
            }
          });
        }}
      >
        <figure>
          <img src={this.props.image.src} alt={this.props.image.altText} />
        </figure>
        <style jsx>{`
          figure {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: ${this.props.largeIcon ? "1rem 0.5rem" : "1rem 1.5rem"};
            border-radius: 5px;
            margin: 0;
            background-color: ${this.props.accent};
            height: 80px;
            width: 145px;
            transition: box-shadow 300ms ease-in-out;
          }

          img {
            width: 70%;
          }

          button {
            border: none;
            background: none;
            appearance: none;
            cursor: pointer;
          }

          button:hover figure {
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
              0 10px 10px rgba(0, 0, 0, 0.22);
          }
        `}</style>
      </button>
    );
  }
}
