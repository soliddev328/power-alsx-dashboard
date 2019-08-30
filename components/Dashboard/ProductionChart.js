import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts"
import Container from "../../components/Container"

export default function ProductionChart() {
  const data = [
    {
      time: "8:00",
      kw: 12
    },
    {
      time: "8:15",
      kw: 23
    },
    {
      time: "8:30",
      kw: 5
    },
    {
      time: "8:45",
      kw: 22
    },
    {
      time: "9:00",
      kw: 4
    },
    {
      time: "9:15",
      kw: 12
    },
    {
      time: "9:30",
      kw: 9
    }
  ]

  return (
    <div className="wrapper">
      <Container height="295px">
        <ResponsiveContainer width="100%">
          <LineChart data={data} margin={{ bottom: 15 }}>
            <XAxis dataKey="time">
              <Label value="Time" position="insideBottom" offset={-15} />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="kw"
              stroke="#2479ff"
              strokeWidth="2px"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Container>
      <style jsx>{`
        .wrapper {
          margin-top: 30px;
          margin-left: -30px;
        }
      `}</style>
    </div>
  )
}
