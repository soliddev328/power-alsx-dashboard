import { useState, useEffect } from "react";
import { BarChart, Bar, YAxis, CartesianGrid, LabelList } from "recharts";
import Text from "../Text";
import Section from "../Section";
import { useStateValue } from "../../state";
import ArrowIcon from "../Icons/ArrowIcon";
import axios from "axios";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const getUserData = async (userUid, idToken) => {
  const response = await axios.get(`${API}/v1/subscribers/${userUid}`, {
    headers: {
      Authorization: idToken
    }
  });
  return response && response.data && response.data.data;
};

const customLabel = ({ x, y, value }) => (
  <text
    x="50%"
    y={value >= 150 ? "50%" : "100%"}
    dy={-10}
    fill="#fff"
    fontSize={15}
    opacity={0.9}
    fontFamily="Poppins"
    textAnchor="middle"
  >
    CO2
  </text>
);

const labelListCustom = ({ x, y, value }) => (
  <text
    x="50%"
    y={y}
    dy={-10}
    fill="#555e80"
    fontSize={12}
    fontFamily="Poppins"
    textAnchor="middle"
  >
    {value} lbs/MWh
  </text>
);

function EmissionsChart() {
  const [emissionsInfo, setEmissionsInfo] = useState();
  const [{ selectedAccount }] = useStateValue();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(async idToken => {
          const userInfo = await getUserData(user.uid, idToken);
          const { emissions } = userInfo.accounts[selectedAccount.value];
          setEmissionsInfo(emissions?.co2 * 0.1);
        });
      }
    });
  }, [selectedAccount.value]);

  const data0 = [
    {
      name: "Utility's Emissions",
      co2: 295,
      amt: 300
    }
  ];

  const data1 = [
    {
      name: "Your emissions",
      co2: 30,
      amt: 300
    }
  ];

  return (
    <div className="wrapper">
      <Section columns="2" noMargin>
        <aside>
          <Text style={{ textAlign: "center" }}>Your Utility’s Emissions</Text>
          <BarChart
            margin={{ top: 35, right: 0, bottom: 0, left: 0 }}
            width={150}
            height={280}
            data={data0}
          >
            <CartesianGrid vertical={false} />
            <YAxis dataKey="amt" hide />
            <Bar label={customLabel} dataKey="co2" fill="#113a7a">
              <LabelList
                content={labelListCustom}
                dataKey="co2"
                position="top"
              />
            </Bar>
          </BarChart>
          <div className="arrow">
            <ArrowIcon color="#2479ff" width="27" height="26" />
          </div>
        </aside>
        <aside>
          <Text style={{ textAlign: "center" }}>
            Your Emissions with Common Energy
          </Text>
          <BarChart
            margin={{ top: 35, right: 0, bottom: 0, left: 0 }}
            width={150}
            height={280}
            data={data1}
          >
            <CartesianGrid vertical={false} />
            <YAxis dataKey="amt" hide />
            <Bar label={customLabel} dataKey="co2" fill="#113a7a">
              <LabelList
                content={labelListCustom}
                dataKey="co2"
                position="top"
              />
            </Bar>
          </BarChart>
        </aside>
      </Section>
      <style jsx>{`
        aside {
          display: grid;
          grid-template-rows: 100px 1fr;
          justify-items: center;
          position: relative;
        }

        .arrow {
          position: absolute;
          right: -18%;
          top: 60%;
        }
      `}</style>
    </div>
  );
}

export default EmissionsChart;
