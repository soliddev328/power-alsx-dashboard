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

const labelListCustom = ({ x, y, value }) => (
  <text
    x="50%"
    y={y}
    dy={-10}
    fill="#555e80"
    fontSize={17}
    fontFamily="Poppins"
    textAnchor="middle"
  >
    {value} lbs/MWh
  </text>
);

function EmissionsChart() {
  const [emissionsInfo, setEmissionsInfo] = useState();
  const [capAmount, setCapAmount] = useState();
  const [{ selectedAccount }] = useStateValue();

  const customLabel = ({ value }) => (
    <>
      <text
        x="50%"
        y={value >= capAmount / 2 ? "50%" : "101.5%"}
        dy={-10}
        fill="#fff"
        fontSize={18}
        opacity={0.9}
        fontFamily="Poppins"
        textAnchor="middle"
      >
        CO
      </text>
      <text
        x="62%"
        y={value >= capAmount / 2 ? "50.5%" : "102.5%"}
        dy={-10}
        fill="#fff"
        fontSize={13}
        opacity={0.9}
        fontFamily="Poppins"
        textAnchor="middle"
      >
        2
      </text>
    </>
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(async idToken => {
          const userInfo = await getUserData(user.uid, idToken);
          const { emissions } = userInfo.accounts[selectedAccount.value];
          setEmissionsInfo(emissions?.CO2);
          setCapAmount(emissions?.CO2 * 1.01);
        });
      }
    });
  }, [selectedAccount.value]);

  const oldData = [
    {
      name: "Utility's Emissions",
      co2: emissionsInfo,
      amt: capAmount
    }
  ];

  const newData = [
    {
      name: "Your emissions",
      co2: Math.round(emissionsInfo * 0.1),
      amt: capAmount
    }
  ];

  return (
    <div className="wrapper">
      <Section columns="2" noMargin>
        <aside>
          <Text style={{ textAlign: "center" }}>Utility’s Emissions</Text>
          <BarChart
            margin={{ top: 35, right: 0, bottom: 0, left: 0 }}
            width={150}
            height={280}
            data={oldData}
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
            data={newData}
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

        @media (max-width: 800px) {
          .arrow {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default EmissionsChart;
