export default function LigthBulb() {
  return (
    <span className="wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="37"
        viewBox="0 0 34 37"
      >
        <g fill="#2479FF" fillRule="evenodd">
          <path d="M3.984 18.045a.995.995 0 0 0-.996-.994H.996a.995.995 0 1 0 0 1.988h1.992c.55 0 .996-.445.996-.994zM33.004 17.05h-1.992a.995.995 0 1 0 0 1.989h1.992a.995.995 0 1 0 0-1.988zM5.421 10.225L3.696 9.23a.997.997 0 0 0-1.361.364.993.993 0 0 0 .365 1.358l1.725.994a.998.998 0 0 0 1.361-.364.993.993 0 0 0-.365-1.358zM31.3 25.137l-1.725-.994a.997.997 0 0 0-1.361.364.993.993 0 0 0 .365 1.358l1.725.994a.998.998 0 0 0 1.361-.364.993.993 0 0 0-.365-1.358zM9.165 6.28a.998.998 0 0 0 1.36.364.993.993 0 0 0 .365-1.358l-.996-1.723a1 1 0 0 0-1.36-.364.993.993 0 0 0-.366 1.358l.997 1.723zM16.063 2.998c0 .553.45.995.996.996.55 0 .996-.444.995-.994l-.002-1.99a1 1 0 0 0-.996-.995.993.993 0 0 0-.995.993l.002 1.99zM4.425 24.143l-1.725.994a.993.993 0 0 0-.365 1.358.997.997 0 0 0 1.36.364l1.726-.994a.993.993 0 0 0 .365-1.358.999.999 0 0 0-1.36-.364zM29.575 11.947l1.725-.994a.993.993 0 0 0 .365-1.358.998.998 0 0 0-1.36-.364l-1.726.994a.993.993 0 0 0-.365 1.358.997.997 0 0 0 1.36.364zM23.475 6.644a.998.998 0 0 0 1.36-.364l.997-1.723a.993.993 0 0 0-.365-1.358 1 1 0 0 0-1.361.364l-.996 1.723a.993.993 0 0 0 .365 1.358zM23.908 9.556c-2.573-2.089-5.945-2.891-9.255-2.202-4.3.894-7.694 4.413-8.443 8.755-.627 3.637.574 7.313 3.213 9.837 1.404 1.34 2.257 3.134 2.493 5.023h4.088v-4.67l-3.763-5.633-1.922-1.918a.992.992 0 0 1 0-1.406.997.997 0 0 1 1.409 0l1.288 1.285 1.288-1.285a.997.997 0 0 1 1.408 0L17 18.627l1.288-1.285a.997.997 0 0 1 1.408 0l1.288 1.285 1.288-1.285a.997.997 0 0 1 1.409 0 .992.992 0 0 1 0 1.406l-1.922 1.918-3.763 5.633v4.67h4.03c.117-1.786.967-3.536 2.484-4.96a10.973 10.973 0 0 0 3.447-7.964c0-3.307-1.476-6.401-4.05-8.49z" />
          <path d="M18.992 19.45l-1.288 1.286a.997.997 0 0 1-1.408 0l-1.288-1.285-.71.709L17 24.206l2.703-4.046-.71-.71zM12.02 34.018A2.989 2.989 0 0 0 15.008 37h3.984a2.989 2.989 0 0 0 2.988-2.982v-1.06h-9.96v1.06z" />
        </g>
      </svg>
      <style jsx>{`
        .wrapper {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          position: relative;
          margin: 0 5px;
          overflow: hidden;
          transition: all 300ms ease-in-out;
        }
      `}</style>
    </span>
  );
}
