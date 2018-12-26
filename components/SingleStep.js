import React, { Fragment } from 'react';
import Input from './Input';
import Highlight from './Highlight';

export default class SingleStep extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPrefix() {
    return this.props.highlight ? (
      <Highlight
        className="prefix"
        content={this.props.prefix}
        highlight={this.props.highlight}
      />
    ) : (
      <p className="prefix">{this.props.prefix}</p>
    );
  }

  renderSuffix() {
    return this.props.highlight ? (
      <Highlight
        className="suffix"
        content={this.props.suffix}
        highlight={this.props.highlight}
      />
    ) : (
      <p className="suffix">{this.props.suffix}</p>
    );
  }

  render() {
    return (
      <Fragment>
        {this.props.title && <p className="title">{this.props.title}</p>}
        {this.props.prefix && this.renderPrefix()}
        {this.props.children}
        {this.props.suffix && this.renderSuffix()}
        <style jsx>{`
          p {
            font-size: 1.1rem;
            text-align: center;
            font-weight: 700;
            line-height: 1.44;
          }
          p.title {
            margin-bottom: 1.5em;
          }
          p.prefix,
          p.suffix {
            text-align: center;
            font-size: 1rem;
            opacity: 0.5;
            font-weight: 400;
          }
        `}</style>
        <style jsx global>{`
          p.prefix,
          p.suffix,
          span.prefix,
          span.suffix {
            display: block;
            text-align: center;
            font-family: var(--font-primary);
            font-size: 1rem;
            font-weight: 400;
          }
        `}</style>
      </Fragment>
    );
  }
}
