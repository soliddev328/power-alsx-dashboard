import cn from "classnames"

export default function Panel({ children, coloredShadow, disabled, noBg }) {
  return (
    <div className={cn("panel", { disabled: disabled, "no-background": noBg })}>
      {children}
      <style jsx>{`
        .panel {
          background-color: #fff;
          border-radius: 5px;
          padding: 30px;
          box-shadow: 0 2px 40px 0 rgba(73, 80, 91, 0.08);
        }

        .panel .panel {
          padding: 30px 0;
        }

        .panel.no-background {
          border-radius: none;
          box-shadow: none;
          background-color: transparent;
        }

        .shadow {
          display: block;
          position: absolute;
          width: 90%;
          left: 50.5%;
          height: 50px;
          filter: blur(10px);
          background: linear-gradient(276deg, #8be4ff, #41ef8b);
          transform: translate(-50%);
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
