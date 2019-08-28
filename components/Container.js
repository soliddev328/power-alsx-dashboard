export default function Container({ children, column }) {
  return (
    <section>
      {children}
      <style jsx>{`
        section {
          display: flex;
          align-items: center;
          ${column ? "flex-direction: column;" : ""}
        }
      `}</style>
    </section>
  )
}
