export default function Blockquote({ cite }) {
  return (
    <div className="wrapper">
      {cite && (
        <blockquote>
          <img
            src={cite.image.src}
            srcSet={cite.image.srcSet}
            alt={`${cite.name} profile image`}
          />
          <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
            <text
              transform="translate(-134 -11)"
              fill="#2479ff"
              fillRule="evenodd"
              fontFamily="Montserrat-Medium, Montserrat"
              fontSize="54"
              fontWeight="400"
            >
              <tspan x="132.268" y="52">
                “
              </tspan>
            </text>
          </svg>
          <p>{cite.text}</p>
        </blockquote>
      )}
      {cite && (
        <cite>
          {cite.name} - {cite.city}, {cite.state}
        </cite>
      )}
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 290px;
          margin: 0 auto;
        }

        blockquote {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0;
        }

        blockquote p {
          text-align: center;
          margin-top: 0;
          margin-bottom: 2em;
        }

        blockquote svg {
          margin: 1.4em 0;
        }

        cite {
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          font-size: 12px;
          font-weight: 800;
          font-style: normal;
          line-height: 1.2em;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #2479ff;
        }
      `}</style>
    </div>
  );
}
