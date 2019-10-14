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
    <div className="table-wrapper">
      <div className="table-scroller">
        <table>
          <thead>
            <tr>
              {headers.map((item, index) => (
                <th
                  key={`column-title-${index}`}
                  className={`${index === 0 && "table-sticky-column"}`}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={`row-content-${index}`}>
                {row.map((item, index) => {
                  return (
                    <td
                      key={`column-content-${index}`}
                      className={`${index === 0 && "table-sticky-column"}`}
                    >
                      {item}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .table-wrapper {
          position: relative;
        }

        .table-scroller {
          margin-left: 120px;
          overflow-x: auto;
          overflow-y: visible;
          padding-bottom: 5px;
          width: calc(100% - 120px);
        }

        table .table-sticky-column {
          left: 0;
          position: absolute;
          top: auto;
          width: 120px;
          min-width: auto;
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        th {
          min-width: 180px;
        }

        th,
        td {
          padding: 15px 20px;
        }

        th:first-child,
        td:first-child {
          white-space: nowrap;
        }

        tbody tr:nth-child(odd) .table-sticky-column,
        tbody tr:nth-child(odd) {
          background-color: #f6f9ff;
        }

        tbody tr {
          text-align: center;
        }
      `}</style>
    </div>
  );
}
