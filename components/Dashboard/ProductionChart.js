import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import Container from "../../components/Container";

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
  ];

  return (
    <div className="wrapper">
      <Container height="295px">
        <ResponsiveContainer width="100%">
          <AreaChart data={data} margin={{ bottom: 15 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="40%" stopColor="#2479ff" stopOpacity={0} />
                <stop offset="100%" stopColor="#2479ff" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time">
              <Label value="Time" position="insideBottom" offset={-15} />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="kw"
              strokeWidth="2px"
              stroke="#2479ff"
              fillOpacity={1}
              fill="url(#colorUv)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Container>
      <style jsx>{`
        .wrapper {
          margin-top: 30px;
          margin-left: -30px;
        }
      `}</style>
    </div>
  );
}
