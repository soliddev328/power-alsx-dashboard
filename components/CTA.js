import React from 'react';
import InfoIcon from './Icons/InfoIcon';

export default class CTA extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        onClick={this.props.onClick}
        type={this.props.type ? this.props.type : 'submit'}
      >
        <span>{this.props.children}</span>
        {this.props.info && this.props.info.length && (
          <InfoIcon content={this.props.info} />
        )}
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
            transition: all 350ms ease-in;
          }

          button {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.875rem;
            font-family: var(--font-primary);
            font-weight: 800;
            color: var(--color-font);
            margin: 1em 0;
            border-radius: 1px;
          }

          span {
            flex: 0 0 auto;
            padding: 0.3em;
            transition: all 350ms ease-in;
            box-shadow: inset 0 -2px 0 0 var(--color-primary);
          }

          button:hover span {
            color: var(--color-bg-primary);
            box-shadow: inset 0 -3em 0 0 var(--color-primary);
          }
        `}</style>
      </button>
    );
  }
}
