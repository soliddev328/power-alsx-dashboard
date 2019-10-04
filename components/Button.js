import ArrowIcon from "./Icons/ArrowIcon";
import FacebookIcon from "./Icons/FacebookIcon";
import TwitterIcon from "./Icons/TwitterIcon";
import LinkedinIcon from "./Icons/LinkedinIcon";

const shareIcon = icon => {
  if (icon === "facebook") return <FacebookIcon />;
  if (icon === "twitter") return <TwitterIcon />;
  if (icon === "linkedin") return <LinkedinIcon />;
};

export default function Button({
  type,
  onClick,
  share,
  disabled,
  children,
  maxWidth,
  arrow,
  transparent,
  primary,
  style
}) {
  return (
    <button
      type={type ? type : "submit"}
      onClick={onClick}
      className={share ? "share" : ""}
      disabled={disabled}
      style={style}
    >
      {share && shareIcon(share)}
      {children}
      {arrow && <ArrowIcon />}
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
          max-width: ${maxWidth ? maxWidth : "350px"};
          font-size: 0.875rem;
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          font-weight: 800;
          color: ${primary ? "#fff" : "#2479ff"};
          background-color: ${transparent
            ? "transparent"
            : primary
            ? "#2479ff"
            : "#fff"};
          border: ${primary ? "none" : "1px solid #2479ff"};
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

        @media (max-width: 1050px) {
          button.share {
            margin: 1em auto;
          }
        }
      `}</style>
    </button>
  );
}
