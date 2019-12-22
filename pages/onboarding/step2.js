import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../components/Header";
import BulletItem from "../../components/BulletItem";
import Progressbar from "../../components/Progressbar";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";
import CONSTANTS from "../../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function Step2() {
  const router = useRouter();
  const [utility, setUtility] = useState({
    project: {
      imageUrl: "/static/images/illustrations/t&c.png",
      name: "",
      completion: ""
    },
    billingMethod: ""
  });

  const getData = () => {
    let utility = "";
    let state = "";
    let storedBillingMethod = "";

    if (localStorage.getItem("utility")) {
      utility = JSON.parse(localStorage.getItem("utility"));
    }

    if (localStorage.getItem("state")) {
      state = localStorage.getItem("state");
    }

    if (localStorage.getItem("billingMethod")) {
      storedBillingMethod = JSON.parse(localStorage.getItem("billingMethod"));
    }

    const rawParams = {
      state: state,
      utility: encodeURIComponent(utility.label)
    };

    const generatedParams = Object.entries(rawParams)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    return axios(`${API}/v1/utilities?${generatedParams}`)
      .then(response => {
        if (response.data.data) {
          const data = response.data.data[0];
          setUtility({
            project: {
              imageUrl:
                data?.projects?.length > 0 && data.projects[0].imageUrl !== null
                  ? data.projects[0].imageUrl
                  : "/static/images/illustrations/t&c.png",
              name: data?.projects[0].displayName || false,
              completion: data?.projects[0].completion || false
            },
            billingMethod: storedBillingMethod
          });
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    global.analytics.page("Step 2");
    getData();
  }, []);

  return (
    <main>
      <Header />
      <SingleStep
        prefix="Great news, we've got a clean energy project in your area! By signing up you will start receiving energy credits that lower your electricity cost."
        title={utility?.project?.name || ""}
      >
        <div className="content">
          <figure>
            <img src={utility?.project?.imageUrl} alt="" />
          </figure>
          {utility?.project?.completion && (
            <Progressbar completion={utility?.project?.completion} />
          )}
          <p>
            Just answer a few quick questions about your utility account and
            address to:
          </p>
          <div className="items">
            <BulletItem
              content="Save $10-20 per month on your electricity bill"
              bulletIcon="dollar"
            />
            <BulletItem
              content="Lower emissions and pollution in your community"
              bulletIcon="co2"
            />
          </div>
        </div>
        <Button
          primary
          onClick={() => {
            if (utility?.billingMethod.includes("paper")) {
              router.push({
                pathname: "/onboarding/step4"
              });
            } else {
              router.push({
                pathname: "/onboarding/step3"
              });
            }
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
        .content {
          margin: 0 auto;
        }
        .disclaimer {
          text-align: center;
          font-size: 0.8rem;
          margin-top: 0;
        }

        :global(.checkbox__label) {
          margin-top: 0;
        }

        .content {
          margin-bottom: 2rem;
          min-height: 370px;
        }

        .disclaimer {
          text-align: center;
        }

        figure {
          max-width: 100vw;
          height: 190px;
          margin: 1.5rem -7% 0 -7%;
          background-color: transparent;
          overflow: hidden;
          display: flex;
        }

        img {
          max-width: 100%;
          object-fit: cover;
          object-position: top;
          opacity: 0;
          animation: fadeIn 400ms ease-in-out forwards;
          animation-delay: 0.4s;
        }

        .items {
          margin-top: 20px;
          opacity: 0;
          animation: fadeIn 400ms ease-in-out forwards;
          animation-delay: 0.6s;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}

export default Step2;
