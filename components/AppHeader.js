import React from 'react';
import LogoIcon from './Icons/LogoIcon';
import ProfilePic from './ProfilePic';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="wrapper">
        <header>
          <LogoIcon />
        </header>
        <style jsx>{`
          .wrapper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100vw;
            background-color: var(--color-bg-primary);
            border-bottom: 1px solid var(--color-secondary);
          }
          header {
            position: relative;
            max-width: 700px;
            padding: 0 2rem;
            margin: 0 auto;
          }
        `}</style>
      </div>
    );
  }
}
