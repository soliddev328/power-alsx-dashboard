import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';
import CTA from '../../components/CTA';

class Step13 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shared: false
    };
  }

  componentDidMount() {}

  share() {
    this.setState({ shared: true });
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          toast="Spread the word."
          title="Connect 10 friends and get free electricity for a year!"
          image={{
            src: '/static/images/share/share.png',
            alt: 'An illustration of people enjoying renewable energy'
          }}
        >
          <Button primary share="facebook" onClick={() => this.share()}>
            Share this on Facebook
          </Button>
          <Button
            primary
            onClick={() => {
              Router.push({
                pathname: '/dashboard',
                query: {
                  code: 1
                }
              });
            }}
            disabled={!this.state.shared}
          >
            Finish!
          </Button>
          <CTA secondary>Skip this step</CTA>
        </SingleStep>
        <style jsx>{`
          main {
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
        `}</style>
      </main>
    );
  }
}

export default Step13;
