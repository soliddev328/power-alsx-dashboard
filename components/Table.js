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
          text-transform: lowercase;
        }

        @media (max-width: 1050px) {
          th {
            width: 80px;
          }

          th,
          td {
            padding: 7px 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      `}</style>
    </table>
  );
}
