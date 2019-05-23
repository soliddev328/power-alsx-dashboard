import React from "react";

export default class ProfilePic extends React.Component {
  render() {
    return (
      <figure>
        <img src={this.props.image.src} alt={this.props.image.altText} />
        <style jsx>{`
          figure {
            display: flex;
            justify-content: center;
            border: 1px solid #2479ff;
            overflow: hidden;
            border-radius: 50%;
            width: 3.5rem;
            height: 3.5rem;
            background-image: url(${this.props.image.src});
            background-size: cover;
            background-position: 0% 10%;
          }
          img {
            object-fit: cover;
            object-position: 0% 10%;
            max-width: 110%;
          }

          @media all and (-ms-high-contrast: none) {
            *::-ms-backdrop,
            img {
              display: none;
            } /* IE11 */
          }
        `}</style>
      </figure>
    );
  }
}
