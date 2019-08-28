import cn from "classnames"

export default function Panel({
  children,
  coloredShadow,
  center,
  disabled,
  noBg,
  noShadow,
  specialShadow,
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
      <style jsx>{`
        .panel {
          background-color: #fff;
          border-radius: 5px;
          padding: ${small ? "15px" : "30px"};
          box-shadow: 0 2px 40px 0 rgba(73, 80, 91, 0.08);
          ${center ? "text-align: center;" : ""}
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
      `}</style>
    </div>
  )
}
