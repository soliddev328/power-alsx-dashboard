export default function ArrowIcon({
  color = "#000",
  width = "15",
  height = "15"
}) {
  return (
    <svg
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="4"
      >
        <path d="m15 2 10 11-10 11" strokeLinejoin="round" />
        <path d="m2 13h22.413" />
      </g>
      <style jsx>{`
        svg {
          margin: 0 1rem;
        }
      `}</style>
    </svg>
  );
}
