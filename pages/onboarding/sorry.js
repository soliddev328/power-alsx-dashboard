import React from 'react'
import Router from 'next/router'
import { Formik, Form } from 'formik'
import axios from 'axios'
import Input from '../../components/Input'
import Header from '../../components/Header'
import SingleStep from '../../components/SingleStep'
import Button from '../../components/Button'
import CONSTANTS from '../../globals'

const { API } =
  CONSTANTS.NODE_ENV !== 'production' ? CONSTANTS.dev : CONSTANTS.prod

class Sorry extends React.Component {
  componentDidMount() {
    global.analytics.page('Out of area')

    let storedName = ''
    let storedAddress = ''

    if (window.localStorage.getItem('username')) {
      storedName = JSON.parse(window.localStorage.getItem('username'))
    }
    if (window.localStorage.getItem('address')) {
      storedAddress = JSON.parse(window.localStorage.getItem('address'))
    }

    this.setState({ name: storedName, address: storedAddress })
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
              email: ''
            }}
            onSubmit={values => {
              axios
                .post(`${API}/v1/subscribers`, {
                  Email: values.email.toLowerCase()
                })
                .then(() => {
                  Router.push({
                    pathname: '/'
                  })
                })
                .catch(() => {})
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
    )
  }
}

export default Sorry
