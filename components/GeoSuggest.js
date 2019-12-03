import React from "react";
import Geosuggest from "react-geosuggest";

export default class GeoSuggest extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    this.scrollOnFocus = this.scrollOnFocus.bind(this);
    this.handleSuggestSelect = this.handleSuggestSelect.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {};
  }

  handleChange(value) {
    const { onChange, fieldname } = this.props;

    if (value.description) {
      onChange(fieldname, value);
    }
  }

  handleBlur() {
    const { onBlur, fieldname } = this.props;
    const nextField = document.getElementById("apt");

    if (nextField) {
      nextField.focus();
    }

    onBlur(fieldname, true);
  }

  handleSuggestSelect(e) {
    if (e) {
      const nextField = document.getElementById("apt");
      this.handleChange(e);

      if (nextField) {
        nextField.focus();
      }
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
    const { label, value } = this.props;

    return (
      <div ref={this.inputField} onClick={this.scrollOnFocus}>
        <Geosuggest
          onSuggestSelect={this.handleSuggestSelect}
          placeholder={label}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={value}
          country="us"
        />
        <style jsx global>{`
          .geosuggest {
            position: relative;
          }

          .geosuggest__input-wrapper {
            max-width: 350px;
            margin: 0 auto;
            margin-bottom: 0.5em;
          }

          .geosuggest__suggests-wrapper {
            position: absolute;
            left: 50%;
            border-radius: 3px;
            max-width: 350px;
            margin: 0 auto;
            width: 100%;
            z-index: 100;
            background-color: #fff;
            transform: translateX(-50%);
          }

          .geosuggest__suggests {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .geosuggest__suggests--hidden {
            max-height: 0;
            overflow: hidden;
            border-width: 0;
          }

          .geosuggest__item {
            cursor: pointer;
            border-radius: 3px;
            padding: 0.5em 1em;
            transition: all 200ms ease;
          }

          .geosuggest__item--active,
          .geosuggest__item:hover {
            color: #fff;
            background-color: #2479ff;
          }
        `}</style>
      </div>
    );
  }
}
