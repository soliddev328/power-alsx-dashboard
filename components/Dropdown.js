import { useRef } from "react";
import Select from "react-select";

function Dropdown({
  options,
  onChange,
  onBlur,
  fieldname,
  label,
  disabled,
  value,
  placeholder
}) {
  const inputField = useRef(null);

  const scrollOnFocus = () => {
    if (inputField) {
      const offset = inputField.current.getBoundingClientRect().top;
      setTimeout(() => {
        window.scrollTo(0, offset);
      }, 200);
    }
  };

  const handleChange = value => {
    onChange(fieldname, value);
  };

  const handleBlur = () => {
    onBlur(fieldname, true);
  };

  return (
    <div ref={inputField} onClick={scrollOnFocus}>
      <label className="select__label" htmlFor={fieldname}>
        {label}
      </label>
      <Select
        isDisabled={!options || disabled}
        isSearchable={false}
        className="select__wrapper"
        classNamePrefix="select"
        id={fieldname}
        name={fieldname}
        options={options && options.length > 0 ? options : false}
        onChange={handleChange}
        onBlur={handleBlur}
        value={options && options.length === 1 ? options[0] : value}
        placeholder={placeholder || ""}
      />
    </div>
  );
}

export default Dropdown;
