import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import axios from 'axios';
import GeoSuggest from '../../components/GeoSuggest';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';
import CONSTANTS from '../../globals';

const { API } =
  CONSTANTS.NODE_ENV !== 'production' ? CONSTANTS.dev : CONSTANTS.prod;

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  componentDidMount() {
    let storedName = '';

    if (localStorage.getItem('username')) {
      storedName = JSON.parse(localStorage.getItem('username'));
    }

    this.setState({ name: storedName });
  }

  capitalize(word) {
    return word && word[0].toUpperCase() + word.slice(1);
  }

  getPostalCode(values) {
    const components = values.address
      ? values.address.gmaps.address_components
      : null;

    const postalCode = components
      ? components.find(x => x.types[0] == 'postal_code')
      : null;

    return postalCode.long_name;
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          toast={`Nice to meet you ${this.capitalize(
            this.state.name.firstName
          )}.`}
          title="What is your home address?"
        >
          <Formik
            initialValues={{
              address: '',
              apt: ''
            }}
            onSubmit={values => {
              const arrayAddress = values.address.description.split(',');
              const street = arrayAddress[0];
              const city = arrayAddress[1].replace(/\s/g, '');
              const state = arrayAddress[2].replace(/\s/g, '');

              const address = {
                street: street,
                city: city,
                state: state,
                postalCode: this.getPostalCode(values),
                apt: values.apt ? values.apt : ''
              };

              localStorage.setItem('address', JSON.stringify(address));

              axios(`${API}/v1/zipcodes/${address.postalCode}`).then(
                response => {
                  if (
                    response.data.data.geostatus != 'Live' &&
                    response.data.data.geostatus != 'Near-Term'
                  ) {
                    Router.push({
                      pathname: '/onboarding/sorry'
                    });
                  } else {
                    Router.push({
                      pathname: '/onboarding/step3'
                    });
                  }
                }
              );
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <GeoSuggest
                    label="Address"
                    fieldname="address"
                    value={props.values.address}
                    onChange={props.setFieldValue}
                    onBlur={props.setFieldTouched}
                    error={props.errors.topics}
                    touched={props.touched.topics}
                  />
                  <Input label="Apartament No." fieldname="apt" />
                  <Button primary disabled={!props.values.address != ''}>
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

export default Step2;
