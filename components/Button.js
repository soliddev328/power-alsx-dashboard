import React from 'react';
import ArrowIcon from './Icons/ArrowIcon';
import FacebookIcon from './Icons/FacebookIcon';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  shareIcon() {
    if (this.props.share == 'facebook') return <FacebookIcon />;
  }

  render() {
    return (
      <button
        type={this.props.type ? this.props.type : 'submit'}
        onClick={this.props.onClick}
        className={this.props.share ? 'share' : ''}
        disabled={this.props.disabled}
      >
        {this.props.share && this.shareIcon()}
        {this.props.children}
        {this.props.arrow && <ArrowIcon />}
        <style jsx>{`
          /* Reset */
          button {
            border: none;
            margin: 0;
            padding: 0;
            width: 100%;
            overflow: visible;
            background: transparent;
            color: inherit;
            font: inherit;
            line-height: normal;
            cursor: pointer;
            transition: all 200ms ease-in-out;
            user-select: none;
          }

          button {
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 350px;
            font-size: 0.875rem;
            font-family: var(--font-primary);
            font-weight: 800;
            color: ${this.props.primary
              ? 'var(--color-bg-primary)'
              : 'var(--color-primary)'};
            background-color: ${this.props.primary
              ? 'var(--color-primary)'
              : 'var(--color-bg-primary)'};
            border: ${this.props.primary
              ? 'none'
              : '1px solid var(--color-primary)'};
            padding: 1.15em 0;
            border-radius: 1px;
            margin: 1em auto;
          }

          button.share {
            margin: 3em auto;
            margin-bottom: 1.5em;
          }

          button[disabled] {
            cursor: not-allowed;
            filter: grayscale(1);
            opacity: 0.4;
          }

          button:not([disabled]):hover {
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
              0 10px 10px rgba(0, 0, 0, 0.22);
          }
        `}</style>
      </button>
    );
  }
}
