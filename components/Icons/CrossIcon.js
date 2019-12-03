export default function CrossIcon() {
  return (
    <span className="wrapper">
      <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <g
          fillRule="nonzero"
          stroke="#FFF"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M2 2l8.67857143 8.55005952M10.678572 2l-8.67857143 8.55005952" />
        </g>
      </svg>
      <style jsx>{`
        .wrapper {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 2.3rem;
          height: 2.3rem;
          margin: 0;
          background-color: #2479ff;
          font-weight: 700;
          border-radius: 50%;
          overflow: hidden;
          transition: all 300ms ease-in-out;
        }

        svg {
          width: 35%;
        }
      `}</style>
    </span>
  );
}
