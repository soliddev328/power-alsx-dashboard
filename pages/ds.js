import React from 'react';
import MultiStep from '../components/MultiStep';
import LogoIcon from '../components/Icons/LogoIcon';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import CTA from '../components/CTA';
import BulletItem from '../components/BulletItem';
import Blockquote from '../components/Blockquote';
import CrossIcon from '../components/Icons/CrossIcon';
import DiscountIcon from '../components/Icons/DiscountIcon';
import CalendarIcon from '../components/Icons/CalendarIcon';
import LeafIcon from '../components/Icons/LeafIcon';
import LightningIcon from '../components/Icons/LightningIcon';
import NotificationIcon from '../components/Icons/NotificationIcon';
import SunIcon from '../components/Icons/SunIcon';
import BagIcon from '../components/Icons/BagIcon';
import Card from '../components/Card';

class DesignSystem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="wrapper">
        <h3>Logo component</h3>
        <div className="container">
          <LogoIcon />
        </div>

        <h3>H1 component</h3>
        <div className="container">
          <h1>This is a h1 text</h1>
        </div>

        <h3>H2 component</h3>
        <div className="container">
          <h2>This is a h2 text</h2>
        </div>

        <h3>H3 component</h3>
        <div className="container">
          <h3>This is a h3 text</h3>
        </div>

        <h3>Label component</h3>
        <div className="container">
          <h4>This is a label</h4>
        </div>

        <h3>Paragraph component</h3>
        <div className="container">
          <p>
            This is a paragraph <br /> Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Omnis ipsum alias dignissimos quod esse assumenda,
            ut facilis ullam? Dolor maiores quo corporis neque non sunt
            molestiae expedita vitae, ducimus voluptates.
          </p>
        </div>

        <h3>Icons components</h3>
        <div className="container">
          <div className="icon">
            <CrossIcon />
          </div>
          <div className="icon">
            <DiscountIcon />
          </div>
          <div className="icon">
            <CalendarIcon />
          </div>

          <div className="icon">
            <LightningIcon />
          </div>
          <div className="icon">
            <LeafIcon />
          </div>
          <div className="icon">
            <NotificationIcon number="2" />
          </div>
          <div className="icon">
            <SunIcon />
          </div>
          <div className="icon">
            <BagIcon />
          </div>
        </div>

        <h3>Checkbox component</h3>
        <div className="container">{/* <Checkbox /> */}</div>

        <h3>Primary button component</h3>
        <div className="container">
          <Button primary>Action</Button>
        </div>

        <h3>Secondary button component</h3>
        <div className="container">
          <Button secondary>Action</Button>
        </div>

        <h3>Primary button with arrow component</h3>
        <div className="container">
          <Button arrow primary>
            Next step
          </Button>
        </div>

        <h3>Secondary button with share icon component</h3>
        <div className="container">
          <Button secondary share="facebook">
            Share
          </Button>
        </div>

        <h3>Bullet component</h3>
        <div className="container">
          <BulletItem content="10% contracted discount" bulletIcon="discount" />
          <BulletItem content="1 year term" bulletIcon="calendar" />
          <BulletItem content="No cancelation fees" bulletIcon="cross" />
        </div>

        <h3>Card component</h3>
        <div className="container">
          <Card
            stepNumber="1"
            image={{
              src: '/static/images/illustrations/signup.png',
              srcset:
                '/static/images/illustrations/signup.png 1x, /static/images/illustrations/signup2x.png 2x',
              alt: 'checkmark and people talking illustration'
            }}
            title="Sign up"
            content="You sign up for lower cost clean energy from Common Energy."
          />
        </div>

        <h3>Blockquote component</h3>
        <div className="container">
          <Blockquote
            cite={{
              name: 'Carol',
              city: 'Syracuse',
              state: 'NY',
              image: {
                src: '/static/images/quotes/test.png',
                srcSet:
                  '/static/images/quotes/test.png 1x, /static/images/quotes/test2x.png 2x'
              },
              text:
                'Ad per nemore aliquam, sea graece scripta eu, at nulla veritus dissentias sit. Reque appareat phaedrum cu si.'
            }}
          />
        </div>

        <h3>Multi step form component</h3>
        <div className="container">
          <MultiStep />
        </div>

        <style jsx>{`
          .wrapper h3 {
            text-align: center;
          }
          .container {
            width: 375px;
            margin: 1em auto;
            margin-bottom: 4em;
            padding: 15px;
            border: 1px solid var(--color-secondary);
          }

          .icon {
            text-align: center;
            margin: 1rem;
          }
        `}</style>
      </div>
    );
  }
}

export default DesignSystem;
