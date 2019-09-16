import React from "react";
import Highlight from "./Highlight";

export default class SingleStep extends React.PureComponent {
  renderPrefix() {
    const { highlight, prefix } = this.props;

    return highlight ? (
      <Highlight className="prefix" content={prefix} highlight={highlight} />
    ) : (
      <p className="prefix">{prefix}</p>
    );
  }

  renderTitle() {
    const { highlight, title } = this.props;
    return highlight ? (
      <Highlight className="title" content={title} highlight={highlight} />
    ) : (
      <p className="title">{title}</p>
    );
  }

  renderSuffix() {
    const { suffix } = this.props;
    return <p className="suffix">{suffix}</p>;
  }

  render() {
    const { toast, prefix, title, suffix, image, children } = this.props;

    return (
      <div className="content">
        <div className="heading">
          {toast && <p className="title">{toast}</p>}
          {prefix && this.renderPrefix()}
          {title && this.renderTitle()}
          {suffix && this.renderSuffix()}
        </div>
        {image && (
          <figure>
            <img src={image.src} alt={image.alt} />
          </figure>
        )}
        {children}
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
            margin-top: -0.5em;
          }

          span.title mark {
            color: #41ef8b !important;
          }
        `}</style>
      </div>
    );
  }
}
