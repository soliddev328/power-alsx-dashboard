import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Phoneinput from '../../components/Phoneinput';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';
import CONSTANTS from '../../globals';

const { API } =
  CONSTANTS.NODE_ENV !== 'production' ? CONSTANTS.dev : CONSTANTS.prod;

class Step5 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let storedName = '';
    let storedUtility = '';
    let storedAgreementChecked = false;
    let storedAddress = '';

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

    if (localStorage.getItem('username')) {
      storedName = JSON.parse(localStorage.getItem('username'));
    }

    this.setState({
      name: storedName,
      utility: storedUtility.label,
      address: storedAddress,
      agreedTermsAndConditions: storedAgreementChecked
    });
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          toast="Ok, now for the fun stuff!"
          title="What email and phone number would you like to use to create your account?"
        >
          <Formik
            initialValues={{
              phoneNumber: '',
              emailAddress: ''
            }}
            onSubmit={values => {
              localStorage.setItem('email', values.emailAddress);
              localStorage.setItem('phone', values.phoneNumber);
              axios
                .post(`${API}/v1/subscribers`, {
                  FirstName: this.state.name.firstName,
                  LastName: this.state.name.lastName,
                  Phone: values.phoneNumber,
                  Email: values.emailAddress,
                  street: this.state.address.street,
                  state: this.state.address.state,
                  city: this.state.address.city,
                  postalCode: this.state.address.postalCode,
                  agreementChecked: !!this.state.agreedTermsAndConditions,
                  utility: this.state.utility
                })
                .then(function(response) {
                  localStorage.setItem('leadId', response.data.data.leadId);
                  Router.push({
                    pathname: '/onboarding/step6'
                  });
                })
                .catch(function(error) {
                  console.log(error);
                });
            }}
            render={props => (
              <Form>
                <Phoneinput
                  value={props.values.phoneNumber}
                  onChangeEvent={props.setFieldValue}
                  onBlurEvent={props.setFieldTouched}
                  label="Phone"
                  fieldname="phoneNumber"
                />
                <Input
                  type="email"
                  label="Email"
                  fieldname="emailAddress"
                  required
                />
                <Button
                  primary
                  disabled={
                    !props.values.phoneNumber != '' ||
                    !props.values.emailAddress != ''
                  }
                >
                  Next
                </Button>
              </Form>
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

export default Step5;
