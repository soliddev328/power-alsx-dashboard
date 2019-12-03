import cn from "classnames";

export default function Panel({
  children,
  center,
  disabled,
  noBg,
  noShadow,
  specialShadow,
  hasDecoration,
  small
}) {
  return (
    <div
      className={cn("panel", {
        disabled: disabled,
        shadow: specialShadow,
        "no-background": noBg,
        "no-shadow": noShadow
      })}
    >
      {children}
      {hasDecoration && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="55"
          height="46"
          viewBox="0 0 55 46"
          className="decoration"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="#41EF8B"
            strokeLinecap="square"
            strokeWidth="4"
          >
            <path d="M41.537 4.374L33.423 15.96M20.98 2.342L22.9 15.36M52.28 23.793l-12.887 2.65M37.521 35.968l9.432 6.604M2.795 11.652l9.432 6.605" />
          </g>
        </svg>
      )}
      <style jsx>{`
        .panel {
          background-color: #fff;
          border-radius: 5px;
          padding: ${small ? "15px" : "30px"};
          box-shadow: 0 2px 40px 0 rgba(73, 80, 91, 0.08);
          ${center ? "text-align: center;" : ""};
        }

        .panel .panel {
          padding: 30px 0;
        }

        .panel.no-background {
          border-radius: none;
          box-shadow: none;
          background-color: transparent;
        }

        .panel.no-shadow {
          box-shadow: none;
        }

        .shadow {
          position: relative;
        }

        .shadow:before {
          content: "";
          position: absolute;
          z-index: -1;
          bottom: -10px;
          left: 5%;
          height: 100%;
          width: 90%;
          opacity: 0.3;
          border-radius: 25px;
          background: linear-gradient(276deg, #8be4ff, #41ef8b);
          filter: blur(10px);
          transition: all 0.2s;
        }

        .panel.disabled {
          filter: opacity(0.4);
          user-select: none;
          pointer-events: none;
        }

        .decoration {
          display: block;
          position: absolute;
          top: 0%;
          right: 0;
          transform: translate(50%, -60%);
        }

        @media (max-width: 1200px) {
          .decoration {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
