import App from "next/app";
import Head from "next/head";
import React from "react";
import settings from "../settings.json";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>{settings.meta.pageTitle}</title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
