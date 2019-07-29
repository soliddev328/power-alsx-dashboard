import React from "react"
import Select, { components } from "react-select"
import axios from "axios"
import CONSTANTS from "../globals"

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod

export default class CustomSelect extends React.Component {
  constructor(props) {
    super(props)

    this.inputField = React.createRef()

    this.state = {
      options: null,
      singleOption: false
    }

    this.scrollOnFocus = this.scrollOnFocus.bind(this)
  }

  componentDidMount() {
    this.getOptions(this.props.zipCode)
  }

  componentDidUpdate(prevProps) {
    if (this.props.zipCode !== prevProps.zipCode) {
      this.getOptions(this.props.zipCode)
    }
  }

  scrollOnFocus() {
    if (this.inputField) {
      const offset = this.inputField.current.getBoundingClientRect().top
      setTimeout(() => {
        window.scrollTo(0, offset)
      }, 200)
    }
  }

  handleChange = value => {
    this.props.onChange(this.props.fieldname, value)
  }

  handleBlur = () => {
    this.props.onBlur(this.props.fieldname, true)
  }

  getOptions(code) {
    if (code && code.length > 4) {
      let newOptions = []

      axios(`${API}/v1/zipcodes/${code}`).then(response => {
        const utilities = response.data.data.utilities.split(",")
        let terms = ""
        let conditions = ""

        if (
          response.data.data.utilities &&
          response.data.data.utilities.length
        ) {
          if (response.data.data.agreement) {
            terms = response.data.data.agreement.termsLink
            conditions = response.data.data.agreement.conditionsLink
          }

          utilities.map((item, i) => {
            const imageName = item.replace(/\s/g, "")
            const utilityInfo = {
              code: i + 1,
              image: {
                src: imageName
                  ? `/static/images/utilities/${imageName}.png`
                  : "/static/images/utilities/placeholder.png",
                altText: "Utility logo"
              },
              terms: terms,
              conditions: conditions,
              label: item
            }
            // hack since Richard asked for this to be done in the next hour
            if (item == "ConEd" || item == "ORU") utilityInfo.paperOnly = true
            newOptions.push(utilityInfo)
          })
        } else {
          newOptions = null
        }

        // Filter on utilities. Some partners pass that info to us
        const storedUtility = localStorage.getItem("utility")
        if (storedUtility) {
          const results = newOptions.filter(item => item.label == storedUtility)
          if (results.length > 0) newOptions = results
        }

        this.setState({
          options: newOptions,
          singleOption: utilities.length === 1 && utilities[0] !== ""
        })
      })

      return newOptions.length
    }
  }

  render() {
    const { Option } = components
    const CustomOption = props => (
      <Option {...props}>
        <img
          className="select__option-icon"
          src={props.data.image.src}
          alt={props.data.image.altText}
        />
        {props.data.label}
      </Option>
    )

    const getOptionValue = option => option.code
    const { options = false } = this.state

    return (
      <div ref={this.inputField} onClick={this.scrollOnFocus}>
        <label className="select__label" htmlFor={this.props.fieldname}>
          {this.props.label}
        </label>
        <Select
          isDisabled={!options || this.props.disabled}
          isSearchable={false}
          components={{
            SingleValue: CustomOption,
            Option: CustomOption
          }}
          getOptionValue={getOptionValue}
          className="select__wrapper"
          classNamePrefix="select"
          id={this.props.fieldname}
          name={this.props.fieldname}
          options={options && options.length > 0 ? options : false}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={
            options && options.length === 1 ? options[0] : this.props.value
          }
          placeholder="Select your utility"
        />
        <style jsx global>{`
          .select__label {
            pointer-events: none;
            font-family: "Poppins", -apple-system, BlinkMacSystemFont,
              "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
              "Helvetica Neue", sans-serif;
            font-size: 0.75rem;
            font-weight: 600;
            color: #2479ff;
            letter-spacing: 0.7px;
            left: 1.5em;
            text-transform: capitalize;
            z-index: 11;
          }

          .select__wrapper {
            position: relative;
            height: 3.75rem;
            width: 100%;
            max-width: 350px;
            margin: 0.5rem auto;
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
            color: #2479ff;
          }

          .select__value-container .select__option {
            position: absolute;
          }

          .select__menu {
            z-index: 100;
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
    )
  }
}
