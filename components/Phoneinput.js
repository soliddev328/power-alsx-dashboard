import React from 'react';
import PhoneInput from 'react-phone-input-auto-format';

export default class Phoneinput extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = value => {
    this.props.onChangeEvent(this.props.fieldname, value);
  };

  handleBlur = () => {
    this.props.onBlurEvent(this.props.fieldname, true);
  };

  render() {
    return (
      <div className="input__wrapper">
        <PhoneInput
          name={this.props.fieldname}
          id={this.props.fieldname}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          {...this.props}
        />
        <label htmlFor={this.props.fieldname}>{this.props.label}</label>
      </div>
    );
  }
}
