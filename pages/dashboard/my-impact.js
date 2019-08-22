import React from "react"
import Router from "next/router"
import Main from "../../components/Main"
import Header from "../../components/Header"
import Button from "../../components/Button"
import Section from "../../components/Section"
import Separator from '../../components/Separator'
import Panel from "../../components/Panel"
import Text from "../../components/Text"
import Sidebar from "../../components/Sidebar"

export default function MyImpact() {
  return (
    <Main>
      <h2>My Impact</h2>
      <Section>
        <Panel>
          <Text>test</Text>
        </Panel>
      </Section>
      <Section columns="4">
        <Panel>
          <Text >Clean Energy (kWh)</Text>
          <Separator noMargin small />
        </Panel>
        <Panel>
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
    </Main>
  )
}
