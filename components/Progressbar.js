export default function Progressbar({ completion }) {
  return (
    <div className="wrapper">
      <p className="caption">Hurry, the project is filling up quickly!</p>
      <div className="progress-wrapper">
        <progress max="100" value={completion} />
      </div>
      <p className="completion">{completion}% Full</p>
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: #fff;
          position: relative;
          height: 50%;
          padding: 0 40px;
          opacity: 0;
          animation: fadeIn 400ms ease-in-out forwards;
          animation-delay: 0.5s;
        }

        .caption {
          font-weight: 600;
          color: #000;
        }

        .progress-wrapper {
          width: 100%;
          border-radius: 12px;
          background: #f1f1f2;
        }

        progress {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          border: none;
          background: transparent;
          border-radius: 8px;
          display: block;
          width: 100%;
          margin: 0;
          transition: 0.3s all linear;
          animation: expandWidth 3s ease-in-out forwards;
        }

        progress::-moz-progress-bar {
          border-radius: 12px;
        }

        progress::-webkit-progress-bar {
          border-radius: 8px;
          background: rgba(54, 87, 180, 0);
        }

        progress::-webkit-progress-value {
          border-radius: 8px;
          background: #2479ff;
        }

        .completion {
          position: relative;
          display: flex;
          justify-content: flex-end;
          color: #868eaa;
          font-size: 13px;
          font-weight: 500;
          margin: 10px;
        }

        .highlight {
          color: #fff;
          font-size: 1.2em;
          margin: 0 1em;
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          progress {
            height: 16px;
          }
        }

        @media (max-width: 1000px) {
          .wrapper {
            height: 150px;
            padding: 0 25px;
            padding-top: 30px;
          }
        }
      `}</style>
    </div>
  );
}
