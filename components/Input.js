import React from 'react';
import { Field } from 'formik';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="input__wrapper">
        <Field
          type={this.props.type ? this.props.type : 'text'}
          component="input"
          name={this.props.fieldname}
          id={this.props.fieldname}
          validate={this.props.required}
        />
        <label htmlFor={this.props.fieldname}>{this.props.label}</label>
        <style jsx global>{`
          input {
            border: none;
            background-image: none;
            background-color: var(--color-bg-primary);
            box-shadow: none;
            font-size: 1.125rem;
            font-weight: 700;
            padding: 0.8em 1em;
            width: 100%;
          }

          input + label {
            pointer-events: none;
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--color-primary);
            letter-spacing: 0.7px;
            left: 1.5em;
            top: 50%;
            text-transform: capitalize;
            transform: translateY(-50%);
            transition: opacity 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
          }

          input,
          input + label {
            position: absolute;
            font-family: var(--font-primary);
          }

          input[value]:not([value='']) + label,
          input:focus + label,
          input:active + label {
            opacity: 0;
          }

          .input__wrapper {
            position: relative;
            height: 3.75rem;
            width: 100%;
            margin-top: 1rem;
          }

          .input__wrapper:last-of-type {
            margin-bottom: 1rem;
          }
        `}</style>
      </div>
    );
  }
}
