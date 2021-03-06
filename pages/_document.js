import React from "react";
import * as snippet from "@segment/snippet";
import Document, { Html, Head, Main, NextScript } from "next/document";
import settings from "../settings.json";
import CONSTANTS from "../globals";

const { FB_APP_ID, SEGMENT_KEY, FULLSTORY_KEY, FIREBASE } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

export default class MyDocument extends Document {
  renderSegmentSnippet() {
    const opts = {
      apiKey: SEGMENT_KEY,
      page: false // Set this to `false` if you want to manually fire `analytics.page()` from within your pages.
    };

    if (CONSTANTS.NODE_ENV !== "production") {
      return snippet.max(opts);
    }

    return snippet.min(opts);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <script
            src="https://cdn.polyfill.io/v2/polyfill.min.js"
            noModule="nomodule"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no user-scalable=no"
          />
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
          <meta name="google" content="notranslate" />
          <meta name="description" content={settings.meta.pageDescription} />
          <meta name="subject" content={settings.meta.pageSubject} />
          <link rel="canonical" href={settings.meta.canonicalUrl} />
          <meta name="referrer" content="no-referrer" />
          <meta name="format-detection" content="telephone=no" />
          <meta httpEquiv="x-dns-prefetch-control" content="off" />
          <meta httpEquiv="Window-Target" content="_value" />
          <meta
            name="google-site-verification"
            content={settings.meta.googleSiteVerification}
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/static/favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/static/favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/static/favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/static/favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/static/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/static/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/static/favicon/favicon-96x96.png"
          />
          <link
            rel="mask-icon"
            href="/static/favicon/safari-pinned-tab.svg"
            color={settings.colors.secondary}
          />
          <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
          <meta
            name="msapplication-TileColor"
            content={settings.colors.primary}
          />
          <meta
            name="msapplication-config"
            content="/static/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content={settings.colors.primary} />
          <meta
            name="msapplication-TileColor"
            content={settings.colors.tertiary}
          />
          <meta name="theme-color" content={settings.colors.primary} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={settings.meta.pageTitle} />
          <meta
            property="og:description"
            content={settings.meta.pageDescription}
          />
          <meta property="og:url" content={settings.meta.pageUrl} />
          <meta property="og:site_name" content={settings.meta.siteName} />
          <meta property="og:image" content="/static/OG.jpg" />

          <meta
            property="og:image:secure_url"
            content="https://url/static/OG.jpg"
          />
          <meta name="twitter:card" content="summary" />

          <meta
            name="twitter:description"
            content={settings.meta.pageDescription}
          />

          <meta name="twitter:title" content={settings.meta.pageTitle} />
          <meta name="twitter:site" content={settings.meta.twitterUserName} />
          <meta name="twitter:image" content="https://url/static/OG.jpg" />
          <meta name="twitter:image:alt" content="" />
          <script src="https://js.stripe.com/v3/" />
          <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js" />
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${settings.meta.gmapsApiKey}&libraries=places`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.fbAsyncInit = function() {
              FB.init({
                appId: ${FB_APP_ID},
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.2'
              });
            };

            (function(d, s, id) {
              var js,
                fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) {
                return;
              }
              js = d.createElement(s);
              js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk.js';
              fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');`
            }}
          />
          <script
            dangerouslySetInnerHTML={{ __html: this.renderSegmentSnippet() }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
