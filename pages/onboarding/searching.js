import { useEffect } from "react";
import { useRouter } from "next/router";
import { FadeLoader } from "react-spinners";
import Header from "../../components/Header";
import SingleStep from "../../components/SingleStep";

function Searching() {
  const router = useRouter();

  useEffect(() => {
    global.analytics.page("Searching");
  });

  const renderLoader = () => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        router.push({
          pathname: "/onboarding/step2"
        });
      }, 2000);
    }

    return (
      <SingleStep>
        <div className="loading">
          <FadeLoader
            className="spinner"
            height={15}
            width={4}
            radius={1}
            color={"#FF69A0"}
            loading
          />
          <p>Searching for clean energy projects in your area...</p>
        </div>
        <style jsx>{`
          .loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .loading p {
            font-size: 1rem;
            text-align: center;
          }

          p.suffix {
            font-size: 0.8rem;
          }
        `}</style>
      </SingleStep>
    );
  };

  return (
    <main>
      <Header />
      {renderLoader()}
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

export default Searching;
