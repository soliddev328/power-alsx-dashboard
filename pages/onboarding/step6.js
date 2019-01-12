import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import axios from 'axios';
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

    this.setState({
      leadId: storedLeadId,
      utility: storedUtility.label,
      agreedTermsAndConditions: storedAgreementChecked
    });
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          toast="Ok, now the fun stuff."
          title="How do you receive your electricity bill today?"
        >
          <Formik
            initialValues={{
              billingMethod: ''
            }}
            onSubmit={values => {
              localStorage.setItem('billingMethod', JSON.stringify(values));
              axios
                .put(`${API}/v1/subscribers`, {
                  leadId: this.state.leadId,
                  agreementChecked: this.state.agreedTermsAndConditions,
                  utility: this.state.utility
                })
                .then(function(response) {
                  Router.push({
                    pathname: '/onboarding/step7'
                  });
                })
                .catch(function(error) {
                  console.log(error);
                });
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <RadioCard
                    number="1"
                    name="billingMethod"
                    value="electronic"
                    heading="Email or On-Line"
                  />
                  <RadioCard
                    number="2"
                    name="billingMethod"
                    value="paper"
                    heading="Paper/Mail"
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
