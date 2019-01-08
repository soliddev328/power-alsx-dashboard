import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import Header from '../../components/Header';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import BulletItem from '../../components/BulletItem';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';

class Step4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUtility: ''
    };
  }

  static async getInitialProps({ query }) {
    const props = {
      name: {
        firstName: query.firstName,
        lastName: query.lastName
      },
      address: {
        street: query.street,
        apt: query.apt
      },
      currentUtility: query.currentUtility
    };

    return props;
  }

  componentDidMount() {}

  renderSuccess() {
    return (
      <SingleStep
        toast="Great news!"
        title="We've got a project in your area. We can lower your costs and your emissions right away!"
      >
        <Formik
          initialValues={{
            acceptedTermsAndConditions: ''
          }}
          onSubmit={values => {
            Router.push({
              pathname: '/onboarding/step5',
              query: {
                firstName: this.props.name.firstName,
                lastName: this.props.name.lastName,
                street: this.props.address.street,
                apt: this.props.address.apt,
                currentUtility: this.props.currentUtility,
                acceptedTermsAndConditions: values.acceptedTermsAndConditions
              }
            });
          }}
          render={props => (
            <Form>
              <div className="content">
                <BulletItem content="Free signup" bulletIcon="money" />
                <BulletItem
                  content="$2,276 estimated total savings*"
                  bulletIcon="gift"
                />
                <BulletItem
                  content="72,000 pounds of CO2 prevented in your community"
                  bulletIcon="co2"
                />
                <BulletItem
                  content="One unified monthly statement from Common Energy"
                  bulletIcon="discount"
                />
                <BulletItem content="No cancelation fees" bulletIcon="cross" />
              </div>
              <Checkbox fieldname="acceptedTermsAndConditions">
                <p className="checkbox__label">
                  I accept the <a href="">terms</a> and{' '}
                  <a href="">conditions</a>.
                </p>
              </Checkbox>
              <p className="disclaimer">
                *Based on a 10% contracted discount to your utility over twenty
                years
              </p>
              <Button
                primary
                disabled={!props.values.acceptedTermsAndConditions}
              >
                Let's do this!
              </Button>
            </Form>
          )}
        />
        <style jsx>{`
          .content {
            margin: 0 auto;
          }
          .disclaimer {
            text-align: center;
            font-size: 0.8rem;
            margin-top: 0;
          }
          .checkbox__label {
            margin: 0.5em;
          }
        `}</style>
      </SingleStep>
    );
  }

  renderFailed() {
    return (
      <SingleStep
        toast="I'm Sorry"
        title="We don't have a project in your area at this time. Join our subscriber list and help us get one!"
      >
        <Formik
          initialValues={{
            email: ''
          }}
          onSubmit={values => {
            Router.push({
              pathname: '/',
              query: { email: values.email }
            });
          }}
          render={props => (
            <React.Fragment>
              <Form>
                <Input label="email" fieldname="email" />
                <Button primary disabled={!props.values.email != ''}>
                  Next
                </Button>
              </Form>
            </React.Fragment>
          )}
        />
      </SingleStep>
    );
  }

  render() {
    return (
      <main>
        <Header />
        {this.props.currentUtility != 0
          ? this.renderSuccess()
          : this.renderFailed()}
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

export default Step4;
