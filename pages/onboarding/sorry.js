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
  }

  componentDidMount() {
    global.analytics.page("Out of area");

    let storedName = "";
    let storedAddress = "";

    if (localStorage.getItem("username")) {
      storedName = JSON.parse(localStorage.getItem("username"));
    }
    if (localStorage.getItem("address")) {
      storedAddress = JSON.parse(localStorage.getItem("address"));
    }

    this.setState({ name: storedName, address: storedAddress });
  }

  render() {
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
                  FirstName: this.state.name.firstName,
                  LastName: this.state.name.lastName,
                  street: this.state.address.street,
                  state: this.state.address.state,
                  city: this.state.address.city,
                  Phone: "9999999999",
                  Email: values.email
                })
                .then(function(response) {
                  console.log(response);
                  Router.push({
                    pathname: "/"
                  });
                })
                .catch(function(error) {
                  console.log(error);
                });
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <Input label="email" fieldname="email" />
                  <Button primary disabled={!props.values.email != ""}>
                    Next
                  </Button>
                </Form>
              </React.Fragment>
            )}
          />
        </SingleStep>
        <style jsx>{`
          main {
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
