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
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder={this.props.label}
        />
      </div>
    );
  }
}
