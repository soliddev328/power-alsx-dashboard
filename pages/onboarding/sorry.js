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

class Sorry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    global.analytics.page("Out of area");

    const storedName = "";
    const storedPostalCode = "";
    const storedAddress = "";
    const storedPartner = "";
    const storedReferrer = "";
    const storedSalesRep = "";
    const storedUtmCampaign = "";
    const storedUtmMedium = "";
    const storedUtmSource = "";

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
          title="We don't have a project in your area at this time. Join our subscriber list and help us get one!"
        >
          <Formik
            initialValues={{
              email: ""
            }}
            onSubmit={values => {
              axios
                .post(`${API}/v1/subscribers`, {
                  LastName: values.email,
                  postalCode: postalCode,
                  Phone: "9999999999",
                  Email: values.email,
                  Referrer: referrer,
                  Partner: partner,
                  SalesRep: salesRep,
                  utmCampaign: utmCampaign,
                  utmMedium: utmMedium,
                  utmSource: utmSource
                })
                .then(() => {
                  Router.push({
                    pathname: "/"
                  });
                })
                .catch(() => {});
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <Input label="email" fieldname="email" />
                  <Button primary disabled={!!props.values.email === false}>
                    Next
                  </Button>
                </Form>
              </React.Fragment>
            )}
          />
        </SingleStep>
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
