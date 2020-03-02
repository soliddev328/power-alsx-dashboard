import { Field } from "formik";
import Highlight from "./Highlight";

export default function RadioCard2({
  name,
  required,
  value,
  heading,
  content,
  highlight
}) {
  return (
    <label>
      <Field
        type="radio"
        component="input"
        name={name}
        id={name}
        validate={required}
        className="radiocard__input"
        value={value}
      />

      <div className="radiocard__container">
        <h3>
          <span className="control" />
          {heading}
        </h3>
        {content && (
          <Highlight
            className="paragraph"
            content={content}
            highlight={highlight}
          />
        )}
      </div>

      <span className="shadow" />

      <style jsx global>{`
        .radiocard__input {
          display: none;
        }

        .radiocard__container .paragraph {
          font-size: 12px;
        }

        .radiocard__input:not(:checked) + .radiocard__container {
          opacity: 0.5;
        }

        .radiocard__input:not(:checked) + .radiocard__container + .shadow {
          opacity: 0.2;
        }

        .radiocard__input:checked + .radiocard__container,
        .radiocard__input:indeterminate + .radiocard__container {
          opacity: 1;
        }

        .radiocard__input:checked + .radiocard__container > * > *,
        .radiocard__input:checked + .radiocard__container > * {
          color: #f8f8f9 !important;
        }

        .radiocard__input:checked + .radiocard__container {
          color: #f8f8f9 !important;
          background-color: #2479ff;
        }

        .radiocard__input:checked + .radiocard__container h3 .control {
          border: 0.4rem solid #f8f8f9;
          background-color: #41ef8b;
        }
      `}</style>
      <style jsx>{`
        label {
          display: block;
          position: relative;
          margin: 1.5em auto;
        }

        h3 {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          letter-spacing: 0.62px;
          margin: 0.2em auto;
        }

        .shadow {
          position: absolute;
          display: block;
          width: 90%;
          height: 10px;
          left: 50%;
          bottom: -10px;
          opacity: 0.5;
          transform: translateX(-50%);
          filter: blur(8px);
          background: linear-gradient(90deg, #41ef8b, #8be4ff);
          transition: opacity 200ms cubic-bezier(0.39, 0.575, 0.565, 1);
          z-index: 1;
          max-width: 350px;
          margin: 0 auto;
        }

        .control {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background-color: #f8f8f9;
          width: 1.5rem;
          height: 1.5rem;
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          font-size: 1rem;
          color: #41ef8b;
          border: 1px solid #2479ff;
          border-radius: 50%;
          margin-right: 1em;
        }

        .radiocard__container {
          position: relative;
          background-color: #fff;
          border: 1px solid #2479ff;
          border-radius: 5px;
          padding: 5px;
          max-width: 450px;
          margin: 0 auto;
          transition: opacity 200ms cubic-bezier(0.39, 0.575, 0.565, 1),
            color 200ms cubic-bezier(0.39, 0.575, 0.565, 1),
            background-color 200ms cubic-bezier(0.39, 0.575, 0.565, 1);
          z-index: 10;
        }
      `}</style>
    </label>
  );
}
