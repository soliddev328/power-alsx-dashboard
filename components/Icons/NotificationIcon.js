export default function NotificationIcon({ number }) {
  return (
    <span className="wrapper">
      <svg
        width="47"
        height="22"
        viewBox="0 0 47 22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fillRule="evenodd">
          <path
            d="M18.5041083 14.9552687h-1.1431788v-4.838511c0-3.60718331-2.5223598-6.59796962-5.8648619-7.30116655.2050414-.29324309.2932431-.61627968.2932431-.99655733v-.02978177C11.7893107.79269473 10.9977889 0 10.0000586 0c-.99655728 0-1.78925201.79152176-1.78925201 1.78925205v.02863812c0 .38145062.11683978.70331424.2932431.99655733-3.34238477.70331423-5.86486186 3.69544945-5.86486186 7.3011665v4.8086003l-1.14317887.0011465C.67469371 14.9253608 0 15.6000545 0 16.4213698s.6746937 1.5246295 1.49600896 1.5246295h6.65632496v1.2027659c0 1.1431788.82131526 2.0824951 1.84766608 2.0824951 1.0263508 0 1.8476661-.9381433 1.8476661-2.0824951v-1.2027659h6.6563249c.8213153 0 1.496009-.6746937 1.496009-1.496009 0-.8201716-.6746937-1.4948653-1.496009-1.4948653l.0001173.0001437z"
            fill="#2479ff"
          />
          {number && (
            <g>
              <circle
                stroke="#2479ff"
                strokeWidth="1.5"
                cx="36"
                cy="11"
                r="10"
              />
              <text
                fontFamily="Poppins-SemiBold, Poppins"
                fontSize="14"
                fontWeight="500"
                letterSpacing=".175"
                fill="#41ef8b"
              >
                <tspan x="32" y="16">
                  {number}
                </tspan>
              </text>
            </g>
          )}
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
  )
}
