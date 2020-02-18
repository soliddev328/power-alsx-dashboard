import { useRouter } from "next/router";

function BankCard({ code, image, largeIcon, accent }) {
  const router = useRouter();

  return (
    <button onClick={() => {}}>
      <figure>
        <img src={image.src} alt={image.altText} />
      </figure>
      <style jsx>{`
        figure {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: ${largeIcon ? "1rem 0.5rem" : "1rem 1.5rem"};
          border-radius: 5px;
          margin: 0;
          background-color: ${accent};
          height: 80px;
          width: 145px;
          transition: box-shadow 300ms ease-in-out;
        }

        img {
          width: 70%;
        }

        button {
          appearance: none;
          border: none;
          background: none;
          cursor: pointer;
        }

        button:hover figure {
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
        }
      `}</style>
    </button>
  );
}

export default BankCard;
