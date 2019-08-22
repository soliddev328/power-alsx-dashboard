export default function Separator({ text, noMargin, small }) {
  return (
    <div className="separator__wrapper">
      {text && <p>{text}</p>}
      <style jsx>{`
          .separator__wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: ${noMargin ? '0' : '3rem 0'};
            height: ${small ? '2px' : '1px'};
            background-color: #41ef8b;
            ${small && 'max-width: 50px;'}
          }

          p {
            display: inline-block;
            margin: 0;
            padding: 0 20px;
            background-color: #f8f8f9;
          }
        `}</style>
    </div>
  );
}
