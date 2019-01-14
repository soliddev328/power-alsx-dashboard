import React from 'react';

export default class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <figure>
        <img src={this.props.image.src} alt={this.props.image.altText} />
        <style jsx>{`
          figure {
            display: flex;
            justify-content: center;
            border: 1px solid var(--color-primary);
            overflow: hidden;
            border-radius: 50%;
            width: 3.5rem;
            height: 3.5rem;
          }
          img {
            object-fit: cover;
            object-position: 0% 10%;
            max-width: 120%;
          }
        `}</style>
      </figure>
    );
  }
}
