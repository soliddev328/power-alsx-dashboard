import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import { Elements, StripeProvider } from 'react-stripe-elements';

import Header from '../../components/Header';
import SingleStep from '../../components/SingleStep';
import Button from '../../components/Button';
import Input from '../../components/Input';
import CTA from '../../components/CTA';
import BankCard from '../../components/BankCard';
import Checkout from '../../components/Checkout';

class Step12 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      paymentMethod: '',
      stripe: null
    };
  }

  static async getInitialProps({ query }) {
    const props = {
      paymentMethod: query.paymentMethod
    };

    return props;
  }

  componentDidMount() {
    this.setState({ stripe: window.Stripe('pk_test_12345') });
  }

  renderBankLink() {
    return (
      <SingleStep title="Link your account">
        <div className="container">
          <BankCard
            code="1"
            accent="#1A59A3"
            image={{
              src: '/static/images/banks/Chase.png',
              altText: 'Chase bank logo'
            }}
          />
          <BankCard
            code="2"
            largeIcon
            accent="#D4373A"
            image={{
              src: '/static/images/banks/BofA.png',
              altText: 'Bank of America logo'
            }}
          />
          <BankCard
            code="3"
            accent="#C33239"
            image={{
              src: '/static/images/banks/WellsFargo.png',
              altText: 'Wells fargo logo'
            }}
          />
          <BankCard
            code="4"
            accent="#23407F"
            image={{
              src: '/static/images/banks/Citi.png',
              altText: 'Citi logo'
            }}
          />
          <BankCard
            code="5"
            accent="#011E6F"
            image={{
              src: '/static/images/banks/USBank.png',
              altText: 'United States Bank Stadium logo'
            }}
          />
          <BankCard
            code="6"
            accent="#0F3155"
            image={{
              src: '/static/images/banks/USAA.png',
              altText: 'USAA logo'
            }}
          />
          <BankCard
            code="7"
            accent="#789633"
            image={{
              src: '/static/images/banks/Fidelity.png',
              altText: 'Fidelity logo'
            }}
          />
          <BankCard
            code="8"
            accent="#EB8535"
            image={{
              src: '/static/images/banks/PNC.png',
              altText: 'PNC logo'
            }}
          />
          <BankCard
            code="9"
            accent="#C33E39"
            image={{
              src: '/static/images/banks/CapitalOne.png',
              altText: 'Capital One logo'
            }}
          />
          <BankCard
            code="10"
            accent="#55AF57"
            image={{
              src: '/static/images/banks/TD.png',
              altText: 'TD Bank logo'
            }}
          />
          <BankCard
            code="11"
            accent="#EE9D2E"
            image={{
              src: '/static/images/banks/SunTrust.png',
              altText: 'SunTrust logo'
            }}
          />
          <BankCard
            code="12"
            accent="#15559E"
            image={{
              src: '/static/images/banks/NavyFederal.png',
              altText: 'Navy Federal logo'
            }}
          />
        </div>
        <style jsx>{`
          .container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            grid-column-gap: 15px;
            grid-row-gap: 20px;
            justify-items: center;
          }
        `}</style>
      </SingleStep>
    );
  }

  renderCreditCard() {
    return (
      <SingleStep title="Pay by Credit Card">
        <div className="container">
          <p className="prefix">
            <em>
              A <span className="highlight">2.9%</span> processing fee is
              applied to cover transaction costs
            </em>
          </p>
          <img className="cards" src="/static/images/banks/cards.png" alt="" />
          <Formik
            initialValues={{
              cardNumber: '',
              expirationMonth: '',
              expirationYear: '',
              cvv: ''
            }}
            onSubmit={values => {
              Router.push({
                pathname: '/onboarding/step12'
              });
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <Input
                    type="number"
                    label="Card Number"
                    fieldname="cardNumber"
                    autoComplete="cc-number"
                  />
                  <div className="two-columns">
                    <Input
                      type="number"
                      label="Expiration month (MM)"
                      fieldname="expirationMonth"
                      autoComplete="cc-exp"
                    />
                    <Input
                      type="number"
                      label="Expiration year (YYYY)"
                      fieldname="expirationYear"
                      autoComplete="cc-exp"
                    />
                    <Input
                      type="password"
                      label="CVC"
                      fieldname="cvc"
                      autoComplete="cc-csc"
                    />
                    <CTA>What is this?</CTA>
                  </div>
                  <p className="small">
                    <svg
                      width="14"
                      height="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.9952011 10.470321c0-.92422-.7617776-1.67188-1.7018596-1.67032h-.5030834l-.0015915-3.9382c-.0023882-2.682-2.2256466-4.863999-4.957474-4.861799C4.0985501.002346 1.876979 2.184401 1.876979 4.865601l.0023882 3.9382h-.1775076C.7625723 8.806145 0 9.553801 0 10.475681l.0039798 5.853999C.0039798 17.25156.7657573 18 1.7058393 18l10.5923011-.00625C13.2374277 17.99375 14 17.24609 14 16.32343l-.0047989-5.853109zm-10.2882666-1.6664l-.0023883-3.9382c-.0023862-1.69376 1.4017601-3.0718 3.1259332-3.0742 1.7257401 0 3.1298028 1.37812 3.1322481 3.0704l.0023863 3.9382-6.2581793.0038z"
                        fill="#2479FF"
                        fillRule="evenodd"
                      />
                    </svg>
                    All your information is 128 bit encrypted
                  </p>
                </Form>
                <Button
                  primary
                  disabled={
                    !props.values.cardNumber != '' ||
                    !props.values.expirationMonth != '' ||
                    !props.values.expirationYear != '' ||
                    !props.values.cvc != ''
                  }
                  onClick={() => {
                    Router.push({
                      pathname: '/onboarding/step12'
                    });
                  }}
                >
                  Next
                </Button>
              </React.Fragment>
            )}
          />
          <StripeProvider stripe={this.state.stripe}>
            <Elements>
              <Checkout stripe={this.state.stripe} name={this.props.name} />
            </Elements>
          </StripeProvider>
        </div>
        <style jsx>{`
          p {
            text-align: center;
            vertical-align: middle;
          }

          p.small {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
          }

          p svg {
            margin-right: 10px;
          }

          em .highlight {
            color: var(--color-primary);
            font-weight: 700;
          }

          .cards {
            display: block;
            max-width: 35%;
            margin: 0 auto;
            margin-bottom: 1em;
          }

          .container h5 {
            display: inline-block;
            font-size: 1rem;
            font-weight: 700;
            position: relative;
            color: #ff69a0;
          }

          .container h5 svg {
            position: absolute;
            right: 0;
            bottom: 0;
            transform: translate(50%, 30%);
          }
        `}</style>
      </SingleStep>
    );
  }

  render() {
    return (
      <main>
        <Header />
        {this.props.paymentMethod == 'automatic'
          ? this.renderBankLink()
          : this.renderCreditCard()}
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

export default Step12;
