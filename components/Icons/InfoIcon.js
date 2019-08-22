export default function InfoIcon({ content }) {
  return (
    <div className="wrapper">
      <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 0A7.498 7.498 0 0 0 0 7.5 7.498 7.498 0 0 0 7.5 15 7.498 7.498 0 0 0 15 7.5 7.498 7.498 0 0 0 7.5 0zm0 12.084a1.043 1.043 0 1 1 .001-2.086 1.043 1.043 0 0 1-.001 2.086zm1.796-5.479L8.42 7.904c-.1.148-.16.32-.177.498a.763.763 0 0 1-.743.764.774.774 0 0 1-.743-.782c-.012-.453.13-.897.402-1.26l.887-1.264c.171-.19.274-.434.29-.689a.823.823 0 0 0-.841-.863.806.806 0 0 0-.83.847v.029a.753.753 0 0 1-1.5.068l-.01-.018-.001-.052a2.231 2.231 0 0 1 2.34-2.266 2.232 2.232 0 0 1 2.352 2.255 2.409 2.409 0 0 1-.55 1.434z" />
      </svg>
      <p className="tooltip">{content}</p>
      <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0;
            position: relative;
            margin: 0 0.5rem;
          }

          .wrapper svg {
            opacity: 0.5;
          }

          .tooltip {
            width: 200px;
            position: absolute;
            right: 0;
            bottom: 100%;
            pointer-events: none;
            padding: 0.5em;
            margin: 0.8em 0;
            border-radius: 1px;
            font-size: 14px;
            background-color: #161621;
            color: #fff;
            opacity: 0;
            transition: all 200ms ease-in-out;
          }

          .tooltip:before {
            content: '';
            display: block;
            position: absolute;
            top: 100%;
            right: 0;
            width: 0;
            height: 0;
            border-top: 0.4em solid #161621;
            border-left: 0.4em solid #fff;
            border-right: 0.4em solid #fff;
          }
          .wrapper:hover .tooltip {
            opacity: 1;
          }
        `}</style>
    </div>
  )
}
