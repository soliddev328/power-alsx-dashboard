import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import Header from '../../components/Header';
import { FadeLoader } from 'react-spinners';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';
import CTA from '../../components/CTA';

class Step8 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  static async getInitialProps({ query }) {
    const props = {
      name: query.name
    };

    return props;
  }

  componentDidMount() {
    setTimeout(() => {
      Router.push({
        pathname: '/onboarding/step9'
      });
    }, 4000);
  }

  render() {
    return (
      <main>
        <Header />
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
        </SingleStep>
        <style jsx>{`
          main {
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .loading p {
            font-size: 1rem;
            margin-left: 1em;
          }

          p.suffix {
            font-size: 0.8rem;
          }
        `}</style>
      </main>
    );
  }
}

export default Step8;
