import React from 'react';
import { Field } from 'formik';
import Highlight from './Highlight';

export default class RadioCard extends React.Component {
  constructor(props) {
    super(props);
  }

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
            <span className="number">{this.props.number}</span>
            {this.props.heading}
          </h3>
          <Highlight
            className="paragraph"
            content={this.props.content}
            highlight={this.props.highlight}
          />
        </div>

        <span className="shadow" />

        <style jsx global>{`
          .radiocard__input {
            display: none;
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
            font-size: 1.05rem;
            letter-spacing: 0.62px;
            margin-top: 0;
          }

          .number {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 2rem;
            height: 2rem;
            font-family: var(--font-primary);
            font-size: 1rem;
            color: var(--color-secondary);
            border: 1px solid var(--color-primary);
            border-radius: 50%;
            margin-right: 1em;
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

          .radiocard__container {
            position: relative;
            background-color: var(--color-bg-primary);
            border-radius: 5px;
            padding: 10px;
            transition: opacity 200ms cubic-bezier(0.39, 0.575, 0.565, 1);
            z-index: 10;
          }
        `}</style>
      </label>
    );
  }
}
