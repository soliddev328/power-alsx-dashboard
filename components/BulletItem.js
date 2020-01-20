import GiftIcon from "./Icons/GiftIcon";
import LocationIcon from "./Icons/LocationIcon";
import DollarIcon from "./Icons/DollarIcon";
import MoneyIcon from "./Icons/MoneyIcon";
import SignupIcon from "./Icons/SignupIcon";
import CrossIcon from "./Icons/CrossIcon";
import DiscountIcon from "./Icons/DiscountIcon";
import CalendarIcon from "./Icons/CalendarIcon";
import PlantIcon from "./Icons/PlantIcon";
import Co2Icon from "./Icons/Co2Icon";
import Check from "./Icons/Check";

const BulletIcon = bulletIcon => {
  if (bulletIcon === "cross") {
    return <CrossIcon />;
  } else if (bulletIcon === "discount") {
    return <DiscountIcon />;
  } else if (bulletIcon === "calendar") {
    return <CalendarIcon />;
  } else if (bulletIcon === "co2") {
    return <Co2Icon />;
  } else if (bulletIcon === "signup") {
    return <SignupIcon />;
  } else if (bulletIcon === "gift") {
    return <GiftIcon />;
  } else if (bulletIcon === "money") {
    return <MoneyIcon />;
  } else if (bulletIcon === "dollar") {
    return <DollarIcon />;
  } else if (bulletIcon === "location") {
    return <LocationIcon />;
  } else if (bulletIcon === "plant") {
    return <PlantIcon />;
  } else if (bulletIcon === "check") {
    return <Check />;
  }
};
export default function BulletItem({ bulletIcon, content }) {
  return (
    <div className="wrapper">
      <div className="icon">{bulletIcon && BulletIcon(bulletIcon)}</div>
      <p>{content}</p>
      <style jsx>{`
        .wrapper {
          display: grid;
          grid-template-columns: 30px 5fr;
          align-items: center;
          margin: 0;
          margin-bottom: 15px;
        }

        .wrapper .icon {
          display: flex;
          align-self: center;
          justify-self: flex-end;
        }

        p {
          display: inline;
          margin: 0;
          margin-left: 1.5em;
          opacity: 1;
          font-size: 16px;
          font-weight: normal;
          line-height: 1.63;
          letter-spacing: 0.5px;
          color: #555e80;
        }
      `}</style>
    </div>
  );
}
