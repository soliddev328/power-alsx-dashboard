import Main from "../../components/Main";
import Section from "../../components/Section";
import Panel from "../../components/Panel";
import Image from "../../components/Image";
import Text from "../../components/Text";

export default function MySource({ image = true }) {
  return (
    <Main>
      <Text h2 hasDecoration>
        My Source
      </Text>
      <Section>
        {image ? (
          <Image hasBorder src="/static/images/illustrations/t&c.png" alt="" />
        ) : (
          <Panel>
            <Text>test</Text>
          </Panel>
        )}
      </Section>
      <Section>
        <Panel>
          <Text h3>Project Summary</Text>
          <Text>Project Address: XYZ Country</Text>
          <Text>Project Size: 2.7MW DC</Text>
          <Text>Annual generation: 3,300,200 kWh</Text>
          <Text>Annual avoided CO2: 4.1M pounds</Text>
          <Text>Equivalent trees planted: 23</Text>
        </Panel>
      </Section>
    </Main>
  );
}
