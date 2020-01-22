import cn from "classnames";

export default function Container({
  children,
  column,
  centered,
  height,
  grid,
  alignLeft = false
}) {
  return (
    <section className={cn({ grid })}>
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
