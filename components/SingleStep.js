import React from "react";
import Highlight from "./Highlight";

function SingleStep({
  highlight,
  title,
  prefix,
  suffix,
  toast,
  image,
  children
}) {
  const renderPrefix = () => {
    return highlight ? (
      <Highlight className="prefix" content={prefix} highlight={highlight} />
    ) : (
      <p className="prefix">{prefix}</p>
    );
  };

  const renderTitle = () => {
    return highlight ? (
      <Highlight className="title" content={title} highlight={highlight} />
    ) : (
      <p className="title">{title}</p>
    );
  };

  const renderSuffix = () => {
    return <p className="suffix">{suffix}</p>;
  };

  return (
    <div className="content">
      <div className="heading">
        {toast && <p className="title">{toast}</p>}
        {prefix && renderPrefix()}
        {title && renderTitle()}
        {suffix && renderSuffix()}
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
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          font-size: 1rem;
          font-weight: 400;
        }

        p.prefix {
          margin-bottom: 0;
        }

        p.prefix + p.title {
          margin-top: 0.5em;
          font-size: 1.4rem;
        }

        p.suffix,
        span.suffix {
          font-size: 1em;
          margin-top: -0.5em;
        }

        span.title mark {
          color: #41ef8b !important;
        }
      `}</style>
    </div>
  );
}

export default SingleStep;
