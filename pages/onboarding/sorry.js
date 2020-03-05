import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";
import axios from "axios";
import Input from "../../components/Input";
import Header from "../../components/Header";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

class Sorry extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    global.analytics.page("Out of area");

    let storedName = "";
    let storedPostalCode = "";
    let storedAddress = "";
    let storedPartner = "";
    let storedReferrer = "";
    let storedSalesRep = "";
    let storedUtmCampaign = "";
    let storedUtmMedium = "";
    let storedUtmSource = "";

    if (localStorage.getItem("username")) {
      storedName = JSON.parse(localStorage.getItem("username"));
    }
    if (localStorage.getItem("postalCode")) {
      storedPostalCode = JSON.parse(localStorage.getItem("postalCode"));
    }
    if (localStorage.getItem("address")) {
      storedAddress = JSON.parse(localStorage.getItem("address"));
    }
    if (localStorage.getItem("Partner")) {
      storedPartner = localStorage.getItem("Partner");
    }
    if (localStorage.getItem("Referrer")) {
      storedReferrer = localStorage.getItem("Referrer");
    }
    if (localStorage.getItem("SalesRep")) {
      storedSalesRep = localStorage.getItem("SalesRep");
    }
    if (localStorage.getItem("UtmCampaign")) {
      storedUtmCampaign = localStorage.getItem("UtmCampaign");
    }
    if (localStorage.getItem("UtmMedium")) {
      storedUtmMedium = localStorage.getItem("UtmMedium");
    }
    if (localStorage.getItem("UtmSource")) {
      storedUtmSource = localStorage.getItem("UtmSource");
    }

    this.setState({
      name: storedName,
      postalCode: storedPostalCode,
      address: storedAddress,
      referrer: storedReferrer,
      partner: storedPartner,
      salesRep: storedSalesRep,
      utmCampaign: storedUtmCampaign,
      utmMedium: storedUtmMedium,
      utmSource: storedUtmSource
    });
  }

  render() {
    const {
      postalCode,
      referrer,
      partner,
      salesRep,
      utmCampaign,
      utmMedium,
      utmSource
    } = this.state;
    return (
      <main>
        <Header />
        <SingleStep
          toast="I'm Sorry"
          title="We don't have a project in your area at this time. We have added you to our waitlist, and will update when we have a project!"
        ></SingleStep>
        <style jsx>{`
          main {
            display: block;
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
        `}</style>
      </main>
    );
  }
}

export default Sorry;
