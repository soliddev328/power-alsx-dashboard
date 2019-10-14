export default function Container({
  children,
  column,
  centered,
  height,
  style,
  alignLeft = false
}) {
  return (
    <section>
      {children}
      <style jsx>{`
        section {
          display: flex;
          align-items: ${alignLeft ? "left" : "center"};
          ${column ? "flex-direction: column;" : ""}
          ${height ? `height: ${height};` : ""}
          ${centered ? "justify-content: center;" : ""}
        }
      `}</style>
    </section>
  );
}
