import React from "react";
import { Field } from "formik";

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    this.scrollOnFocus = this.scrollOnFocus.bind(this);
  }

  applyValidation(x) {
    const msg = "Please enter a valid email address";
    x.target.setCustomValidity(msg);
  }

  customSetCustomValidity(e) {
    e.target.setCustomValidity("");
  }

  scrollOnFocus() {
    if (this.inputField) {
      const offset = this.inputField.current.getBoundingClientRect().top;
      setTimeout(() => {
        window.scrollTo(0, offset);
      }, 200);
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
          type={this.props.type ? this.props.type : "text"}
          component="input"
          name={this.props.fieldname}
          id={this.props.fieldname}
          validate={this.props.validator ? this.props.validator : false}
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
            background-color: ${this.props.secondary ? "#F6F9FF" : "#fff"};
            box-shadow: none;
            font-family: "Poppins", -apple-system, BlinkMacSystemFont,
              "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
              "Helvetica Neue", sans-serif;
            font-size: 1.125rem;
            font-weight: 700;
            padding: 0.8em 1em;
            width: 100%;
            z-index: 10;
            caret-color: #41ef8b;
            transition: border-color 200ms ease-in;
          }

          input + label {
            position: absolute;
            font-family: "Poppins", -apple-system, BlinkMacSystemFont,
              "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
              "Helvetica Neue", sans-serif;
            font-size: 0.75rem;
            font-weight: 600;
            color: #2479ff;
            letter-spacing: 0.7px;
            left: 1.5em;
            top: 50%;
            text-transform: capitalize;
            transform: translateY(-50%);
            transition: opacity 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
            pointer-events: none;
          }

          .input__wrapper {
            position: relative;
            height: 3.75rem;
            width: 100%;
            max-width: 350px;
            margin: 0 auto;
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
