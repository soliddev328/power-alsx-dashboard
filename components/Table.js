function validURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

export default function Table({ headers = [], data = [] }) {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((item, index) => (
            <th key={`column-title-${index}`}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={`row-content-${index}`}>
            {row.map((item, index) => {
              if (validURL(item)) {
                return (
                  <td key={`column-content-${index}`}>
                    <a href={item}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                      >
                        <g fill="#2479FF" fillRule="evenodd">
                          <path d="M9.975.12C9.253.12 8.65.723 8.65 1.446V12L3.494 6.843c-.506-.506-1.35-.506-1.88 0-.506.507-.506 1.35 0 1.88l7.422 7.422a1.187 1.187 0 0 0 .41.289c.072.024.168.048.24.072a.892.892 0 0 0 .266.025c.265 0 .53-.096.723-.217.072-.048.145-.096.193-.168l7.301-7.422a1.33 1.33 0 0 0-1.904-1.855l-4.964 5.083V1.446C11.3.723 10.723.12 9.976.12z" />
                          <path d="M18.506 14.362c-.723 0-1.325.602-1.325 1.325v2.385H2.675v-2.385c0-.723-.602-1.325-1.325-1.325S.025 14.94.025 15.687v3.71c0 .723.602 1.326 1.325 1.326h17.156c.723 0 1.326-.603 1.326-1.325v-3.71c0-.748-.603-1.326-1.326-1.326z" />
                        </g>
                      </svg>
                    </a>
                  </td>
                );
              }
              return <td key={`column-content-${index}`}>{item}</td>;
            })}
          </tr>
        ))}
      </tbody>
      <style jsx>{`
        table {
          table-layout: fixed;
          width: 100%;
          border-collapse: collapse;
          background-color: #fff;
        }

        th {
          width: 180px;
        }

        th,
        td {
          padding: 15px 20px;
        }

        tbody tr:nth-child(odd) {
          background-color: #f6f9ff;
        }

        tbody tr {
          text-align: center;
        }

        @media (max-width: 1050px) {
          th {
            width: 80px;
          }

          th,
          td {
            padding: 7px 10px;
          }
        }
      `}</style>
    </table>
  );
}
