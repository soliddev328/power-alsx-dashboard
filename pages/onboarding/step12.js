import React from 'react';
import Router from 'next/router';
import Header from '../../components/Header';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';
import CTA from '../../components/CTA';

class Step12 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shared: false,
      canonicalUrl: ''
    };
  }

  componentDidMount() {
    const canonicalUrl =
      document.querySelector("meta[property='canonical']") || null;

    if (canonicalUrl) {
      this.setState({
        canonicalUrl: canonicalUrl.getAttribute('content')
      });
    }
  }

  share() {
    let shareCompleted = false;
    FB.ui(
      {
        method: 'share',
        href: window.location.href
      },
      function(response) {
        if (response) {
          shareCompleted = true;
        }
      }
    );
    this.setState({ shared: shareCompleted });
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          toast="Help us spread the word:"
          title="Receive a free month of electricity for each referral!"
          image={{
            src: '/static/images/share/share.png',
            alt: 'An illustration of people enjoying renewable energy'
          }}
        >
          <Button primary share="facebook" onClick={() => this.share()}>
            Share this image on Facebook
          </Button>
          <Button
            primary
            onClick={() => {
              localStorage.setItem('usercreated', true);
              Router.push({
                pathname: '/dashboard'
              });
            }}
            disabled={!this.state.shared}
          >
            Finish!
          </Button>
          <CTA
            secondary
            onClick={() => {
              localStorage.setItem('usercreated', true);
              Router.push({
                pathname: '/dashboard'
              });
            }}
          >
            Skip this step
          </CTA>
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

export default Step12;
