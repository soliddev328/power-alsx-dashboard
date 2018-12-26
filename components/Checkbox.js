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
          type="checkbox"
          component="input"
          name={this.props.name}
          id={this.props.name}
          validate={this.props.required}
        />
        {this.props.label}
        <style jsx>{`
          label {
            display: flex;
            align-items: center;
            cursor: pointer;
            font-family: var(--font-primary);
            position: relative;
            color: #555e80;
            margin: 2rem 0;
          }
        `}</style>
        <style jsx global>{`
          input[type='checkbox'] {
            appearance: none;
            border: none;
          }

          input[type='checkbox']:after {
            display: block;
            width: 1rem;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            content: url('/static/icon/check.svg');
            background-color: var(--color-bg-primary);
            border-radius: 2px;
            margin-right: 5px;
            transition: background-color 200ms
              cubic-bezier(0.39, 0.575, 0.565, 1);
          }

          input[type='checkbox']:checked:after {
            background-color: var(--color-primary);
          }
        `}</style>
      </label>
    );
  }
}
