import cn from "classnames";

export default function Section({ children, disabled, columns = 1, noMargin }) {
  const columnsInt = parseInt(columns, 10);

  return (
    <section className={cn("section", { disabled: disabled })}>
      {children}
      <style jsx>{`
        .section {
          display: grid;
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

        .section.disabled {
          filter: opacity(0.4);
          user-select: none;
          pointer-events: none;
        }

        @media (max-width: 1050px) {
          .section {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
