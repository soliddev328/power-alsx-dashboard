import InfoIcon from "./Icons/InfoIcon";

export default function CTA({ secondary, onClick, type, info, children }) {
  return (
    <button
      className={secondary ? "secondary" : ""}
      onClick={onClick}
      type={type || "submit"}
    >
      <span>{children}</span>
      {info && info.length && <InfoIcon content={info} />}
      <style jsx>{`
        /* Reset */
        button {
          border: none;
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: 350px;
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
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          font-weight: 800;
          color: #a8a8ba;
          margin: 1em auto;
          border-radius: 1px;
        }

        span {
          flex: 0 0 auto;
          padding: 0.3em;
          transition: all 350ms ease-in;
          box-shadow: inset 0 -2px 0 0 #2479ff;
        }

        .secondary span {
          box-shadow: inset 0 -1px 0 0 #2479ff;
        }

        button:hover span {
          color: #fff;
          box-shadow: inset 0 -3em 0 0 #2479ff;
        }

        .secondary {
          font-size: 0.5rem;
          opacity: 0.8;
          font-weight: 600;
        }
      `}</style>
    </button>
  );
}
