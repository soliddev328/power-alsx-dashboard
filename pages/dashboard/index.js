import React from "react"
import Router from "next/router"
import Main from "../../components/Main"
import Header from "../../components/Header"
import Button from "../../components/Button"
import Section from "../../components/Section"
import Panel from "../../components/Panel"
import Text from "../../components/Text"
import Sidebar from "../../components/Sidebar"

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isAbleToSeeDashboard: ""
    }
  }

  componentDidMount() {
    window.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        global.analytics.page("Dashboard")

        let usercreated = ""
        let storedName = ""

        if (window.localStorage.getItem("usercreated")) {
          usercreated = window.localStorage.getItem("usercreated")
        }
        if (window.localStorage.getItem("username")) {
          storedName = JSON.parse(window.localStorage.getItem("username"))
        }

        this.setState({ isAbleToSeeDashboard: usercreated, name: storedName })
      } else {
        Router.push({
          pathname: "/"
        })
      }
    })
  }

  renderDashboard() {
    return (
      <Main>
        <h2>Welcome John</h2>
        <Section columns="5">
          <Panel>
            <Text>test</Text>
          </Panel>
          <Panel>
            <Text>test</Text>
          </Panel>
          <Panel >
            <Text>test</Text>
          </Panel>
          <Panel>
            <Text>test</Text>
          </Panel>
          <Panel>
            <Text>test</Text>
          </Panel>
        </Section>
        <Section>
          <Panel>
            <Text>test</Text>
          </Panel>
        </Section>
        <Section>
          <Panel>
            <Text>test</Text>
          </Panel>
        </Section>
        <Section columns="5">
          <Panel>
            <Text>test</Text>
          </Panel>
          <Panel>
            <Text>test</Text>
          </Panel>
          <Panel >
            <Text>test</Text>
          </Panel>
          <Panel>
            <Text>test</Text>
          </Panel>
          <Panel>
            <Text>test</Text>
          </Panel>
        </Section>
        <Section>
          <Panel>
            <Text>test</Text>
          </Panel>
        </Section>
        <Section>
          <Panel>
            <Text>test</Text>
          </Panel>
        </Section>
        <Section columns="5">
          <Panel>
            <Text>test</Text>
          </Panel>
          <Panel>
            <Text>test</Text>
          </Panel>
          <Panel >
            <Text>test</Text>
          </Panel>
          <Panel>
            <Text>test</Text>
          </Panel>
          <Panel>
            <Text>test</Text>
          </Panel>
        </Section>
        <Section>
          <Panel>
            <Text>test</Text>
          </Panel>
        </Section>
        <Section>
          <Panel>
            <Text>test</Text>
          </Panel>
        </Section>
      </Main>
    )
  }

  renderError() {
    return (
      <main>
        <Header />
        <h3>Sorry you're not allowed to see the dashboard yet</h3>
        <p>In order to see the dashboard please sign up</p>
        <Button
          primary
          onClick={() => {
            Router.push({
              pathname: "/"
            })
          }}
        >
          Sign up
        </Button>
        <style jsx>{`
          main {
            display: block;
            height: 88vh;
            max-width: 700px;
            margin: 0 auto;
            text-align: center;
          }
        `}</style>
      </main>
    )
  }

  render() {
    const { isAbleToSeeDashboard } = this.state
    return isAbleToSeeDashboard
      ? this.renderDashboard()
      : () => {
        Router.push({
          pathname: "/"
        })
      }
  }
}

export default Dashboard
