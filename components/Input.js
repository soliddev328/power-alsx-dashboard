import React from "react"
import { Field } from "formik"

export default class Input extends React.Component {
  constructor(props) {
    super(props)
    this.inputField = React.createRef()
    this.scrollOnFocus = this.scrollOnFocus.bind(this)
    this.applyValidation = this.applyValidation.bind(this)
  }

  applyValidation(x) {
    let msg

    if (this.props.type === "email") {
      msg = "Please enter a valid email address"
    } else if (this.props.type === "password") {
      msg = "Please complete password fields"
    }
    x.target.setCustomValidity(msg)
  }

  customSetCustomValidity(e) {
    e.target.setCustomValidity("")
  }

  scrollOnFocus() {
    if (this.inputField) {
      const offset = this.inputField.current.getBoundingClientRect().top
      setTimeout(() => {
        window.scrollTo(0, offset)
      }, 200)
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
            background-color: ${this.props.secondary ? "#F6F9FF" : "#fff"};
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
    )
  }
}
