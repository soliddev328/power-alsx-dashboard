import Main from "../../components/Main"
import Section from "../../components/Section"
import Panel from "../../components/Panel"
import Text from "../../components/Text"

export default function MySource() {
  return (
    <Main>
      <Text h2>My Source</Text>
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
