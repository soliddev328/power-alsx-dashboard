import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';
import CTA from '../../components/CTA';

class Step7 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUtility: ''
    };
  }

  componentDidMount() {
    let storedLeadId = '';
    let storedUtility = '';

    if (localStorage.getItem('leadId')) {
      storedLeadId = localStorage.getItem('leadId');
    }

    if (localStorage.getItem('utility')) {
      storedUtility = JSON.parse(localStorage.getItem('utility'));
    }

    this.setState({
      leadId: storedLeadId,
      utility: storedUtility.label
    });
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          toast="Ok great."
          title="Now let's connect your account and get you saving!"
        >
          {this.state.currentUtility && (
            <figure>
              <img
                src={this.state.currentUtility.image.src}
                alt={this.state.currentUtility.image.altText}
              />
            </figure>
          )}
          <Formik
            initialValues={{
              utilityUser: '',
              utilityPassword: ''
            }}
            onSubmit={values => {
              axios
                .put(
                  'https://comenergy-api-staging.herokuapp.com/v1/subscribers/utilities/link',
                  {
                    leadId: this.state.leadId,
                    utility: this.state.utility,
                    utilityUsername: values.utilityUser,
                    utilityPwd: values.utilityPassword
                  }
                )
                .then(function(response) {
                  localStorage.setItem(
                    'linkedUtility',
                    JSON.stringify(response.data)
                  );
                  Router.push({
                    pathname: '/onboarding/step8'
                  });
                })
                .catch(function(error) {
                  console.log(error);
                });
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <Input label="User name" fieldname="utilityUser" />
                  <Input
                    type="password"
                    label="Password"
                    fieldname="utilityPassword"
                    autoComplete="no"
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
