import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import Header from '../../components/Header';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';
import CustomSelect from '../../components/CustomSelect';

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: ''
    };
  }

  static async getInitialProps({ query }) {
    const props = {
      name: { firstName: query.firstName, lastName: query.lastName },
      address: {
        street: query.street,
        postalCode: query.postalCode,
        apt: query.apt
      }
    };

    return props;
  }

  componentDidMount() {
    console.log(this.props.address.postalCode);
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep title="And who provides your electric service today?">
          <Formik
            initialValues={{
              currentUtility: ''
            }}
            onSubmit={values => {
              Router.push({
                pathname: '/onboarding/step4',
                query: {
                  firstName: this.props.name.firstName,
                  lastName: this.props.name.lastName,
                  street: this.props.address.street,
                  apt: this.props.address.apt,
                  currentUtility: values.currentUtility.code
                }
              });
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <CustomSelect
                    postalCode={this.props.address.postalCode}
                    value={props.values.currentUtility}
                    onChange={props.setFieldValue}
                    onBlur={props.setFieldTouched}
                    error={props.errors.topics}
                    touched={props.touched.topics}
                    label="Utility Name"
                    fieldname="currentUtility"
                  />
                  <Button primary disabled={!props.values.currentUtility != ''}>
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
