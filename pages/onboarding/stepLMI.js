import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../components/Header";
import Text from "../../components/Text";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function StepLMI() {
  const router = useRouter();

  useEffect(() => {
    global.analytics.page("Step LMI");
  }, []);

  return (
    <main>
      <Header />
      <SingleStep title="Great! Let's see if you qualify for a 25% discount under MD's low and moderate income program (if you don't tou still save 10%)">
        <Button
          primary
          onClick={() => {
            console.log("state is MD and LMI is true");
          }}
        >
          Next
        </Button>
      </SingleStep>
      <style jsx>{`
        main {
          display: block;
          height: 88vh;
          max-width: 700px;
          margin: 0 auto;
        }
      `}</style>
    </main>
  );
}

export default StepLMI;
