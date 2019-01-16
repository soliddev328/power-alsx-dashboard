import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import Header from '../../components/Header';
import RadioCard from '../../components/RadioCard';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';
import CONSTANTS from '../../globals';

const { API } =
  CONSTANTS.NODE_ENV !== 'production' ? CONSTANTS.dev : CONSTANTS.prod;

class Step6 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let storedLeadId = '';
    let storedUtility = '';
    let storedAgreementChecked = false;
    let storedAddress = '';

    if (localStorage.getItem('leadId')) {
      storedLeadId = localStorage.getItem('leadId');
    }
    if (localStorage.getItem('utility')) {
      storedUtility = JSON.parse(localStorage.getItem('utility'));
    }
    if (localStorage.getItem('acceptedTermsAndConditions')) {
      storedAgreementChecked = JSON.parse(
        localStorage.getItem('acceptedTermsAndConditions')
      );
    }
    if (localStorage.getItem('address')) {
      storedAddress = JSON.parse(localStorage.getItem('address'));
    }

    this.setState({
      leadId: storedLeadId,
      utility: storedUtility.label,
      address: storedAddress,
      agreedTermsAndConditions: storedAgreementChecked
    });
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep title="Do you have an on-line account with your electric utility?">
          <Formik
            initialValues={{
              billingMethod: ''
            }}
            onSubmit={values => {
              localStorage.setItem('billingMethod', JSON.stringify(values));
              Router.push({
                pathname: '/onboarding/step7'
              });
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <RadioCard
                    number="1"
                    name="billingMethod"
                    value="electronic"
                    heading="Yes"
                  />
                  <RadioCard
                    number="2"
                    name="billingMethod"
                    value="paper"
                    heading="No"
                  />
                  <Button primary disabled={!props.values.billingMethod != ''}>
                    Next
                  </Button>
                </Form>
              </React.Fragment>
            )}
          />
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

export default Step6;
