import App from "next/app";
import Head from "next/head";
import React from "react";
import settings from "../settings.json";
import Firebase, { FirebaseContext } from "../firebase";
import { StateProvider } from "../state";

const initialState = {
  selectedAccount: {
    value: 0
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "changeSelectedAccount":
      return {
        ...state,
        selectedAccount: action.newValue
      };

    default:
      return state;
  }
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <FirebaseContext.Provider value={new Firebase()}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Head>
            <title>{settings.meta.pageTitle}</title>
          </Head>
          <Component {...pageProps} />
        </StateProvider>
      </FirebaseContext.Provider>
    );
  }
}

export default MyApp;
