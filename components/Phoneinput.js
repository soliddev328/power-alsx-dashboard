import React from 'react';
import PhoneInput from 'react-phone-input-auto-format';

export default class Phoneinput extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    this.scrollOnFocus = this.scrollOnFocus.bind(this);
  }

  handleChange = value => {
    this.props.onChangeEvent(this.props.fieldname, value);
  };

  handleBlur = () => {
    this.props.onBlurEvent(this.props.fieldname, true);
  };

  scrollOnFocus() {
    setTimeout(() => {
      window.scrollTo(0, this.inputField.current.getBoundingClientRect().top);
    }, 300);
  }

  render() {
    return (
      <div
        ref={this.inputField}
        onClick={this.scrollOnFocus}
        className="input__wrapper"
      >
        <PhoneInput
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder={this.props.label}
        />
      </div>
    );
  }
}
