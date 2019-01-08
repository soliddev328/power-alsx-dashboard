import React from 'react';
import Select, { components } from 'react-select';
import axios from 'axios';

export default class CustomSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.getOptions(props.postalCode)
    };
  }

  getOptions(code) {
    let options = [];

    axios
      .get(`https://comenergy-api-staging.herokuapp.com/v1/zipcodes/${code}`)
      .then(function(response) {
        // debugger;
        // options.push({
        // })
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    options.push(
      {
        code: '1',
        image: {
          src: '/static/images/utilities/pg&e.png',
          altText: 'Utility logo'
        },
        label: 'PG&E'
      },
      {
        code: '0',
        image: {
          src: '/static/images/utilities/placeholder.png',
          altText: 'Utility logo'
        },
        label: 'None'
      }
    );

    return options;
  }

  handleChange = value => {
    this.props.onChange(this.props.fieldname, value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.fieldname, true);
  };

  render() {
    const options = [
      {
        code: '1',
        image: {
          src: '/static/images/utilities/pg&e.png',
          altText: 'Utility logo'
        },
        label: 'PG&E'
      },
      {
        code: '0',
        image: {
          src: '/static/images/utilities/placeholder.png',
          altText: 'Utility logo'
        },
        label: 'None'
      }
    ];

    const { Option } = components;
    const CustomOption = props => (
      <Option {...props}>
        <img
          className="select__option-icon"
          src={props.data.image.src}
          alt={props.data.image.altText}
        />
        {props.data.label}
      </Option>
    );
    const getOptionValue = option => option.code;

    return (
      <div style={{ margin: '1rem 0' }}>
        <label className="select__label" htmlFor={this.props.fieldname}>
          {this.props.label}
        </label>
        <Select
          isSearchable={false}
          components={{
            SingleValue: CustomOption,
            Option: props => (
              <Option {...props}>
                <img
                  className="select__option-icon"
                  src={props.data.image.src}
                  alt={props.data.image.altText}
                />
                {props.data.label}
              </Option>
            )
          }}
          getOptionValue={getOptionValue}
          className="select__wrapper"
          classNamePrefix="select"
          id={this.props.fieldname}
          name={this.props.fieldname}
          options={this.state.options ? this.state.options : options}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        <style jsx global>{`
          .select__label {
            pointer-events: none;
            font-family: var(--font-primary);
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--color-primary);
            letter-spacing: 0.7px;
            left: 1.5em;
            text-transform: capitalize;
            z-index: 11;
          }

          .select__wrapper {
            position: relative;
            height: 3.75rem;
            width: 100%;
            margin-top: 0.5rem;
          }

          .select__control {
            height: 100%;
            border: none;
            border-radius: 3px;
          }

          .select__placeholder {
            color: #000;
            font-weight: 700;
          }

          .select__value-container {
            padding: 0 1em;
            position: relative;
          }

          .select__indicator-separator {
            display: none;
          }

          .select__dropdown-indicator {
            color: var(--color-primary);
          }

          .select__value-container .select__option {
            position: absolute;
          }

          .select__option {
            display: flex !important;
            align-items: center;
            font-weight: 700;
          }

           {
            /* .select__option + div {
            display: none;
          } */
          }

          .select__option-icon {
            display: inline-block;
            width: 30px;
            margin-right: 1em;
            background-color: #fff;
          }
        `}</style>
      </div>
    );
  }
}
