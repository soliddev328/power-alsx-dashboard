import React from 'react';
import Router from 'next/router';
import { Form, withFormik } from 'formik';
import Header from '../../components/Header';
import Checkbox from '../../components/Checkbox';
import BulletItem from '../../components/BulletItem';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';

const formikEnhancer = withFormik({
  mapPropsToValues: props => {
    return {
      terms: props.agreement.terms,
      conditions: props.agreement.conditions
    };
  },
  mapValuesToPayload: x => x,
  handleSubmit: payload => {
    localStorage.setItem(
      'acceptedTermsAndConditions',
      JSON.stringify(payload.acceptedTermsAndConditions)
    );
    Router.push({
      pathname: '/onboarding/step5'
    });
  },
  displayName: 'CustomForm'
});

class CustomForm extends React.Component {
  render() {
    return (
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
            I accept the <a href={this.props.agreement.terms}>terms</a> and{' '}
            <a href={this.props.agreement.conditions}>conditions</a>.
          </p>
        </Checkbox>
        <p className="disclaimer">
          *Based on a 10% contracted discount to your utility over twenty years
        </p>
        <Button
          primary
          disabled={!this.props.values.acceptedTermsAndConditions}
        >
          Let's do this!
        </Button>
      </Form>
    );
  }
}

const EnhancedCustomForm = formikEnhancer(CustomForm);

class Step4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUtility: ''
    };
  }

  componentDidMount() {
    let utility = '';

    if (localStorage.getItem('utility')) {
      utility = JSON.parse(localStorage.getItem('utility'));
    }

    this.setState({ currentUtility: utility });
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          toast="Great news!"
          title="We've got a project in your area. We can lower your costs and your emissions right away!"
        >
          <EnhancedCustomForm
            agreement={{
              terms: this.state.currentUtility.terms,
              conditions: this.state.currentUtility.conditions
            }}
          />
        </SingleStep>
        <style jsx>{`
          main {
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
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
      </main>
    );
  }
}

export default Step4;