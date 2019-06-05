import React from "react";
import Highlight from "./Highlight";

export default class SingleStep extends React.Component {
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

  renderTitle() {
    return this.props.highlight ? (
      <Highlight
        className="title"
        content={this.props.title}
        highlight={this.props.highlight}
      />
    ) : (
      <p className="title">{this.props.title}</p>
    );
  }

  renderSuffix() {
    return <p className="suffix">{this.props.suffix}</p>;
  }

  render() {
    return (
      <div className="content">
        <div className="heading">
          {this.props.toast && <p className="title">{this.props.toast}</p>}
          {this.props.prefix && this.renderPrefix()}
          {this.props.title && this.renderTitle()}
          {this.props.suffix && this.renderSuffix()}
        </div>
        {this.props.image && (
          <figure>
            <img src={this.props.image.src} alt={this.props.image.alt} />
          </figure>
        )}
        {this.props.children}
        <style jsx>{`
          .content {
            max-width: 87%;
            margin: 0 auto;
          }
          p {
            font-size: 1rem;
            text-align: center;
            font-weight: 700;
            line-height: 1.44;
          }
          p.title {
            color: #000;
            margin-bottom: 0;
            margin-top: 5px;
          }
          p.title + p.title {
            margin-top: 0;
          }
          .heading {
            margin-bottom: 1.5em;
          }
          figure {
            margin: 0;
            text-align: center;
          }
          img {
            max-width: 65%;
          }
        `}</style>
        <style jsx global>{`
          p.prefix,
          p.title,
          p.suffix,
          span.title,
          span.prefix,
          span.suffix {
            display: block;
            text-align: center;
            font-family: "Poppins", -apple-system, BlinkMacSystemFont,
              "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
              "Helvetica Neue", sans-serif;
            font-size: 1rem;
            font-weight: 400;
          }

          p.prefix {
            margin-bottom: 0;
          }

          p.prefix + p.title {
            margin-top: 0;
          }

          p.suffix,
          span.suffix {
            font-size: 1.3em;
          }

          span.title mark {
            color: #41ef8b !important;
          }
        `}</style>
      </div>
    );
  }
}
