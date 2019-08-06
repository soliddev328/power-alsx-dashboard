import React from "react"
import Router from "next/router"
import { Formik, Form } from "formik"
import axios from "axios"
import Phoneinput from "../../components/Phoneinput"
import Header from "../../components/Header"
import SingleStep from "../../components/SingleStep"
import Button from "../../components/Button"
import Stepper from "../../components/Stepper"
import CONSTANTS from "../../globals"

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod

class Step4 extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    global.analytics.page("Step 4")

    let storedLeadId = ""
    let storedUtilityPaperOnly = false

    if (localStorage.getItem("leadId")) {
      storedLeadId = localStorage.getItem("leadId")
    }

    if (localStorage.getItem("utility")) {
      let storedUtility = JSON.parse(localStorage.getItem("utility"))
      if (storedUtility && storedUtility.paperOnly)
        storedUtilityPaperOnly = true
    }

    this.setState({
      leadId: storedLeadId,
      storedUtilityPaperOnly
    })
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep title="And what phone number would you like to use with the account?">
          <Formik
            initialValues={{
              phoneNumber: ""
            }}
            onSubmit={values => {
              localStorage.setItem("phoneNumer", values.phoneNumber)
              window.firebase
                .auth()
                .currentUser.getIdToken(true)
                .then(idToken => {
                  axios
                    .put(
                      `${API}/v1/subscribers`,
                      {
                        leadId: this.state.leadId,
                        phone: values.phoneNumber
                      },
                      {
                        headers: {
                          Authorization: idToken
                        }
                      }
                    )
                    .then(() => {
                      if (this.state.storedUtilityPaperOnly) {
                        localStorage.setItem(
                          "billingMethod",
                          JSON.stringify({
                            billingMethod: "paper"
                          })
                        )
                        Router.push({
                          pathname: "/onboarding/step5"
                        })
                      } else {
                        localStorage.setItem(
                          "billingMethod",
                          JSON.stringify(values)
                        )
                        Router.push({
                          pathname: "/onboarding/step5"
                        })
                      }
                    })
                    .catch(() => {})
                })
            }}
            render={props => (
              <Form>
                <Phoneinput
                  value={props.values.phoneNumber}
                  onChangeEvent={props.setFieldValue}
                  onBlurEvent={props.setFieldTouched}
                  label="Phone"
                  fieldname="phoneNumber"
                />
                <Button primary disabled={!props.values.phoneNumber != ""}>
                  Next
                </Button>
              </Form>
            )}
          />
          <Stepper>
            <li className="steplist__step steplist__step-done">1</li>
            <li className="steplist__step steplist__step-done">2</li>
            <li className="steplist__step steplist__step-doing">3</li>
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
        `}</style>
      </main>
    )
  }
}

export default Step4
