import { Formik } from "formik"
import Main from "../../components/Main"
import Section from "../../components/Section"
import Panel from "../../components/Panel"
import Text from "../../components/Text"
import Sidebar from "../../components/Sidebar"
import Input from '../../components/Input'

export default function Profile() {
  return (
    <Main>
      <h2>Profile</h2>
      <Formik
        initialValues={{}}
        onSubmit={values => { }}
        render={props => (
          <>
            <Section columns="2">
              <Input fullWidth label="Name" fieldname="name" />
              <Input fullWidth label="Last Name" fieldname="last-name" />
            </Section>
            <Section columns="3">
              <Input fullWidth label="Email" fieldname="email" />
              <Input fullWidth label="Primary Address" fieldname="primary-address" />
              <Input fullWidth label="Phone Number" fieldname="phone-number" />
            </Section>
            <Section>
              <Input fullWidth label="Form of Payment" fieldname="form-of-payment" />
            </Section>
          </>
        )}
      />
    </Main>
  )
}
