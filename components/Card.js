export default function Card({ children, title, content }) {
  return (
    <div className="wrapper">
      <div className="container">
        {children}
        {title && <h1>{title}</h1>}
        <hr />
        {content && <p>{content}</p>}
      </div>
      <span className="shadow" />
      <style jsx>{`
          .wrapper {
            position: relative;
            margin-bottom: 2rem;
          }

          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            background-color: #fff;
            border-radius: 3px;
            margin: 0 auto;
            padding: 1rem 2rem;
            z-index: 10;
          }

          .shadow {
            position: absolute;
            display: block;
            width: 90%;
            height: 10px;
            left: 50%;
            bottom: -5px;
            opacity: 0.5;
            transform: translateX(-50%);
            filter: blur(8px);
            background: linear-gradient(90deg, #41ef8b, #8be4ff);
            transition: opacity 200ms cubic-bezier(0.39, 0.575, 0.565, 1);
            z-index: 1;
          }

          h1 {
            margin: 0;
          }

          p {
            margin-top: 0;
            text-transform: capitalize;
          }
        `}</style>
    </div>
  );
}
