import { useEffect, useState } from "react";
import Section from "../Section";
import Panel from "../Panel";
import Table from "../Table";
import Text from "../Text";

const mapDetails = data => {
  const allItems = [];
  data.contacts.forEach(element => {
    const singleItem = [];
    singleItem.push(element.name);
    singleItem.push(element.status);
    allItems.push(singleItem);
  });

  data.leads.forEach(element => {
    const singleItem = [];
    singleItem.push(element.name);
    singleItem.push(element.status);
    allItems.push(singleItem);
  });

  return allItems;
};

export default function ReferralsTable({ data }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setContacts(mapDetails(data));
  }, []);

  return (
    <Section tableSection>
      <Panel>
        <Text h3>Your referrals</Text>
        {contacts.length > 0 ? (
          <Table headers={["Name", "Status"]} data={contacts} />
        ) : (
          <Text>
            You have not made any referrals yet. Go ahead, give it a try! :)
          </Text>
        )}
      </Panel>
    </Section>
  );
}
