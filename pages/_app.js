import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import settings from "../settings.json";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>{settings.meta.pageTitle}</title>
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
