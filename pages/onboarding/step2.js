import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import GeoSuggest from '../../components/GeoSuggest';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  static async getInitialProps({ query }) {
    const props = {
      name: {
        firstName: query.firstName,
        lastName: query.lastName
      }
    };

    return props;
  }

  componentDidMount() {}

  capitalize(word) {
    return word && word[0].toUpperCase() + word.slice(1);
  }

  getPostalCode(values) {
    const components = values ? values.address.gmaps.address_components : null;

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
            this.props.name.firstName
          )}.`}
          title="What is your home address?"
        >
          <Formik
            initialValues={{
              address: '',
              apt: ''
            }}
            onSubmit={values => {
              Router.push({
                pathname: '/onboarding/step3',
                query: {
                  firstName: this.props.name.firstName,
                  lastName: this.props.name.lastName,
                  street: values.address.description,
                  postalCode: this.getPostalCode(values),
                  apt: values.apt
                }
              });
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
