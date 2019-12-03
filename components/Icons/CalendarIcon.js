export default function CalendarIcon() {
  return (
    <span className="wrapper">
      <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.1252749 1.874936h-1.8747977l-.0007101-.937113c0-.5185702-.4199408-.9378212-.9377802-.9378212-.5178393 0-.9377802.419251-.9377802.9378212v.9378212l-3.7490506-.00071v-.937113C5.6251561.419251 5.2052152 0 4.6873758 0c-.5178393 0-.9377802.419251-.9377802.9378212v.9378212l-1.8747977-.0007082C.8398456 1.8749342 0 2.7148527 0 3.7498139v9.3753064C0 14.1601178.839882 15 1.8747979 15h11.2496943c1.0349523 0 1.8747978-.8399185 1.8747978-1.8748797L15 3.7505403c0-1.0364141-.8398818-1.8756061-1.8747977-1.8756061l.0000726.0000018zm0 11.2509125H1.8748542V5.1557938h11.2496943l.0007264 7.9700547z"
          fill="#FFF"
          fillRule="evenodd"
        />
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
      `}</style>
    </span>
  );
}
