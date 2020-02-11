import { useState, useRef } from "react";
import { Field } from "formik";
import cn from "classnames";

function Input({
  fullWidth,
  noMargin,
  type,
  fieldname,
  validator,
  secondary,
  label,
  maxLength,
  style,
  value,
  readOnly,
  className,
  placeholder,
  scrollOnFocus = true,
  outerLabel
}) {
  const inputWrapper = useRef();
  const [displayLabel, setDisplayLabel] = useState(true);

  const applyValidation = x => {
    let msg;
    if (type === "email") {
      msg = "Please enter a valid email address";
    } else if (type === "password") {
      msg = "Please complete password fields";
    }
    x.target.setCustomValidity(msg);
  };

  const customSetCustomValidity = e => {
    e.target.setCustomValidity("");
    if (!outerLabel) {
      e.target.value !== "" ? setDisplayLabel(false) : setDisplayLabel(true);
    }
  };

  const scrollIntoViewOnFocus = () => {
    if (inputWrapper) {
      const offset = inputWrapper.current.getBoundingClientRect().top;
      setTimeout(() => {
        window.scrollTo(0, offset);
      }, 200);
    }
  };

  return (
    <div
      ref={inputWrapper}
      onClick={scrollOnFocus ? scrollIntoViewOnFocus : null}
      className={cn("input__wrapper", { "outer-label": outerLabel })}
    >
      <Field
        type={type ? type : "text"}
        name={fieldname}
        id={fieldname}
        validate={validator ? validator : false}
        onInvalid={applyValidation}
        onInput={customSetCustomValidity}
        readOnly={readOnly}
        value={value}
        style={style}
        placeholder={placeholder || ""}
        className={className}
        maxLength={maxLength}
      />
      <label htmlFor={fieldname} style={{ opacity: displayLabel ? "1" : "0" }}>
        {label}
      </label>
      <style jsx global>{`
        input {
          background-color: ${secondary ? "#F6F9FF" : "#fff"};
        }

        input:not([type="checkbox"]):active,
        input:not([type="checkbox"]):focus {
          ${readOnly ? "border-color: none !important;" : ""};
        }

        .input__wrapper {
          position: relative;
          width: 100%;
          max-width: ${fullWidth ? "100%;" : "350px;"};
          margin: 0 auto;
          margin-bottom: ${noMargin ? "0;" : "0.5rem;"};
          ${readOnly ? "pointer-events: none;" : ""};
        }

        .input__wrapper:last-of-type {
          margin-bottom: ${noMargin ? "0;" : "0.5rem;"};
        }

        .input__wrapper.outer-label {
          margin-bottom: 0;
          margin-top: 2em;
        }

        .input__wrapper.outer-label label {
          position: absolute;
          top: -25%;
        }

        .input__wrapper.outer-label {
          margin-bottom: 0;
          margin-top: 2em;
        }

        .input__wrapper.outer-label label {
          position: absolute;
          top: -25%;
        }
      `}</style>
    </div>
  );
}

export default Input;
