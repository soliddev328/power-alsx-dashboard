import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';

class Step5 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      acceptedTermsAndConditions: ''
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
      currentUtility: query.currentUtility,
      acceptedTermsAndConditions: query.acceptedTermsAndConditions
    };

    return props;
  }

  componentDidMount() {}

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          toast="Great"
          title="What phone number and email would you like to use to create your account?"
        >
          <Formik
            initialValues={{
              phoneNumber: '',
              emailAddress: ''
            }}
            onSubmit={values => {
              const props = this.props;
              axios
                .post(
                  'https://comenergy-api-staging.herokuapp.com/v1/subscribers',
                  {
                    FirstName: props.name.firstName,
                    LastName: props.name.lastName,
                    Phone: values.phoneNumber,
                    Email: values.emailAddress
                  }
                )
                .then(function(response) {
                  Router.push({
                    pathname: '/onboarding/step6',
                    query: {
                      name: props.name.firstName,
                      address: props.address.street,
                      currentUtility: props.currentUtility,
                      phoneNumber: values.phoneNumber,
                      emailAddress: values.emailAddress
                    }
                  });
                })
                .catch(function(error) {
                  console.log(error);
                });
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <Input type="tel" label="Phone" fieldname="phoneNumber" />
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

export default Step5;
