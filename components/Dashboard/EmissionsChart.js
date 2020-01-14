import { useState, useEffect } from "react";
import { BarChart, Bar, YAxis, CartesianGrid } from "recharts";
import Text from "../Text";
import Section from "../Section";
import { useStateValue } from "../../state";
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
    y={value >= 150 ? "50%" : "99%"}
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

function EmissionsChart() {
  const [emissionsInfo, setEmissionsInfo] = useState();
  const [{ selectedAccount }] = useStateValue();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(async idToken => {
          const userInfo = await getUserData(user.uid, idToken);
          const { emissions } = userInfo.accounts[selectedAccount.value];
          setEmissionsInfo(emissions.co2 * 0.1);
        });
      }
    });
  }, [selectedAccount.value]);

  const data0 = [
    {
      name: "Utility's Emissions",
      co2: emissionsInfo,
      amt: 300
    }
  ];

  const data1 = [
    {
      name: "Page A",
      co2: 30,
      amt: 300
    }
  ];

  return (
    <div className="wrapper">
      <Section columns="2" noMargin>
        <aside>
          <Text style={{ textAlign: "center" }}>Your Utility’s Emissions</Text>
          <BarChart width={150} height={280} data={data0}>
            <CartesianGrid vertical={false} />
            <YAxis dataKey="amt" hide />
            <Bar label={customLabel} dataKey="co2" fill="#113a7a" />
          </BarChart>
        </aside>
        <aside>
          <Text style={{ textAlign: "center" }}>
            Your Emissions with Common Energy
          </Text>
          <BarChart width={150} height={280} data={data1}>
            <CartesianGrid vertical={false} />
            <YAxis dataKey="amt" hide />
            <Bar label={customLabel} dataKey="co2" fill="#113a7a" />
          </BarChart>
        </aside>
      </Section>
      <style jsx>{`
        aside {
          display: grid;
          grid-template-rows: 70px 1fr;
          justify-items: center;
        }
      `}</style>
    </div>
  );
}

export default EmissionsChart;
