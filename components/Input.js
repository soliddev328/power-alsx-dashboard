import React from "react";
import { Field } from "formik";
import cn from "classnames";

export default class Input extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    this.scrollOnFocus = this.scrollOnFocus.bind(this);
    this.applyValidation = this.applyValidation.bind(this);
    this.customSetCustomValidity = this.customSetCustomValidity.bind(this);

    this.state = {
      displayLabel: true
    };
  }

  applyValidation(x) {
    const { type } = this.props;
    let msg;

    if (type === "email") {
      msg = "Please enter a valid email address";
    } else if (type === "password") {
      msg = "Please complete password fields";
    }
    x.target.setCustomValidity(msg);
  }

  customSetCustomValidity(e) {
    const { outerLabel } = this.props;
    e.target.setCustomValidity("");
    if (!outerLabel) {
      e.target.value !== ""
        ? this.setState({ displayLabel: false })
        : this.setState({ displayLabel: true });
    }
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
    const {
      fullWidth,
      type,
      fieldname,
      validator,
      secondary,
      label,
      style,
      value,
      autoFocus,
      readOnly,
      outerLabel
    } = this.props;
    const { displayLabel } = this.state;
    return (
      <div
        ref={this.inputField}
        onClick={this.scrollOnFocus}
        className={cn("input__wrapper", { "outer-label": outerLabel })}
      >
        <Field
          type={type ? type : "text"}
          component="input"
          name={fieldname}
          id={fieldname}
          validate={validator ? validator : false}
          onInvalid={this.applyValidation}
          onInput={this.customSetCustomValidity}
          autoFocus="negative"
          ref={this.inputRef}
          readOnly={readOnly}
          value={this.props.value}
          style={this.props.style}
        />
        <label
          htmlFor={fieldname}
          style={{ opacity: displayLabel ? "1" : "0" }}
        >
          {label}
        </label>
        <style jsx global>{`
          input {
            background-color: ${secondary ? "#F6F9FF" : "#fff"};
          }

          .input__wrapper {
            position: relative;
            height: 3.75rem;
            width: 100%;
            max-width: ${fullWidth ? "100%" : "350px"};
            margin: 0 auto;
            margin-bottom: 0.5rem;
            ${readOnly && "pointer-events: none;"}
          }

          .input__wrapper:last-of-type {
            margin-bottom: 0.5rem;
          }

          .input__wrapper.outer-label {
            margin-bottom: 0;
            margin-top: 2em;
          }

          .input__wrapper.outer-label label {
            position: absolute;
            top: -25%;
          }
        `}</style>
      </div>
    );
  }
}
