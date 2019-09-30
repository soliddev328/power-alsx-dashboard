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
import cn from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";
import Text from "../../components/Text";
import Container from "../../components/Container";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const getProductionData = async (project, idToken) => {
  const currentTime = new Date();
  const response = await axios.get(
    `${API}/v1/productions/${project
      .split(" ")
      .join("")}?startTime=${currentTime.setHours(
      currentTime.getHours() - 2
    )}&endTime=${Date.now()}`,
    {
      headers: {
        Authorization: idToken
      }
    }
  );
  return response && response.data && response.data.data;
};

export default function ProductionChart({ projectName }) {
  const mockedData = [
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

  const [data, setData] = useState(mockedData);
  const [mocked, setMocked] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(async idToken => {
          // setData(getProductionData(projectName, idToken));
          const test = await getProductionData(projectName, idToken);
          console.log("test");
          setMocked(false);
        });
      } else {
        Router.push({
          pathname: "/"
        });
      }
    });
  }, []);

  return (
    <div className={cn("wrapper", { disabled: mocked })}>
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
      <div className="disclaimer">
        <Text>Currently there is no information available</Text>
      </div>
      <style jsx>{`
        .wrapper {
          max-width: 100%;
          margin-top: 30px;
          margin-left: -30px;
          position: relative;
        }

        .wrapper.disabled > :global(*:not(.disclaimer)) {
          opacity: 0.1;
          pointer-events: none;
        }

        .disclaimer {
          display: none;
          visibility: hidden;
        }

        .wrapper.disabled .disclaimer {
          display: block;
          visibility: visible;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
}
