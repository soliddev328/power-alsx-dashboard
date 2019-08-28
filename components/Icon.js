export default function Icon({ icon }) {
  return (
    <figure>
      {icon}
      <style jsx>{`
        figure {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          margin: 0;
        }
      `}</style>
    </figure>
  )
}
