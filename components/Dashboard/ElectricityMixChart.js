import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import axios from "axios";
import Text from "../Text";
import { useStateValue } from "../../state";
import Section from "../Section";
import ArrowIcon from "../Icons/ArrowIcon";
import { withFirebase } from "../../firebase";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const getUserData = async (userUid, idToken) => {
  const response = await axios.get(`${API}/v1/subscribers/${userUid}`, {
    headers: {
      Authorization: idToken
    }
  });
  return response?.data?.data;
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

function ElectricityMixChart(props) {
  const [electricityMixInfo, setElectricityMixInfo] = useState();
  const [{ selectedAccount }] = useStateValue();

  useEffect(() => {
    props.firebase.doUpdateUser(async (user, idToken) => {
      if (user) {
        const userInfo = await getUserData(user.uid, idToken);
        const { electricityMix } = userInfo?.accounts[selectedAccount.value];
        setElectricityMixInfo(electricityMix);
      }
    });
  }, [selectedAccount.value]);

  const oldData = [
    {
      name: "Coal",
      color: "#113a7a",
      value: electricityMixInfo?.coal
    },
    {
      name: "Nuclear",
      color: "#2479ff",
      value: electricityMixInfo?.nuclear
    },
    {
      name: "Renewables",
      color: "#41ef8b",
      value: electricityMixInfo?.renewables
    },
    {
      name: "Natural Gas",
      color: "#1259c8",
      value: electricityMixInfo?.gas
    },
    {
      name: "Hydro",
      color: "#87b5ff",
      value: electricityMixInfo?.hydro
    },
    {
      name: "Other",
      color: "#cde0ff",
      value: electricityMixInfo?.other
    }
  ];

  const newData = [
    {
      name: "Coal",
      color: "#113a7a",
      value: electricityMixInfo?.coal * 0.1
    },
    {
      name: "Nuclear",
      color: "#2479ff",
      value: electricityMixInfo?.nuclear * 0.1
    },
    {
      name: "Renewables",
      color: "#41ef8b",
      value: 90 + electricityMixInfo?.renewables * 0.1
    },
    {
      name: "Natural Gas",
      color: "#1259c8",
      value: electricityMixInfo?.gas * 0.1
    },
    {
      name: "Hydro",
      color: "#87b5ff",
      value: electricityMixInfo?.hydro * 0.1
    },
    {
      name: "Other",
      color: "#cde0ff",
      value: electricityMixInfo?.other * 0.1
    }
  ];

  return (
    <div className="wrapper">
      <Section columns="2" noMargin>
        <aside>
          <Text style={{ textAlign: "center" }}>Utility's Electricity Mix</Text>
          <PieChart width={180} height={180}>
            <Pie
              data={oldData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
            >
              {oldData.map((entry, index) => (
                <Cell fill={entry.color} key={`${index}-pie-item`} />
              ))}
            </Pie>
          </PieChart>
          <div className="arrow">
            <ArrowIcon color="#2479ff" width="27" height="26" />
          </div>
        </aside>
        <aside>
          <Text style={{ textAlign: "center" }}>
            Your Electricity Mix with Common Energy
          </Text>
          <PieChart width={180} height={180}>
            <Pie
              data={newData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
            >
              {newData.map((entry, index) => (
                <Cell fill={entry.color} key={`${index}-pie-item`} />
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
          position: relative;
        }

        .references {
          margin-top: 40px;
        }

        .arrow {
          position: absolute;
          right: -18%;
          top: 60%;
        }
        @media (max-width: 800px) {
          .arrow {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default withFirebase(ElectricityMixChart);
