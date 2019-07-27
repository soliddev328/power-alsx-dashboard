import React from "react"
import Router from "next/router"
import { Formik, Form } from "formik"
import axios from "axios"
import GeoSuggest from "../../components/GeoSuggest"
import Header from "../../components/Header"
import Input from "../../components/Input"
import SingleStep from "../../components/SingleStep"
import Button from "../../components/Button"
import Stepper from "../../components/Stepper"
import CONSTANTS from "../../globals"

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod

class Step4 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      postalCode: "",
      errorMessage: ""
    }
  }

  componentDidMount() {
    global.analytics.page("Step 4")
    let storedPostalCode = ""
    let storedLeadId = ""
    let storedFname = ""
    let storedLname = ""

    if (localStorage.getItem("postalCode")) {
      storedPostalCode = JSON.parse(localStorage.getItem("postalCode"))
    }
    if (localStorage.getItem("leadId")) {
      storedLeadId = localStorage.getItem("leadId")
    }
    if (localStorage.getItem("fname")) {
      storedFname = localStorage.getItem("fname")
    }
    if (localStorage.getItem("lname")) {
      storedLname = localStorage.getItem("lname")
    }

    this.setState({
      postalCode: storedPostalCode,
      leadId: storedLeadId,
      firstName: storedFname,
      lastName: storedLname
    })
  }

  getPostalCode(values) {
    const components = values.address
      ? values.address.gmaps.address_components
      : null

    const postalCode = components
      ? components.find(x => x.types[0] == "postal_code")
      : null

    return postalCode ? postalCode.long_name : ""
  }

  getStateAddress(values) {
    const components = values.address
      ? values.address.gmaps.address_components
      : null
    const state = components
      ? components.find(x => x.types[0] == "administrative_area_level_1")
      : null

    return state ? state.short_name : ""
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep title="And what is your name and address please?">
          <Formik
            initialValues={{
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              address: ""
            }}
            onSubmit={values => {
              const arrayAddress = values.address.description.split(",")
              const street = arrayAddress[0] ? arrayAddress[0] : ""
              const city = arrayAddress[1]
                ? arrayAddress[1].replace(/\s/g, "")
                : ""

              const address = {
                street: street,
                city: city,
                state: this.getStateAddress(values),
                postalCode: this.getPostalCode(values),
                apt: values.apt ? values.apt : ""
              }

              const name = {
                firstName: values.firstName,
                lastName: values.lastName
              }

              localStorage.setItem("address", JSON.stringify(address))
              localStorage.setItem("username", JSON.stringify(name))

              if (address.postalCode === this.state.postalCode) {
                window.firebase
                  .auth()
                  .currentUser.getIdToken(true)
                  .then(idToken => {
                    axios
                      .put(
                        `${API}/v1/subscribers`,
                        {
                          leadId: this.state.leadId,
                          firstName: values.firstName,
                          lastName: values.lastName,
                          street: address.street,
                          state: address.state,
                          city: address.city
                        },
                        {
                          headers: {
                            Authorization: idToken
                          }
                        }
                      )
                      .then(() => {
                        global.analytics.identify(this.state.leadId, {
                          firstName: values.firstName,
                          lastName: values.lastName
                        })
                        Router.push({
                          pathname: "/onboarding/step5"
                        })
                      })
                      .catch(() => {})
                  })
              } else {
                this.setState({
                  errorMessage:
                    "Address has different zip code than the one initially provided."
                })
              }
            }}
            render={props => (
              <Form>
                <div className="two-columns two-columns--responsive">
                  <Input label="First Name" fieldname="firstName" autoFocus />
                  <Input label="Last Name" fieldname="lastName" />
                </div>
                <GeoSuggest
                  label="Address"
                  fieldname="address"
                  value={props.values.address}
                  onChange={props.setFieldValue}
                  onBlur={props.setFieldTouched}
                  error={props.errors.topics}
                  touched={props.touched.topics}
                />
                <p className="error">{this.state.errorMessage}</p>
                <Button
                  primary
                  disabled={
                    !props.values.firstName != "" ||
                    !props.values.lastName != "" ||
                    !props.values.address != ""
                  }
                >
                  Next
                </Button>
              </Form>
            )}
          />
          <Stepper>
            <li className="steplist__step steplist__step-doing">1</li>
            <li className="steplist__step">2</li>
            <li className="steplist__step">3</li>
            <li className="steplist__step">4</li>
            <li className="steplist__step">5</li>
            <li className="steplist__step">6</li>
          </Stepper>
        </SingleStep>
        <style jsx>{`
          main {
            display: block;
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
          .error {
            height: 45px;
            color: red;
            text-align: center;
          }
        `}</style>
      </main>
    )
  }
}

export default Step4
