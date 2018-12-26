import React from 'react';
import Wizard from './Wizard';
import SingleStep from './SingleStep';
import RadioCard from './RadioCard';
import BulletItem from './BulletItem';
import Checkbox from './Checkbox';
import Input from './Input';
import Button from './Button';

export default class MultiStep extends React.Component {
  render() {
    const steps = [
      {
        name: 'Personal Information',
        component: (
          <SingleStep title="Let's get you signed up and saving!">
            <Input label="Name" fieldname="name" required />
            <Input label="Last name" fieldname="lastName" required />
            <Input label="Email" fieldname="email" type="email" required />
          </SingleStep>
        )
      },
      {
        name: 'Personal Information',
        component: (
          <SingleStep
            title="To verify your identity we will send a code to your mobile phone"
            suffix="You will receive a code through SMS"
            required
          >
            <Input
              label="Mobile phone number"
              fieldname="mobilePhone"
              type="tel"
              required
            />
          </SingleStep>
        )
      },
      {
        name: 'Address',
        component: (
          <SingleStep
            title="Great! You're verified."
            prefix="What is your address and utility?"
          >
            <Input label="Address" fieldname="address" type="text" required />
            <Input
              label="Apt Number"
              fieldname="postalCode"
              type="tel"
              required
            />
            <Input
              label="Utility Name"
              fieldname="utility"
              type="select"
              required
            />
          </SingleStep>
        )
      },
      {
        name: 'Savings Agreement',
        component: (
          <SingleStep title="Lock in your savings and impact!">
            <BulletItem
              content="10% contracted discount"
              bulletIcon="discount"
            />
            <BulletItem content="90% CO2 Reduction" bulletIcon="co2" />
            <BulletItem
              content="1 year term auto renew"
              bulletIcon="calendar"
            />
            <BulletItem content="No cancelation fees" bulletIcon="cross" />
            <Checkbox
              label="I accept the terms and conditions."
              name="termsAndConditions"
              required
            />
          </SingleStep>
        )
      },
      {
        name: 'Utility Account',
        component: (
          <SingleStep title="Now let's connect your utility account to clean energy!">
            <Input
              label="User Name"
              fieldname="utilityUserName"
              type="text"
              required
            />
            <Input
              label="Password"
              fieldname="utilityPassword"
              type="password"
              required
            />
          </SingleStep>
        )
      },
      {
        name: 'Payment',
        component: (
          <SingleStep title="Select your payment method">
            <RadioCard
              number="1"
              name="paymentMethod"
              value="automatic"
              heading="Automatic Payment"
              content="Receive an additional $25 credit with automatic deductions from your bank account"
              highlight="$25 credit"
            />
            <RadioCard
              number="2"
              name="paymentMethod"
              value="creditCard"
              heading="Credit Card"
              content="A 2.9% processing fee is applied to cover transaction costs."
              highlight="2.9%"
            />
          </SingleStep>
        )
      },
      {
        name: 'Share',
        component: (
          <SingleStep
            title="Spread the word"
            highlight="10 friends"
            prefix="Connect 10 friends and get free electricity for a year!"
          >
            <Button secondary share="facebook">
              Share on Facebook
            </Button>
          </SingleStep>
        )
      }
    ];

    return (
      <Wizard
        steps={steps}
        initialValues={{
          email: '',
          lastName: '',
          mobilePhone: '',
          name: '',
          termsAndConditions: '',
          paymentMethod: '',
          utilityPassword: '',
          utilityUserName: ''
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            window.alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 300);
        }}
      >
        {steps.map((item, key) => (
          <Wizard.Page key={key}>{item.component}</Wizard.Page>
        ))}
      </Wizard>
    );
  }
}
