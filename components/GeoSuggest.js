import { useRef } from "react";
import Geosuggest from "react-geosuggest";

function GeoSuggest({ onChange, onBlur, fieldname, label, value }) {
  const inputField = useRef();

  const handleChange = value => {
    if (value.description) {
      onChange(fieldname, value);
    }
  };

  const handleBlur = () => {
    const nextField = document.getElementById("apt");

    if (nextField) {
      nextField.focus();
    }

    onBlur(fieldname, true);
  };

  const handleSuggestSelect = e => {
    if (e) {
      const nextField = document.getElementById("apt");
      handleChange(e);

      if (nextField) {
        nextField.focus();
      }
    }
  };

  const scrollOnFocus = () => {
    if (inputField) {
      const offset = inputField.current.getBoundingClientRect().top;
      setTimeout(() => {
        window.scrollTo(0, offset);
      }, 200);
    }
  };

  return (
    <div ref={inputField} onClick={scrollOnFocus}>
      <Geosuggest
        onSuggestSelect={handleSuggestSelect}
        placeholder={label}
        onChange={handleChange}
        onBlur={handleBlur}
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

export default GeoSuggest;
