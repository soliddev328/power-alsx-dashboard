import { useEffect, useState } from "react";
import axios from "axios";
import { useStateValue } from "../state";
import { withFirebase } from "../firebase";
import CONSTANTS from "../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const getInvoiceData = async (id, idToken) => {
  const response = await axios.get(`${API}/v1/subscribers/invoice/${id}`, {
    headers: {
      Authorization: idToken
    }
  });
  return response?.data;
};

const renderDownloadButton = props => {
  const { id } = props;
  const [invoiceData, setInvoicedata] = useState(undefined);
  const [{ selectedAccount }, dispatch] = useStateValue();

  useEffect(() => {
    props.firebase.doUpdateUser(async idToken => {
      const invoiceBase64 = await getInvoiceData(id, idToken);
      let base64Encoded;

      if (invoiceBase64 !== "No invoice found.") {
        base64Encoded = `data:application/octet-stream;base64,${invoiceBase64}`;
      } else {
        base64Encoded = invoiceBase64;
      }

      setInvoicedata(base64Encoded);
    });
  }, [selectedAccount.value]);

  return (
    <td key={`invoice-${id}`}>
      {invoiceData ? (
        invoiceData === "No invoice found." ? (
          <p>{invoiceData}</p>
        ) : (
          <a
            download={`CE-Invoice-${id}`}
            href={invoiceData}
            target="_blank"
            rel="noopener noreferrer"
          >
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
        )
      ) : null}
    </td>
  );
};

function Table({ headers = [], data = [] }) {
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
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={`row-content-${index}`}>
                {row.map((item, index) => {
                  if (row.length === index + 2) {
                    return <td key={`column-content-${index}`}>${item}</td>;
                  }
                  if (row.length === index + 1) {
                    return withFirebase(renderDownloadButton(item));
                  }
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

export default withFirebase(Table);
