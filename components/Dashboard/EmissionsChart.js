import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Label,
  Tooltip
} from "recharts";
import Text from "../Text";
import Section from "../Section";

function EmissionsChart() {
  return (
    <div className="wrapper">
      <Section columns="2" noMargin>
        <aside>
          <Text style={{ textAlign: "center" }}>Your Utility’s Emissions</Text>
        </aside>
        <aside>
          <Text style={{ textAlign: "center" }}>
            Your Emissions with Common Energy
          </Text>
        </aside>
      </Section>
    </div>
  );
}

export default EmissionsChart;
