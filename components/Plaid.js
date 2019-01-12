import ReactPlaid from 'react-plaid';
import React from 'react';
import Button from '../components/Button';
import CONSTANTS from '../globals';

const { PLAID_KEY } =
  CONSTANTS.NODE_ENV !== 'production' ? CONSTANTS.dev : CONSTANTS.prod;
const PLAID_ENV =
  CONSTANTS.NODE_ENV !== 'production' ? 'sandbox' : 'production';

export default class Plaid extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      plaidData: []
    };
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ open: true })}>
          Open Plaid
        </Button>
        {this.state.plaidData.map(({ institution }) => (
          <div>
            {institution.name} - {institution.type}
          </div>
        ))}
        <ReactPlaid
          clientName="Client Name"
          product={['auth']}
          apiKey={PLAID_KEY}
          env={PLAID_ENV}
          open={this.state.open}
          onSuccess={(token, metaData) => {
            // HEROKU /v1/plaid/auth
            this.setState({ plaidData: metaData });
          }}
          onExit={() => this.setState({ open: false })}
        />
      </div>
    );
  }
}
