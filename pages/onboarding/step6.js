import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import Header from '../../components/Header';
import RadioCard from '../../components/RadioCard';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';

class Step6 extends React.Component {
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
          toast="Ok, now the fun stuff."
          title="How do you receive your electricity bill today?"
        >
          <Formik
            initialValues={{
              billingMethod: ''
            }}
            onSubmit={values => {
              Router.push({
                pathname: '/onboarding/step7',
                query: {
                  billingMethod: values.billingMethod
                }
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
