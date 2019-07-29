import React from "react"
import Router from "next/router"
import { Form, withFormik } from "formik"
import axios from "axios"
import Header from "../../components/Header"
import Checkbox from "../../components/Checkbox"
import BulletItem from "../../components/BulletItem"
import Progressbar from "../../components/Progressbar"
import SingleStep from "../../components/SingleStep"
import Button from "../../components/Button"
import CONSTANTS from "../../globals"

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod

const formikEnhancer = withFormik({
  mapPropsToValues: props => {
    return {
      terms: props.agreement.terms,
      conditions: props.agreement.conditions
    }
  },
  mapValuesToPayload: x => x,
  handleSubmit: payload => {
    localStorage.setItem(
      "acceptedTermsAndConditions",
      JSON.stringify(payload.acceptedTermsAndConditions)
    )
    window.firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        axios
          .put(
            `${API}/v1/subscribers`,
            {
              agreementChecked: !!payload.acceptedTermsAndConditions
            },
            {
              headers: {
                Authorization: idToken
              }
            }
          )
          .then(() => {
            Router.push({
              pathname: "/onboarding/step10"
            })
          })
          .catch(() => {})
      })
  },
  displayName: "CustomForm"
})

class CustomForm extends React.Component {
  render() {
    return (
      <Form>
        <div className="content">
          <div className="items">
            <BulletItem content="10% contracted discount" bulletIcon="dollar" />
            <BulletItem
              content="90% reduction in carbon emissions"
              bulletIcon="co2"
            />
          </div>
        </div>
        <Checkbox fieldname="acceptedTermsAndConditions">
          <p className="checkbox__label">
            I authorize Common Energy to act as my Agent and to enroll me in a
            clean energy savings program, according to these{" "}
            <a
              href={this.props.agreement.terms}
              target="_blank"
              rel="noopener noreferrer"
            >
              terms
            </a>{" "}
            and{" "}
            <a
              href={this.props.agreement.conditions}
              target="_blank"
              rel="noopener noreferrer"
            >
              conditions
            </a>
            .
          </p>
        </Checkbox>
        <Button
          primary
          disabled={!this.props.values.acceptedTermsAndConditions}
        >
          Let's do this!
        </Button>
        <style jsx>{`
          .content {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
            min-height: 250px;
          }

          .disclaimer {
            text-align: center;
          }

          .items {
            margin-top: 20px;
            opacity: 0;
            animation: fadeIn 400ms ease-in-out forwards;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        `}</style>
      </Form>
    )
  }
}

const EnhancedCustomForm = formikEnhancer(CustomForm)

class Step9 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      utility: {
        project: {
          imageUrl: "/static/images/illustrations/t&c.png",
          name: "",
          completion: ""
        },
        agreement: {
          terms: "",
          conditions: ""
        }
      }
    }

    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    global.analytics.page("Step 9")

    this.getData()
  }

  getData() {
    let utility = ""
    let state = ""

    if (localStorage.getItem("utility")) {
      utility = JSON.parse(localStorage.getItem("utility"))
    }

    if (localStorage.getItem("state")) {
      state = JSON.parse(localStorage.getItem("state"))
    }

    const rawParams = {
      state: state,
      utility: encodeURIComponent(utility.label)
    }

    const generatedParams = Object.entries(rawParams)
      .map(([key, val]) => `${key}=${val}`)
      .join("&")

    this.setState({
      utility: {
        agreement: {
          terms: utility.terms,
          conditions: utility.conditions
        }
      }
    })

    axios(`${API}/v1/utilities?${generatedParams}`).then(response => {
      if (response.data.data) {
        const data = response.data.data[0]
        this.setState({
          utility: {
            agreement: {
              terms: data.agreement.termsLink,
              conditions: data.agreement.conditionsLink
            }
          }
        })
      }
    })
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          prefix="Great news!"
          title="We've got a project in your area."
        >
          <EnhancedCustomForm agreement={this.state.utility.agreement} />
        </SingleStep>
        <style jsx>{`
          main {
            display: block;
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
          }
          .content {
            margin: 0 auto;
          }
          .disclaimer {
            text-align: center;
            font-size: 0.8rem;
            margin-top: 0;
          }
          :global(.checkbox__label) {
            margin-top: 0;
          }
        `}</style>
      </main>
    )
  }
}

export default Step9
