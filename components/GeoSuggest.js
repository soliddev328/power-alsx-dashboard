import React from 'react';
import Geosuggest from 'react-geosuggest';

export default class GeoSuggest extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = value => {
    this.props.onChange(this.props.fieldname, value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.fieldname, true);
  };

  handleSuggestSelect = e => {
    if (e) {
      this.handleChange(e);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Geosuggest
          onSuggestSelect={this.handleSuggestSelect}
          placeholder={this.props.label}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        <style jsx global>{`
          .geosuggest {
            position: relative;
          }

          .geosuggest__input-wrapper {
            margin-bottom: 0.5em;
          }

          .geosuggest__suggests-wrapper {
            position: absolute;
            border-radius: 3px;
            width: 100%;
            z-index: 100;
            background-color: var(--color-bg-primary);
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
            color: var(--color-bg-primary);
            background-color: var(--color-primary);
          }
        `}</style>
      </React.Fragment>
    );
  }
}
