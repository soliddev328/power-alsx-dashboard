import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';
import CONSTANTS from '../../globals';

const { API } =
  CONSTANTS.NODE_ENV !== 'production' ? CONSTANTS.dev : CONSTANTS.prod;

class Step7 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUtility: '',
      forgotPwdLink: '',
      forgotEmailLink: '',
      createLoginLink: ''
    };
  }

  static async getInitialProps({ req, query, params }) {
    if (req) {
      try {
        return { query: req.query, params: req.params };
      } catch (err) {
        return { query: req.query, params: req.params };
      }
    }

    return { query, params };
  }

  getLinks() {
    let storedAddress = JSON.parse(localStorage.getItem('address'));
    let storedUtility = JSON.parse(localStorage.getItem('utility'));

    const rawParams = {
      utility: encodeURIComponent(storedUtility.label),
      state: storedAddress.state
    };

    const generatedParams = Object.entries(rawParams)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');

    axios(`${API}/v1/utilities/?${generatedParams}`).then(response => {
      this.setState({
        forgotPwdLink: response.data.data[0].forgotPwdLink,
        forgotEmailLink: response.data.data[0].forgotEmailLink,
        createLoginLink: response.data.data[0].createLoginLink
      });
    });
  }

  componentDidMount() {
    let storedLeadId = '';
    let storedUtility = '';
    let storedBillingMethod = '';

    if (localStorage.getItem('leadId')) {
      storedLeadId = localStorage.getItem('leadId');
    }

    if (localStorage.getItem('utility')) {
      storedUtility = JSON.parse(localStorage.getItem('utility'));
    }

    if (localStorage.getItem('billingMethod')) {
      storedBillingMethod = JSON.parse(localStorage.getItem('billingMethod'));
    }

    this.setState(
      {
        leadId: storedLeadId,
        utility: storedUtility.label,
        billingMethod: storedBillingMethod
      },
      this.getLinks()
    );
  }

  renderUtilityLogin() {
    let errorMessage = '';
    return (
      <Formik
        initialValues={{
          utilityUser: '',
          utilityPassword: ''
        }}
        onSubmit={values => {
          console.log('start submitting');
          axios
            .put(`${API}/v1/subscribers/utilities/link`, {
              leadId: this.state.leadId,
              utility: this.state.utility,
              utilityUsername: values.utilityUser,
              utilityPwd: values.utilityPassword
            })
            .then(function(response) {
              console.log('start responding');
              localStorage.setItem(
                'linkedUtility',
                JSON.stringify(response.data)
              );
              if (response.data && response.data.data[0]) {
                console.log('first if passed');
                if (response.data.data[0].hasLoggedIn) {
                  console.log('second if passed');
                  Router.push({
                    pathname: '/onboarding/step8'
                  });
                } else {
                  Router.push({
                    pathname: '/onboarding/step7',
                    query: {
                      error: true
                    }
                  });
                  errorMessage = '';
                }
              }
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
            </Form>
          </React.Fragment>
        )}
      />
    );
  }

  renderAskForUtilityAccount() {
    return (
      <Formik
        initialValues={{
          utilityAccountNumber: ''
        }}
        onSubmit={values => {
          axios
            .put(`${API}/v1/subscribers`, {
              leadId: this.state.leadId,
              utilityAccountNumber: values.utilityAccountNumber
            })
            .then(function() {
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
              <Input label="Account Number" fieldname="utilityAccountNumber" />
              <Button
                primary
                disabled={!props.values.utilityAccountNumber != ''}
              >
                Next
              </Button>
            </Form>
          </React.Fragment>
        )}
      />
    );
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
          {this.props.query && this.props.query.error && (
            <p className="error">
              There was a problem connecting, could you please verify your
              login.
            </p>
          )}
          {this.state.billingMethod &&
          this.state.billingMethod.billingMethod.indexOf('paper') === 0
            ? this.renderAskForUtilityAccount()
            : this.renderUtilityLogin()}
          <div className="links">
            {this.state.createLoginLink && (
              <a className="cta" href={this.state.createLoginLink}>
                Create an account
              </a>
            )}
            {this.state.forgotEmailLink && (
              <a className="cta" href={this.state.forgotEmailLink}>
                Forgot username
              </a>
            )}
            {this.state.forgotPwdLink && (
              <a className="cta" href={this.state.forgotPwdLink}>
                Forgot password
              </a>
            )}
          </div>
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

          .links {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .error {
            text-align: center;
            color: red;
          }
        `}</style>
      </main>
    );
  }
}

export default Step7;
