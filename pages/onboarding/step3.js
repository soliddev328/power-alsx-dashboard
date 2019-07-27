import React from "react"
import Router from "next/router"
import { Formik, Form } from "formik"
import axios from "axios"
import Header from "../../components/Header"
import Input from "../../components/Input"
import SingleStep from "../../components/SingleStep"
import Button from "../../components/Button"
import Stepper from "../../components/Stepper"
import CONSTANTS from "../../globals"

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod

class Step3 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: {
        code: false,
        message: ""
      }
    }
  }

  componentDidMount() {
    global.analytics.page("Step 3")

    let storedPostalCode = ""
    let storedUtility = ""
    let storedAgreementChecked = false
    let storedPartner = ""
    let storedReferrer = ""
    let storedSalesRep = ""
    let storedAffiliate = ""
    let storedUtmCampaign = ""
    let storedUtmMedium = ""
    let storedUtmSource = ""
    let storedEmail = ""

    if (localStorage.getItem("utility")) {
      storedUtility = JSON.parse(localStorage.getItem("utility"))
    }
    if (localStorage.getItem("acceptedTermsAndConditions")) {
      storedAgreementChecked = JSON.parse(
        localStorage.getItem("acceptedTermsAndConditions")
      )
    }
    if (localStorage.getItem("postalCode")) {
      storedPostalCode = JSON.parse(localStorage.getItem("postalCode"))
    }
    if (localStorage.getItem("Partner")) {
      storedPartner = localStorage.getItem("Partner")
    }
    if (localStorage.getItem("Referrer")) {
      storedReferrer = localStorage.getItem("Referrer")
    }
    if (localStorage.getItem("SalesRep")) {
      storedSalesRep = localStorage.getItem("SalesRep")
    }
    if (localStorage.getItem("Affiliate")) {
      storedAffiliate = localStorage.getItem("Affiliate")
    }
    if (localStorage.getItem("UtmCampaign")) {
      storedUtmCampaign = localStorage.getItem("UtmCampaign")
    }
    if (localStorage.getItem("UtmMedium")) {
      storedUtmMedium = localStorage.getItem("UtmMedium")
    }
    if (localStorage.getItem("UtmSource")) {
      storedUtmSource = localStorage.getItem("UtmSource")
    }
    if (localStorage.getItem("email")) {
      storedEmail = localStorage.getItem("email")
    }

    this.setState({
      utility: storedUtility.label,
      postalCode: storedPostalCode,
      referrer: storedReferrer,
      partner: storedPartner,
      salesRep: storedSalesRep,
      affiliate: storedAffiliate,
      utmCampaign: storedUtmCampaign,
      utmMedium: storedUtmMedium,
      utmSource: storedUtmSource,
      agreedTermsAndConditions: storedAgreementChecked,
      email: storedEmail
    })
  }

  autenticate(values) {
    if (values.password === values.passwordConfirmation) {
      window.firebase
        .auth()
        .createUserWithEmailAndPassword(values.emailAddress, values.password)
        .catch(error => {
          if (error.code === "auth/email-already-in-use") {
            this.setState({
              error: {
                code: error.code,
                message: "Already have a login and password?",
                link: <a href="/">Go here</a>
              }
            })
          } else {
            this.setState({
              error: { code: error.code, message: error.message }
            })
          }
        })
        .then(userCredential => {
          if (userCredential) {
            window.localStorage.setItem(
              "firebaseUserId",
              userCredential.user.uid
            )
            window.firebase
              .auth()
              .currentUser.getIdToken(true)
              .then(idToken => {
                axios
                  .post(
                    `${API}/v1/subscribers`,
                    {
                      Email: values.emailAddress,
                      Password: values.password,
                      Referrer: this.state.referrer,
                      Partner: this.state.partner,
                      SalesRep: this.state.salesRep,
                      Affiliate: this.state.affiliate,
                      postalCode: this.state.postalCode,
                      agreementChecked: !!this.state.agreedTermsAndConditions,
                      utility: this.state.utility,
                      utmCampaign: this.state.utmCampaign,
                      utmMedium: this.state.utmMedium,
                      utmSource: this.state.utmSource,
                      firebaseUserId: userCredential.user.uid
                    },
                    {
                      headers: {
                        Authorization: idToken
                      }
                    }
                  )
                  .then(response => {
                    window.localStorage.setItem(
                      "leadId",
                      response.data.data.leadId
                    )

                    // Call Segement events
                    global.analytics.alias(response.data.data.leadId)
                    global.analytics.identify(response.data.data.leadId, {
                      email: values.emailAddress
                    })
                    global.analytics.track("Lead Created", {})

                    Router.push({
                      pathname: "/onboarding/step4"
                    })
                  })
              })
          }
        })
    } else {
      this.setState({
        error: { code: "6", message: "Passwords do not match" }
      })
    }
  }

  render() {
    const { email, error } = this.state

    return (
      <main>
        <Header />
        <SingleStep title="Ok, now for the fun stuff. Let's create your account!">
          <Formik
            initialValues={{
              emailAddress: email,
              password: "",
              passwordConfirmation: ""
            }}
            onSubmit={values => {
              window.localStorage.setItem("email", values.emailAddress)
              this.autenticate(values)
            }}
            render={props => (
              <Form>
                <Input
                  type="email"
                  label="Email"
                  fieldname="emailAddress"
                  required
                />
                <Input
                  type="password"
                  label="Password"
                  fieldname="password"
                  required
                />
                <Input
                  type="password"
                  label="Confirm Password"
                  fieldname="passwordConfirmation"
                  required
                />
                <p className="error">
                  {error.message} {error.link && error.link}
                </p>
                <Button
                  primary
                  disabled={
                    !!props.values.emailAddress !== true ||
                    !!props.values.password !== true
                  }
                  onClick={() => {
                    this.setState({
                      error: {
                        code: false,
                        message: ""
                      }
                    })
                  }}
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
            height: 52px;
            margin: 0;
            padding: 1em 0;
            text-align: center;
          }
        `}</style>
      </main>
    )
  }
}

export default Step3
