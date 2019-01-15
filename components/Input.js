import React from 'react';
import { Field } from 'formik';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    this.scrollOnFocus = this.scrollOnFocus.bind(this);
  }

  applyValidation(x) {
    const msg = 'Please enter a valid email address';
    x.target.setCustomValidity(msg);
  }

  customSetCustomValidity(e) {
    e.target.setCustomValidity('');
  }

  scrollOnFocus() {
    if (this.inputField) {
      const offset = this.inputField.current.getBoundingClientRect().top;
      setTimeout(() => {
        window.scrollTo(0, offset);
      }, 500);
    }
  }

  render() {
    return (
      <div
        ref={this.inputField}
        onClick={this.scrollOnFocus}
        className="input__wrapper"
      >
        <Field
          type={this.props.type ? this.props.type : 'text'}
          component="input"
          name={this.props.fieldname}
          id={this.props.fieldname}
          validate={this.props.required}
          onInvalid={this.applyValidation}
          onInput={this.customSetCustomValidity}
          autoFocus={this.props.autoFocus}
          {...this.props}
        />
        <label htmlFor={this.props.fieldname}>{this.props.label}</label>
        <style jsx global>{`
          input {
            appearance: none;
            border: 1px solid transparent;
            border-radius: 3px;
            background-image: none;
            background-color: ${this.props.secondary
              ? '#F6F9FF'
              : 'var(--color-bg-primary)'};
            box-shadow: none;
            font-family: var(--font-primary);
            font-size: 1.125rem;
            font-weight: 700;
            padding: 0.8em 1em;
            width: 100%;
            z-index: 10;
            caret-color: var(--color-secondary);
            transition: border-color 200ms ease-in;
          }

          input + label {
            position: absolute;
            font-family: var(--font-primary);
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

          input[value]:not([value='']) + label {
            opacity: 0;
          }

          .input__wrapper {
            position: relative;
            height: 3.75rem;
            width: 100%;
            margin-bottom: 0.5rem;
          }

          .input__wrapper:last-of-type {
            margin-bottom: 0.5rem;
          }
        `}</style>
      </div>
    );
  }
}
