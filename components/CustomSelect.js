import React from 'react';
import Select, { components } from 'react-select';
import axios from 'axios';
import CONSTANTS from '../globals';

const { API } =
  CONSTANTS.NODE_ENV !== 'production' ? CONSTANTS.dev : CONSTANTS.prod;

export default class CustomSelect extends React.Component {
  constructor(props) {
    super(props);

    this.inputField = React.createRef();

    this.state = {
      address: '',
      options: null
    };

    this.scrollOnFocus = this.scrollOnFocus.bind(this);
  }

  componentDidMount() {
    let storedAddress = '';

    if (localStorage.getItem('address')) {
      storedAddress = localStorage.getItem('address');
    }

    this.setState({ address: JSON.parse(storedAddress) });
  }

  scrollOnFocus() {
    setTimeout(() => {
      window.scrollTo(0, this.inputField.current.getBoundingClientRect().top);
    }, 200);
  }

  componentDidUpdate() {
    this.getOptions(this.state.address.postalCode);
  }

  handleChange = value => {
    this.props.onChange(this.props.fieldname, value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.fieldname, true);
  };

  getOptions(code) {
    if (code && this.state.options === null) {
      let newOptions = [];
      axios(`${API}/v1/zipcodes/${code}`).then(response => {
        const utilities = response.data.data.utilities.split(',');
        const terms =
          response.data.data.agreement.termsLink ||
          response.data.data.agreement.link ||
          '';
        const conditions =
          response.data.data.agreement.conditionsLink ||
          response.data.data.agreement.link ||
          '';

        utilities.map((item, i) => {
          const imageName = item.replace(/\s/g, '');
          newOptions.push({
            code: i + 1,
            image: {
              src: `/static/images/utilities/${imageName}.png`,
              altText: 'Utility logo'
            },
            terms: terms,
            conditions: conditions,
            label: item
          });
        });

        this.setState({ options: newOptions });
      });
    }
  }

  render() {
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
      <div ref={this.inputField} onClick={this.scrollOnFocus}>
        {this.state.options && (
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
              options={this.state.options}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.props.value}
            />
          </div>
        )}
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
