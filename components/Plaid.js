import ReactPlaid from "react-plaid";
import React from "react";
import axios from "axios";
import Router from "next/router";
import CONSTANTS from "../globals";

const { PLAID_KEY, API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;
const PLAID_ENV =
  CONSTANTS.NODE_ENV !== "production" ? "sandbox" : "production";

export default class Plaid extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      plaidData: []
    };
  }

  componentDidMount() {
    let storedLeadId = "";
    if (window.localStorage.getItem("leadId")) {
      storedLeadId = window.localStorage.getItem("leadId");
    }

    this.setState({
      leadId: storedLeadId
    });
  }

  render() {
    return (
      <ReactPlaid
        clientName="Client Name"
        product={["auth"]}
        apiKey={PLAID_KEY}
        env={PLAID_ENV}
        open
        onSuccess={(token, metadata) => {
          window.firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(function(idToken) {
              axios
                .post(
                  `${API}/v1/plaid/auth`,
                  {
                    public_token: token,
                    accounts: metadata.accounts,
                    institution: metadata.institution,
                    link_session_id: metadata.link_session_id,
                    item: this.state.leadId
                  },
                  {
                    headers: {
                      Authorization: `  ${idToken}`
                    }
                  }
                )
                .then(() => {
                  Router.push({
                    pathname: "/onboarding/step11"
                  });
                });
            });
        }}
        onExit={(err, metadata) => {
          if (err !== null) {
            window.firebase
              .auth()
              .currentUser.getIdToken(true)
              .then(idToken => {
                axios.post(
                  `${API}/v1/plaid/error`,
                  {
                    error: err,
                    status: metadata.status,
                    institution: metadata.institution,
                    link_session_id: metadata.link_session_id,
                    item: this.state.leadId
                  },
                  {
                    headers: {
                      Authorization: idToken
                    }
                  }
                );
              });
          }
          Router.push({
            pathname: "/onboarding/step9"
          });
        }}
      />
    );
  }
}
