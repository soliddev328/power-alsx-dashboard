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
  mapValuesToPayload: x => x,
  handleSubmit: payload => {
    Router.push({
      pathname: "/onboarding/step3"
    })
  },
  displayName: "CustomForm"
})

class CustomForm extends React.Component {
  render() {
    const imageUrl = this.props.project && this.props.project.imageUrl

    const completion =
      this.props.project && this.props.project.completion
        ? this.props.project.completion
        : false

    return (
      <Form>
        <div className="content">
          <figure>
            <img src={imageUrl} alt="" />
          </figure>
          {completion && <Progressbar completion={completion} />}
          <div className="items">
            <BulletItem
              content="Prevent emissions and pollution in your community"
              bulletIcon="co2"
            />
            <BulletItem
              content="Save $10-15 per month on your energy bill"
              bulletIcon="dollar"
            />
            <BulletItem
              content="Making a positive impact on the environment — the equivalent of planting up to 22 trees each month!"
              bulletIcon="plant"
            />
            <BulletItem content="No cancellation fees" bulletIcon="cross" />
          </div>
        </div>
        <Button primary>Let's do this!</Button>
        <style jsx>{`
          .content {
            margin-bottom: 2rem;
            min-height: 370px;
          }

          .disclaimer {
            text-align: center;
          }

          figure {
            max-width: 100vw;
            height: 190px;
            margin: 1.5rem -7% 0 -7%;
            background-color: transparent;
            overflow: hidden;
            display: flex;
          }

          img {
            max-width: 100%;
            object-fit: cover;
            object-position: top;
            opacity: 0;
            animation: fadeIn 400ms ease-in-out forwards;
            animation-delay: 0.4s;
          }

          .items {
            margin-top: 20px;
            opacity: 0;
            animation: fadeIn 400ms ease-in-out forwards;
            animation-delay: 0.6s;
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

class Step2 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      utility: {
        project: {
          imageUrl: "/static/images/illustrations/t&c.png",
          name: "",
          completion: ""
        }
      }
    }

    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    global.analytics.page("Step 2")

    this.getData()
  }

  getData() {
    let utility = ""
    let state = ""

    if (localStorage.getItem("utility")) {
      utility = JSON.parse(localStorage.getItem("utility"))
    }

    if (localStorage.getItem("state")) {
      state = localStorage.getItem("state")
    }

    const rawParams = {
      state: state,
      utility: encodeURIComponent(utility.label)
    }

    const generatedParams = Object.entries(rawParams)
      .map(([key, val]) => `${key}=${val}`)
      .join("&")

    axios(`${API}/v1/utilities?${generatedParams}`)
      .then(response => {
        if (response.data.data) {
          const data = response.data.data[0]

          this.setState({
            utility: {
              project: {
                imageUrl:
                  data.projects[0].imageUrl !== null
                    ? data.projects[0].imageUrl
                    : "/static/images/illustrations/t&c.png",
                name: data.projects[0].displayName || false,
                completion: data.projects[0].completion || false
              }
            }
          })
        }
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <main>
        <Header />
        <SingleStep
          prefix="Great news!"
          title="We've got a project in your area."
          suffix={
            this.state.utility.project && this.state.utility.project.name
              ? this.state.utility.project.name
              : ""
          }
        >
          <EnhancedCustomForm project={this.state.utility.project} />
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

export default Step2
