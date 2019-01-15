import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from 'react-stripe-elements';
import Button from '../components/Button';
import CONSTANTS from '../globals';

const { API } =
  CONSTANTS.NODE_ENV !== 'production' ? CONSTANTS.dev : CONSTANTS.prod;

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    let storedLeadId = '';
    let storedEmail = '';

    if (localStorage.getItem('leadId')) {
      storedLeadId = localStorage.getItem('leadId');
    }

    if (localStorage.getItem('email')) {
      storedEmail = localStorage.getItem('email');
    }

    this.setState({
      leadId: storedLeadId,
      email: storedEmail,
      errorMessage: null
    });
  }

  submit(ev) {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken({ type: 'card' }).then(payload => {
        axios.put(`${API}/v1/subscribers`, {
          leadId: this.state.leadId,
          email: this.state.email,
          stripeToken: payload.token.id
        });
        Router.push({
          pathname: '/onboarding/step11'
        });
      });
    } else {
      console.log('Form submitted before Stripe.js loaded.');
    }
  }

  render() {
    const error = this.state ? this.state.errorMessage : null;
    return (
      <div className="checkout">
        <div className="card">
          <CardNumberElement
            placeholder="Card Number"
            style={{
              base: {
                margin: '5px',
                color: 'var(--color-primary)',
                fontSize: '16px',
                fontFamily: '"Poppins", sans-serif',
                fontSmoothing: 'antialiased',
                '::placeholder': {
                  color: '#2479ff'
                }
              },
              invalid: {
                color: '#e5424d',
                ':focus': {
                  color: '#303238'
                }
              }
            }}
            onChange={event => {
              if (event.error) {
                this.setState({ errorMessage: event.error.message });
              }
            }}
          />
          <div className="three-columns">
            <CardExpiryElement
              style={{
                base: {
                  color: 'var(--color-primary)',
                  fontSize: '16px',
                  fontFamily: '"Poppins", sans-serif',
                  fontSmoothing: 'antialiased',
                  '::placeholder': {
                    fontSize: '12px',
                    color: '#2479ff'
                  }
                },
                invalid: {
                  color: '#e5424d',
                  ':focus': {
                    color: '#303238'
                  }
                }
              }}
              onChange={event => {
                if (event.error) {
                  this.setState({ errorMessage: event.error.message });
                }
              }}
            />
            <CardCVCElement
              style={{
                base: {
                  color: 'var(--color-primary)',
                  fontSize: '16px',
                  fontFamily: '"Poppins", sans-serif',
                  fontSmoothing: 'antialiased',
                  '::placeholder': {
                    fontSize: '12px',
                    color: '#2479ff'
                  }
                },
                invalid: {
                  color: '#e5424d',
                  ':focus': {
                    color: '#303238'
                  }
                }
              }}
              onChange={event => {
                if (event.error) {
                  this.setState({ errorMessage: event.error.message });
                }
              }}
            />
            <PostalCodeElement
              placeholder="Zip Code"
              style={{
                base: {
                  color: 'var(--color-primary)',
                  fontSize: '16px',
                  fontFamily: '"Poppins", sans-serif',
                  fontSmoothing: 'antialiased',
                  '::placeholder': {
                    fontSize: '12px',
                    color: '#2479ff'
                  }
                },
                invalid: {
                  color: '#e5424d',
                  ':focus': {
                    color: '#303238'
                  }
                }
              }}
              onChange={event => {
                if (event.error) {
                  this.setState({ errorMessage: event.error.message });
                }
              }}
            />
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <Button primary onClick={this.submit}>
          Next
        </Button>
        <style jsx>{`
          .card {
            margin: 2rem 0;
            margin-bottom: 10px;
          }
          .three-columns {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
          }
          .error {
            text-align: center;
            color: red;
            margin: 0;
          }
        `}</style>
        <style jsx global>{`
          .StripeElement {
            margin: 10px 0;
            background-color: white;
            padding: 0.8em 1em;
            border-radius: 3px;
            border: 1px solid transparent;
            caret-color: var(--color-secondary);
            transition: box-shadow 200ms ease-in;
          }

          .StripeElement + .StripeElement {
            margin-left: 10px;
          }

          .StripeElement--invalid {
            border-color: #fa755a;
          }

          .StripeElement--webkit-autofill {
            background-color: #fefde5 !important;
          }
        `}</style>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
