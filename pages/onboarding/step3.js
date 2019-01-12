import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import Header from '../../components/Header';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';
import CustomSelect from '../../components/CustomSelect';

class Step3 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

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
              localStorage.setItem(
                'utility',
                JSON.stringify(values.currentUtility)
              );

              Router.push({
                pathname: '/onboarding/step4'
              });
            }}
            render={props => {
              return (
                <React.Fragment>
                  <Form>
                    <CustomSelect
                      value={props.values.currentUtility}
                      onChange={props.setFieldValue}
                      onBlur={props.setFieldTouched}
                      error={props.errors.topics}
                      touched={props.touched.topics}
                      label="Utility Name"
                      fieldname="currentUtility"
                    />
                    <Button
                      primary
                      disabled={!props.values.currentUtility != ''}
                    >
                      Next
                    </Button>
                  </Form>
                </React.Fragment>
              );
            }}
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

export default Step3;