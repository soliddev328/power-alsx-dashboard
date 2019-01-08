import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';
import CTA from '../../components/CTA';

class Step7 extends React.Component {
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
          toast="Ok great."
          title="Now let's connect your account and get you saving!"
        >
          <Formik
            initialValues={{
              utilityUser: '',
              utilityPassword: ''
            }}
            onSubmit={values => {
              Router.push({
                pathname: '/onboarding/step8',
                query: {
                  utilityUser: values.utilityUser,
                  utilityPassword: values.utilityPassword
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
                  <Input label="User name" fieldname="utilityUser" />
                  <Input
                    type="password"
                    label="Password"
                    fieldname="utilityPassword"
                  />
                  <Button
                    primary
                    disabled={
                      !props.values.utilityUser != '' ||
                      !props.values.utilityPassword != ''
                    }
                  >
                    Next
                  </Button>
                  <CTA>Create an account</CTA>
                  <CTA>Forgot username</CTA>
                  <CTA>Forgot password</CTA>
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

export default Step7;
