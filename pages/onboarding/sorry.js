import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import Input from '../../components/Input';
import Header from '../../components/Header';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';

class Sorry extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          toast="I'm Sorry"
          title="We don't have a project in your area at this time. Join our subscriber list and help us get one!"
        >
          <Formik
            initialValues={{
              email: ''
            }}
            onSubmit={values => {
              Router.push({
                pathname: '/',
                query: { email: values.email }
              });
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <Input label="email" fieldname="email" />
                  <Button primary disabled={!props.values.email != ''}>
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

export default Sorry;
