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
import Router from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Panel from "../../components/Panel";
import Text from "../../components/Text";
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
  const [data, setData] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(async idToken => {
          setData(await getProductionData(projectName, idToken));
        });
      } else {
        Router.push({
          pathname: "/"
        });
      }
    });
  }, []);

  return data.length > 1 ? (
    <Section>
      <Panel>
        <Container>
          <Text h3 style={{ marginBottom: "20px" }}>
            Production chart
          </Text>
          <div className="wrapper">
            <Container height="295px">
              <ResponsiveContainer width="100%">
                <AreaChart data={data} margin={{ bottom: 15 }}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="40%" stopColor="#2479ff" stopOpacity={0} />
                      <stop
                        offset="100%"
                        stopColor="#2479ff"
                        stopOpacity={0.1}
                      />
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
                max-width: 100%;
                margin-top: 30px;
                margin-left: -30px;
                position: relative;
              }
            `}</style>
          </div>
        </Container>
      </Panel>
    </Section>
  ) : null;
}
