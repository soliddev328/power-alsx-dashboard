import Input from "./Input"
import Button from "./Button"
import cn from "classnames"

export default function SegmentedInput({
  inputLabel,
  buttonText,
  hasBorder,
  onClick
}) {
  return (
    <div className="wrapper">
      <input type="text" className={cn({ "has-border": hasBorder })} />
      <Button maxWidth="170px" primary onClick={onClick}>
        {buttonText}
      </Button>
      <style jsx>{`
        .wrapper {
          display: flex;
          align-items: center;
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
      `}</style>
    </div>
  )
}
