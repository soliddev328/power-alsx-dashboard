import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Header from '../../components/Header';
import SingleStep from '../../components/SingleStep';
import Plaid from '../../components/Plaid';
import Checkout from '../../components/Checkout';
import CONSTANTS from '../../globals';

const { STRIPE_KEY } =
  CONSTANTS.NODE_ENV !== 'production' ? CONSTANTS.dev : CONSTANTS.prod;

class Step11 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      paymentMethod: '',
      stripe: null
    };
  }

  componentDidMount() {
    let storedPaymentMethod = '';

    if (localStorage.getItem('paymentMethod')) {
      storedPaymentMethod = JSON.parse(localStorage.getItem('paymentMethod'));
    }

    this.setState({
      paymentMethod: storedPaymentMethod.paymentMethod,
      stripe: window.Stripe(STRIPE_KEY)
    });
  }

  renderBankLink() {
    return (
      <SingleStep title="Link your account">
        <Plaid />
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
        {console.log(this.state.paymentMethod)}
        {this.state.paymentMethod &&
        this.state.paymentMethod.indexOf('automatic') === 0
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

export default Step11;
