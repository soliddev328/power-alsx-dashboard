import React from 'react';
import MultiStep from '../components/MultiStep';
import LogoIcon from '../components/Icons/LogoIcon';
import RadioCard from '../components/RadioCard';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <main>
        <LogoIcon />
        <MultiStep />
        <style jsx>{`
          main {
            max-width: 375px;
            margin: 0 auto;
          }
        `}</style>
      </main>
    );
  }
}

export default Index;
