import Text from "./Text";

export default function Section({
  children,
  disabled = false,
  columns = 1,
  noGap = false,
  noMargin = false,
  tableSection = false,
  overlayDescription = false,
  popup = false
}) {
  let singleColumn = false;
  const columnsInt = parseInt(columns, 10);

  if (columnsInt === 1) {
    singleColumn = true;
  }

  return (
    <>
      <section className="section">
        {children}
        {disabled && overlayDescription && (
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
                {overlayDescription}
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
          grid-column-gap: ${noGap ? "0;" : "20px;"};
          grid-row-gap: ${noGap ? "0;" : "40px;"};
          margin: ${noMargin ? "0" : "40px 0"};
          margin-bottom: ${noMargin ? "0" : "80px"};
          ${disabled && popup ? "min-height: 300px;" : ""};
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
          min-height: 300px;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 5px;
          text-align: center;
        }

        .overlay .inner {
          max-width: 785px;
          margin: 0 auto;
        }

        @media (max-width: 1200px) {
          .section {
            ${!singleColumn
              ? "grid-template-columns: repeat(auto-fill, minmax(calc(50% - 40px), 1fr));"
              : ""};
          }
        }
        @media (max-width: 700px) {
          .section {
            ${!tableSection ? "grid-template-columns: 1fr;" : ""};
          }
          .popup {
            justify-content: flex-start;
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}
