import React from 'react';
import Router from 'next/router';
import Header from '../../components/Header';
import { FadeLoader } from 'react-spinners';
import SingleStep from '../../components/SingleStep';

class Step8 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkedUtility: null
    };
  }

  componentDidMount() {
    let storedLinkedUtility = '';

    if (localStorage.getItem('linkedUtility')) {
      storedLinkedUtility = JSON.parse(localStorage.getItem('linkedUtility'));
    }

    this.setState({
      linkedUtility: storedLinkedUtility
    });
  }

  renderLoader() {
    setTimeout(() => {
      Router.push({
        pathname: '/onboarding/step9'
      });
    }, 4000);

    return (
      <SingleStep>
        <div className="loading">
          <FadeLoader
            className="spinner"
            height={15}
            width={4}
            radius={1}
            color={'#FF69A0'}
            loading={true}
          />
          <p>Connecting your account</p>
        </div>
        <p className="suffix">(this may take up to 10 seconds)</p>
        <style jsx>{`
          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .loading p {
            font-size: 1rem;
            text-align: center;
          }

          p.suffix {
            font-size: 0.8rem;
          }
        `}</style>
      </SingleStep>
    );
  }

  renderManualConnect() {
    return (
      <SingleStep>
        <div className="loading">
          {this.state.linkedUtility && (
            <p>{this.state.linkedUtility.message}</p>
          )}
        </div>
        <style jsx>{`
          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .loading p {
            font-size: 1rem;
            text-align: center;
          }
        `}</style>
      </SingleStep>
    );
  }

  render() {
    return (
      <main>
        <Header />
        {this.state.linkedUtility && !this.state.linkedUtility.data
          ? this.renderLoader()
          : this.renderManualConnect()}
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

export default Step8;
