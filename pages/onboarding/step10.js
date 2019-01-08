import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';
import CTA from '../../components/CTA';

class Step10 extends React.Component {
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

  componentDidMount() {}

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          prefix="Ok great."
          title="What is your utility account number"
        >
          <Formik
            initialValues={{
              utilityAccountNumber: ''
            }}
            onSubmit={values => {
              Router.push({
                pathname: '/onboarding/step11',
                query: {
                  utilityAccountNumber: values.utilityAccountNumber
                }
              });
            }}
            render={props => (
              <React.Fragment>
                <figure>
                  <img
                    src="/static/images/utilities/brand.png"
                    alt="national grid brand logo"
                  />
                </figure>
                <Form>
                  <Input
                    label="Account number"
                    fieldname="utilityAccountNumber"
                  />
                  <Button
                    primary
                    disabled={!props.values.utilityAccountNumber != ''}
                  >
                    Next
                  </Button>
                  <CTA>Find your account No.</CTA>
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
          figure {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            margin: 0;
            margin-bottom: 1em;
            padding: 1em;
          }

          img {
            max-width: 60%;
          }
        `}</style>
      </main>
    );
  }
}

export default Step10;
