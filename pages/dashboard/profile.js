import { Formik } from "formik"
import Main from "../../components/Main"
import Section from "../../components/Section"
import Panel from "../../components/Panel"
import Text from "../../components/Text"
import Input from "../../components/Input"

export default function Profile() {
  return (
    <Main>
      <Text h2>Profile</Text>
      <Formik
        initialValues={{}}
        onSubmit={values => {}}
        render={props => (
          <>
            <Section columns="2">
              <Input outerLabel fullWidth label="Name" fieldname="name" />
              <Input
                outerLabel
                fullWidth
                label="Last Name"
                fieldname="last-name"
              />
            </Section>
            <Section columns="3">
              <Input outerLabel fullWidth label="Email" fieldname="email" />
              <Input
                outerLabel
                fullWidth
                label="Primary Address"
                fieldname="primary-address"
              />
              <Input
                outerLabel
                fullWidth
                label="Phone Number"
                fieldname="phone-number"
              />
            </Section>
            <Section>
              <Input
                outerLabel
                fullWidth
                label="Form of Payment"
                fieldname="form-of-payment"
              />
            </Section>
          </>
        )}
      />
    </Main>
  )
}
