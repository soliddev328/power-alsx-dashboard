import React, { Component } from 'react';
import axios from 'axios';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    debugger;
    let { token } = await this.props.stripe.createToken({
      name: this.props.name
    });

    let response = await axios.post('/charge', {
      stripeToken: token.id,
      email: this.props.email,
      leadId: this.props.leadId
    });

    console.log(response);

    if (response.ok) console.log('Purchase Complete!');
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
