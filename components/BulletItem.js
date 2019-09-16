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
          color: #161621;
          font-size: 0.8rem;
          font-weight: 800;
          margin: 0;
          margin-left: 1.5em;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
