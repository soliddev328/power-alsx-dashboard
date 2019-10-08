import { useEffect, useState } from "react";
import cn from "classnames";
import Container from "../Container";
import Section from "../Section";
import Panel from "../Panel";
import Table from "../Table";
import Text from "../Text";

const mapDetails = data => {
  const allItems = [];
  data.forEach(element => {
    const singleItem = [];
    singleItem.push(element.name);
    singleItem.push(element.status);
    singleItem.push(element.createdDate);
    allItems.push(singleItem);
  });

  return allItems;
};

export default function ReferralsTable({ data }) {
  const [displayEnrolled, setDisplayEnrolled] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    setLeads(mapDetails(data.leads));
    setContacts(mapDetails(data.contacts));
  }, []);

  return (
    <Section>
      <Panel>
        <Text h3>Your referrals</Text>
        <div className="toggle-wrapper">
          <button
            className={cn("toggle", { active: displayEnrolled })}
            onClick={() => {
              setDisplayEnrolled(true);
            }}
          >
            <Text bold style={{ color: "#000" }}>
              Enrolled
            </Text>
          </button>
          <button
            className={cn("toggle", { active: !displayEnrolled })}
            onClick={() => {
              setDisplayEnrolled(false);
            }}
          >
            <Text bold style={{ color: "#000" }}>
              In process
            </Text>
          </button>
        </div>
        {displayEnrolled ? (
          contacts.length > 0 ? (
            <Table headers={["Name", "Status", "Date"]} data={contacts} />
          ) : (
            <Text>There are no referrals enrolled yet.</Text>
          )
        ) : leads.length > 0 ? (
          <Table headers={["Name", "Status", "Date"]} data={leads} />
        ) : (
          <Text>There are no leads in progress yet.</Text>
        )}
      </Panel>
      <style jsx>{`
        .toggle-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        .toggle {
          appearance: none;
          background: none;
          border: none;
          border-radius: 0;
          margin: 0;
          padding-left: 0;
          padding-right: 0;
          cursor: pointer;
          border-bottom: 2px solid var(--color-primary);
        }
        .toggle + .toggle {
          margin-left: 20px;
        }
        .toggle:not(.active) {
          opacity: 0.4;
        }
      `}</style>
    </Section>
  );
}
