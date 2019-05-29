import React from "react";
import NumberFormat from "react-number-format";

export default class Phoneinput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  handleChange(e) {
    this.props.onChangeEvent(this.props.fieldname, e.target.value);
  }

  handleBlur() {
    this.props.onBlurEvent(this.props.fieldname, true);
  }

  render() {
    return (
      <div className="input__wrapper">
        <NumberFormat
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          format="(###) ###-####"
          name={this.props.fieldname}
          id={this.props.fieldname}
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
            pointer-events: none;
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
            z-index: 11;
          }

          input[value]:not([value=""]) + label {
            opacity: 0;
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
