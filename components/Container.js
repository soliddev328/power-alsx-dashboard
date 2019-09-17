export default function Container({
  children,
  column,
  height,
  alignLeft = false
}) {
  return (
    <section>
      {children}
      <style jsx>{`
        section {
          display: flex;
          justify-content: center;
          align-items: ${alignLeft ? "left" : "center"};
          ${column ? "flex-direction: column;" : ""}
          ${height ? `height: ${height};` : ""}
        }
      `}</style>
    </section>
  );
}
