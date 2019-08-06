import React from "react"
import GiftIcon from "./Icons/GiftIcon"
import LocationIcon from "./Icons/LocationIcon"
import DollarIcon from "./Icons/DollarIcon"
import MoneyIcon from "./Icons/MoneyIcon"
import SignupIcon from "./Icons/SignupIcon"
import CrossIcon from "./Icons/CrossIcon"
import DiscountIcon from "./Icons/DiscountIcon"
import CalendarIcon from "./Icons/CalendarIcon"
import PlantIcon from "./Icons/PlantIcon"
import Co2Icon from "./Icons/Co2Icon"

export default class BulletItem extends React.Component {
  BulletIcon() {
    if (this.props.bulletIcon === "cross") {
      return <CrossIcon />
    } else if (this.props.bulletIcon === "discount") {
      return <DiscountIcon />
    } else if (this.props.bulletIcon === "calendar") {
      return <CalendarIcon />
    } else if (this.props.bulletIcon === "co2") {
      return <Co2Icon />
    } else if (this.props.bulletIcon === "signup") {
      return <SignupIcon />
    } else if (this.props.bulletIcon === "gift") {
      return <GiftIcon />
    } else if (this.props.bulletIcon === "money") {
      return <MoneyIcon />
    } else if (this.props.bulletIcon === "dollar") {
      return <DollarIcon />
    } else if (this.props.bulletIcon === "location") {
      return <LocationIcon />
    } else if (this.props.bulletIcon === "plant") {
      return <PlantIcon />
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="icon">{this.props.bulletIcon && this.BulletIcon()}</div>
        <p>{this.props.content}</p>
        <style jsx>{`
          .wrapper {
            display: grid;
            grid-template-columns: 1fr 5fr;
            align-items: center;
            margin: 0;
            margin-bottom: 5px;
          }

          .wrapper .icon {
            display: flex;
            align-self: center;
            justify-self: flex-end;
          }

          p {
            display: inline;
            color: --color-font;
            font-size: 0.8rem;
            font-weight: 800;
            margin: 0;
            margin-left: 1.5em;
            opacity: 1;
          }
        `}</style>
      </div>
    )
  }
}
