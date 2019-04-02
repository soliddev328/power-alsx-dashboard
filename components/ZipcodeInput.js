import React from "react";
import zip from "zippo";
export default class ZipCodeInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: ""
    };
  }

  format = event => {
    let { value } = event.target;

    this.setState({
      code: zip.parse(value)
    });
  };

  handleChange = e => {
    this.props.onChangeEvent(this.props.fieldname, e.target.value);
  };

  handleBlur = () => {
    this.props.onBlurEvent(this.props.fieldname, true);
  };

  render() {
    return (
      <div className="input__wrapper">
        <input
          type="number"
          pattern="[0-9]*"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
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
            background-color: ${this.props.secondary
              ? "#F6F9FF"
              : "var(--color-bg-primary)"};
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
            pointer-events: none;
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
            z-index: 11;
          }

          input:focus + label,
          input[value]:not([value=""]) + label {
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
