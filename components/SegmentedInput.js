import Input from "./Input";
import Button from "./Button";
import cn from "classnames";

export default function SegmentedInput({
  inputLabel,
  buttonText,
  hasBorder,
  onClick
}) {
  return (
    <div className="wrapper">
      <input
        type="text"
        htmlFor="segmented-field"
        className={cn({ "has-border": hasBorder })}
      />
      <label htmlFor="segmented-field">{inputLabel}</label>
      <Button maxWidth="170px" primary onClick={onClick}>
        {buttonText}
      </Button>
      <style jsx>{`
        .wrapper {
          display: flex;
          align-items: center;
          position: relative;
          height: 3.75rem;
          width: 100%;
          margin: 0 auto;
          margin-bottom: 0.5rem;
        }
        .wrapper input {
          max-height: 53px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right: none;
        }
        .wrapper input.has-border {
          border: 1px solid #2479ff;
        }

        .wrapper :global(button) {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          text-transform: capitalize;
        }

        label {
          position: absolute;
          top: -25%;
        }
      `}</style>
    </div>
  );
}
