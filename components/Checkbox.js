import React from "react";
import { Field } from "formik";

export default class RadioCard extends React.Component {
  render() {
    return (
      <label>
        <Field
          type="checkbox"
          component="input"
          name={this.props.fieldname}
          id={this.props.fieldname}
          validate={this.props.required}
        />
        {this.props.label ? <p>{this.props.label}</p> : this.props.children}
        <style jsx>{`
          label {
            display: flex;
            align-items: start;
            justify-content: center;
            cursor: pointer;
            font-family: "Poppins", -apple-system, BlinkMacSystemFont,
              "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
              "Helvetica Neue", sans-serif;
            position: relative;
            color: #555e80;
            margin: 0.5rem 0;
          }
        `}</style>
        <style jsx global>{`
          input[type="checkbox"] {
            appearance: none;
            border: none;
            margin-right: 5px;
            margin-bottom: 0.4em;
          }

          input[type="checkbox"]:after {
            display: block;
            width: 1rem;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            content: url("/static/icon/check.svg");
            background-color: #fff;
            border: 1px solid #2479ff;
            border-radius: 2px;
            transition: background-color 200ms
              cubic-bezier(0.39, 0.575, 0.565, 1);
          }

          input[type="checkbox"]:checked:after {
            background-color: #2479ff;
          }

          input[type="checkbox"] + p {
            margin-top: 0;
          }
        `}</style>
      </label>
    );
  }
}
