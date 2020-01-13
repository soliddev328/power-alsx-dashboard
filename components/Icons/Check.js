export default function CrossIcon() {
  return (
    <span className="wrapper">
      <svg
        height="30"
        viewBox="0 0 30 30"
        width="30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m10.135 15.81 2.578 2.473m7.297-6.932-7.037 6.932"
          stroke="#fff"
          stroke-linecap="round"
          stroke-width="2.5"
        />
      </svg>
      <style jsx>{`
        .wrapper {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          position: relative;
          vertical-align: middle;
          width: 30px;
          height: 30px;
          margin: 0;
          background-color: #39ed80;
          font-weight: 700;
          border-radius: 50%;
          overflow: hidden;
          transition: all 300ms ease-in-out;
        }

        svg {
          width: 100%;
        }
      `}</style>
    </span>
  );
}
