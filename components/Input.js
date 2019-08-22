import React from "react"
import { Field } from "formik"

export default class Input extends React.Component {
  constructor(props) {
    super(props)
    this.inputField = React.createRef()
    this.scrollOnFocus = this.scrollOnFocus.bind(this)
    this.applyValidation = this.applyValidation.bind(this)

    this.state = {}
  }

  applyValidation(x) {
    const { type } = this.props
    let msg

    if (type === "email") {
      msg = "Please enter a valid email address"
    } else if (type === "password") {
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
    const { fullWidth, type, fieldname, validator, secondary, label, autoFocus } = this.props
    return (
      <div
        ref={this.inputField}
        onClick={this.scrollOnFocus}
        className="input__wrapper"
      >
        <Field
          type={type ? type : "text"}
          component="input"
          name={fieldname}
          id={fieldname}
          validate={validator ? validator : false}
          onInvalid={this.applyValidation}
          onInput={this.customSetCustomValidity}
          autoFocus={autoFocus}
          {...this.props}
        />
        <label htmlFor={fieldname}>{label}</label>
        <style jsx global>{`
          input {
            background-color: ${secondary ? "#F6F9FF" : "#fff"};
          }

          .input__wrapper {
            position: relative;
            height: 3.75rem;
            width: 100%;
            max-width: ${fullWidth ? '100%' : '350px'};
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
