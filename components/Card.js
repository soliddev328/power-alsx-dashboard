import React from 'react';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="wrapper">
        {this.props.stepNumber && (
          <div className="step">{this.props.stepNumber}</div>
        )}
        {this.props.image && (
          <img
            src={this.props.image.src}
            srcSet={this.props.image.srcset}
            alt={this.props.image.alt}
          />
        )}
        {this.props.title && <h3>{this.props.title}</h3>}
        {this.props.content && <p>{this.props.content}</p>}
        <style jsx>{`
          .wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid var(--color-primary);
            border-radius: 3px;
            max-width: 290px;
            margin: 0 auto;
          }

          .step {
            display: block;
            width: 2.6rem;
            height: 2.6rem;
            line-height: 2.5rem;
            text-align: center;
            margin: 0.875em 1.5em;
            font-family: var(--font-primary);
            font-size: 1.31rem;
            font-weight: 700;
            font-feature-settings: 'tnum';
            border: 1px solid var(--color-primary);
            border-radius: 50%;
            color: var(--color-primary);
            transition: all 300ms ease-in-out;
          }

          h3 + p {
            margin-top: 0;
          }

          p {
            text-align: center;
            line-height: 1.87em;
            padding: 0 1.68em;
            margin-bottom: 2em;
          }
        `}</style>
      </div>
    );
  }
}
