import React from 'react';
import CrossIcon from './Icons/CrossIcon';
import DiscountIcon from './Icons/DiscountIcon';
import CalendarIcon from './Icons/CalendarIcon';
import Co2Icon from './Icons/Co2Icon';

export default class BulletItem extends React.Component {
  constructor(props) {
    super(props);
  }

  BulletIcon() {
    if (this.props.bulletIcon === 'cross') {
      return <CrossIcon />;
    } else if (this.props.bulletIcon === 'discount') {
      return <DiscountIcon />;
    } else if (this.props.bulletIcon === 'calendar') {
      return <CalendarIcon />;
    } else if (this.props.bulletIcon === 'co2') {
      return <Co2Icon />;
    }
  }

  render() {
    return (
      <div className="wrapper">
        {this.props.bulletIcon && this.BulletIcon()}
        <p>{this.props.content}</p>
        <style jsx>{`
          .wrapper {
            margin: 1em 0;
          }

          p {
            display: inline;
            font-size: 1.125rem;
            font-weight: 800;
            margin-left: 1.5em;
            opacity: 1;
          }
        `}</style>
      </div>
    );
  }
}
