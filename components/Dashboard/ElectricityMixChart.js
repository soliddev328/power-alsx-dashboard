import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import Text from "../Text";
import { useStateValue } from "../../state";
import Section from "../Section";
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

const Reference = ({ label, color }) => (
  <div className="reference-wrapper">
    <span className="indicator" />
    <Text noMargin>{label}</Text>
    <style jsx>{`
      .reference-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 14px;
      }
      .indicator {
        width: 14px;
        height: 14px;
        margin-right: 10px;
        background-color: ${color};
      }
    `}</style>
  </div>
);

function ElectricityMixChart() {
  const [electricityMixInfo, setElectricityMixInfo] = useState();
  const [{ selectedAccount }] = useStateValue();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(async idToken => {
          const userInfo = await getUserData(user.uid, idToken);
          setElectricityMixInfo(
            userInfo.accounts[selectedAccount.value].electricityMix
          );
        });
      }
    });
  }, [selectedAccount.value]);

  const data01 = [
    {
      name: "Coal",
      color: "#113a7a",
      value: 400
    },
    {
      name: "Nuclear",
      color: "#2479ff",
      value: 300
    },
    {
      name: "Renewables",
      color: "#41ef8b",
      value: 300
    },
    {
      name: "Natural Gas",
      color: "#1259c8",
      value: 200
    },
    {
      name: "Hydro",
      color: "#87b5ff",
      value: 278
    },
    {
      name: "Other",
      color: "#cde0ff",
      value: 189
    }
  ];

  const data02 = [
    {
      name: "Coal",
      color: "#113a7a",
      value: 2400
    },
    {
      name: "Nuclear",
      color: "#2479ff",
      value: 4567
    },
    {
      name: "Renewables",
      color: "#41ef8b",
      value: 1398
    },
    {
      name: "Natural Gas",
      color: "#1259c8",
      value: 9800
    },
    {
      name: "Hydro",
      color: "#87b5ff",
      value: 3908
    },
    {
      name: "Other",
      color: "#cde0ff",
      value: 4800
    }
  ];

  return (
    <div className="wrapper">
      <Section columns="2" noMargin>
        <aside>
          <Text style={{ textAlign: "center" }}>Your Electricity Mix</Text>
          <PieChart width={180} height={180}>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              fill="#82ca9d"
            >
              {data01.map((entry, index) => (
                <Cell fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </aside>
        <aside>
          <Text style={{ textAlign: "center" }}>
            Your Electricity Mix with Common Energy
          </Text>
          <PieChart width={180} height={180}>
            <Pie
              data={data02}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              fill="#82ca9d"
            >
              {data02.map((entry, index) => (
                <Cell fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </aside>
      </Section>
      <div className="references">
        <Section noMargin noGap columns="3">
          <Reference color="#113a7a" label="Coal" />
          <Reference color="#2479ff" label="Nuclear" />
          <Reference color="#41ef8b" label="Renewables" />
          <Reference color="#1259c8" label="Natural Gas" />
          <Reference color="#87b5ff" label="Hydro" />
          <Reference color="#cde0ff" label="Other" />
        </Section>
      </div>
      <style jsx>{`
        aside {
          display: grid;
          grid-template-rows: 70px 1fr;
          justify-items: center;
        }
        .references {
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
}

export default ElectricityMixChart;
