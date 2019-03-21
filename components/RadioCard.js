import React from "react";
import { Field } from "formik";
import Highlight from "./Highlight";

export default class RadioCard extends React.Component {
  render() {
    return (
      <label>
        <Field
          type="radio"
          component="input"
          name={this.props.name}
          id={this.props.name}
          validate={this.props.required}
          className="radiocard__input"
          value={this.props.value}
        />

        <div className="radiocard__container">
          <h3>
            <span className="control" />
            {this.props.heading}
          </h3>
          {this.props.content && (
            <Highlight
              className="paragraph"
              content={this.props.content}
              highlight={this.props.highlight}
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
            color: var(--color-bg-secondary) !important;
          }

          .radiocard__input:checked + .radiocard__container {
            color: var(--color-bg-secondary) !important;
            background-color: var(--color-primary);
          }

          .radiocard__input:checked + .radiocard__container h3 .control {
            border: 0.4rem solid var(--color-bg-secondary);
            background-color: var(--color-secondary);
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
          }

          .control {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            background-color: var(--color-bg-secondary);
            width: 1.5rem;
            height: 1.5rem;
            font-family: var(--font-primary);
            font-size: 1rem;
            color: var(--color-secondary);
            border: 1px solid var(--color-primary);
            border-radius: 50%;
            margin-right: 1em;
          }

          .radiocard__container {
            position: relative;
            background-color: var(--color-bg-primary);
            border: 1px solid var(--color-primary);
            border-radius: 5px;
            padding: 5px;
            transition: opacity 200ms cubic-bezier(0.39, 0.575, 0.565, 1),
              color 200ms cubic-bezier(0.39, 0.575, 0.565, 1),
              background-color 200ms cubic-bezier(0.39, 0.575, 0.565, 1);
            z-index: 10;
          }
        `}</style>
      </label>
    );
  }
}
