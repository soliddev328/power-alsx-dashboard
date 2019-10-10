import Text from "./Text";

export default function Section({
  children,
  disabled,
  columns = 1,
  noMargin,
  overlayDescription = false
}) {
  const columnsInt = parseInt(columns, 10);

  return (
    <>
      <section className="section">
        {children}
        {disabled && (
          <div className="overlay">
            <div className="inner">
              <Text
                h5
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1em"
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  style={{ marginRight: "10px" }}
                >
                  <g
                    fill="none"
                    fillRule="nonzero"
                    stroke="#D56679"
                    strokeWidth="1.5"
                    transform="translate(1 1)"
                  >
                    <circle cx="7" cy="7" r="7" />
                    <path d="M1.5 2.5L12 12M12 2.5L2.5 12" />
                  </g>
                </svg>
                Account not connected yet.
              </Text>
              <Text h3 style={{ color: "var(--color-primary)" }}>
                We’re delighted to have you as a customer and to provide you
                with 100% clean, lower cost electricity!
              </Text>
              <Text>
                {overlayDescription && overlayDescription}{" "}
                <a href="mailto:hello@commonenergy.us">hello@commonenergy.us</a>
                .
              </Text>
            </div>
          </div>
        )}
      </section>
      <style jsx>{`
        .section {
          display: grid;
          position: relative;
          grid-template-columns: repeat(
            ${columnsInt},
            minmax(calc(1000px / ${columnsInt + 20}), 1fr)
          );
          grid-column-gap: 20px;
          grid-row-gap: 40px;
          margin: ${noMargin ? "0" : "40px 0"};
          margin-bottom: ${noMargin ? "0" : "80px"};
        }

        .section + .section {
          margin-top: 0;
        }

        .overlay {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 5px;
          text-align: center;
        }

        .overlay .inner {
          max-width: 785px;
          margin: 0 auto;
        }

        @media (max-width: 1050px) {
          .section {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
