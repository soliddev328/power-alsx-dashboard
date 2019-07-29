import React from "react"
import Router from "next/router"
import { Formik, Form } from "formik"
import Cookie from "js-cookie"
import Header from "../../components/Header"
import Input from "../../components/Input"
import ZipCodeInput from "../../components/ZipcodeInput"
import SingleStep from "../../components/SingleStep"
import CustomSelect from "../../components/CustomSelect"
import Button from "../../components/Button"
import axios from "axios"
import CONSTANTS from "../../globals"

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod

class Step1 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      address: "",
      postalCode: "",
      currentUtility: "",
      error: {
        code: false,
        message: ""
      }
    }
    this.select = React.createRef()
  }

  componentDidMount() {
    global.analytics.page("Step 1")
    global.analytics.track("Sign-Up Initiated", {})

    localStorage.removeItem("Partner")
    localStorage.removeItem("Referrer")
    localStorage.removeItem("SalesRep")
    localStorage.removeItem("Affiliate")
    localStorage.removeItem("postalCode")
    localStorage.removeItem("utility")
    localStorage.removeItem("email")
    localStorage.removeItem("username")

    let customerReferralCookie = Cookie.get("customer_referral")
    let partnerReferralCookie = Cookie.get("partner_referral")
    let salesRepCookie = Cookie.get("ce_rep_referral")
    let utmCampaignCookie = Cookie.get("_ce_campaign")
    let utmSourceCookie = Cookie.get("_ce_source")
    let utmMediumCookie = Cookie.get("_ce_medium")
    let storedAddress = ""
    let storedPostalCode = ""

    if (partnerReferralCookie) {
      localStorage.setItem("Partner", partnerReferralCookie)
    }
    if (salesRepCookie) {
      localStorage.setItem("SalesRep", salesRepCookie)
    }
    if (customerReferralCookie) {
      localStorage.setItem("Referrer", customerReferralCookie)
    }
    if (utmCampaignCookie) {
      localStorage.setItem("UtmCampaign", utmCampaignCookie)
    }
    if (utmSourceCookie) {
      localStorage.setItem("UtmSource", utmSourceCookie)
    }
    if (utmMediumCookie) {
      localStorage.setItem("UtmMedium", utmMediumCookie)
    }

    if (this.props) {
      if (this.props.query.partner) {
        localStorage.setItem("Partner", this.props.query.partner)
      }
      if (this.props.query.advocate) {
        localStorage.setItem("Referrer", this.props.query.advocate)
      }
      if (this.props.query.rep) {
        localStorage.setItem("SalesRep", this.props.query.rep)
      }
      if (this.props.query.affiliate) {
        localStorage.setItem("Affiliate", this.props.query.affiliate)
      }
      if (this.props.query.utm_campaign) {
        localStorage.setItem("UtmCampaign", this.props.query.utm_campaign)
      }
      if (this.props.query.utm_source) {
        localStorage.setItem("UtmSource", this.props.query.utm_source)
      }
      if (this.props.query.utm_medium) {
        localStorage.setItem("UtmMedium", this.props.query.utm_medium)
      }
    }
  }

  capitalize(word) {
    return word && word[0].toUpperCase() + word.slice(1)
  }

  autenticate(values) {
    const name = {
      firstName: values.firstName,
      lastName: values.lastName
    }

    localStorage.setItem("email", values.emailAddress)
    localStorage.setItem("postalCode", JSON.stringify(values.postalCode))
    localStorage.setItem("username", JSON.stringify(name))

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
          window.localStorage.setItem("firebaseUserId", userCredential.user.uid)
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
                    firstName: values.firstName,
                    lastName: values.lastName,
                    Referrer: this.state.referrer,
                    Partner: this.state.partner,
                    SalesRep: this.state.salesRep,
                    Affiliate: this.state.affiliate,
                    postalCode: this.state.postalCode,
                    agreementChecked: !!this.state.agreedTermsAndConditions,
                    utility: values.currentUtility,
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

                  if (values.currentUtility !== "") {
                    localStorage.setItem(
                      "utility",
                      JSON.stringify(values.currentUtility)
                    )
                    Router.push({
                      pathname: "/onboarding/step2"
                    })
                  } else if (this.select.current.state.singleOption) {
                    localStorage.setItem(
                      "utility",
                      JSON.stringify(this.select.current.state.options[0])
                    )
                    Router.push({
                      pathname: "/onboarding/step2"
                    })
                  } else {
                    Router.push({
                      pathname: "/onboarding/sorry"
                    })
                  }

                  // Call Segement events
                  global.analytics.alias(response.data.data.leadId)
                  global.analytics.identify(response.data.data.leadId, {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.emailAddress
                  })
                  global.analytics.track("Lead Created", {})
                })
            })
        }
      })
  }

  static getInitialProps({ query }) {
    return { query }
  }

  render() {
    const { email, error, firstName, lastName } = this.state
    const { query } = this.props

    return (
      <main>
        <Header />
        <SingleStep title="Hi, I'm Martin! Let's see if we have a project in your area. What is your zip code?">
          <Formik
            initialValues={{
              postalCode: query.zipcode,
              currentUtility: "",
              emailAddress: email,
              firstName: firstName,
              lastName: lastName,
              password: ""
            }}
            onSubmit={values => {
              this.autenticate(values)
            }}
            render={props => (
              <React.Fragment>
                <Form>
                  <div className="two-columns two-columns--responsive">
                    <Input label="First Name" fieldname="firstName" autoFocus />
                    <Input label="Last Name" fieldname="lastName" />
                  </div>
                  <ZipCodeInput
                    value={props.values.postalCode}
                    onChangeEvent={props.setFieldValue}
                    onBlurEvent={props.setFieldTouched}
                    label="ZipCode"
                    fieldname="postalCode"
                  />
                  <CustomSelect
                    ref={this.select}
                    zipCode={props.values.postalCode}
                    value={props.currentUtility}
                    disabled={!props.values.postalCode}
                    onChange={props.setFieldValue}
                    onBlur={props.setFieldTouched}
                    touched={props.touched}
                    fieldname="currentUtility"
                  />
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
                  <p className="error">
                    {error.message} {error.link && error.link}
                  </p>
                  <Button
                    primary
                    disabled={
                      !!props.values.firstName !== true ||
                      !!props.values.lastName !== true ||
                      !!props.values.postalCode !== true ||
                      !!props.values.emailAddress !== true ||
                      !!props.values.password !== true
                    }
                  >
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

export default Step1
