import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LogoIcon from "./Icons/LogoIcon";
import ProfilePic from "./ProfilePic";
import { withFirebase } from "../firebase";

function Header(props) {
  const router = useRouter();
  const [queryData, setQueryData] = useState(false);

  useEffect(() => {
    const { query, pathname } = router;
    const queryIsEmpty =
      Object.entries(query).length === 0 && query.constructor === Object;

    if (pathname.includes("/step1") && !queryIsEmpty) {
      console.log("is first", query);
      localStorage.setItem("query", JSON.stringify(query));
    }
  }, [router]);

  useEffect(() => {
    if (localStorage.getItem("query")) {
      setQueryData(JSON.parse(localStorage.getItem("query")));
    }
  }, []);

  const renderRestart = () => {
    return (
      <div className="wrapper">
        <button
          onClick={() => {
            props.firebase.doSignOut();
            router.push({
              pathname: "/onboarding/step1",
              query: queryData
            });
          }}
        >
          ⟲
        </button>
        {console.log(queryData)}
        <span className="tooltip">Start Over</span>
        <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            position: fixed;
            right: 20px;
            top: 20px;
          }

          .tooltip {
            display: none;
            font-size: 10px;
            width: 65px;
            text-align: center;
            color: #fff;
            background-color: #4a4a4a;
            padding: 3px 6px;
            border-radius: 2px;
            position: absolute;
            right: -50%;
            top: 0;
            transform: translateY(-55%);
          }

          .tooltip:after {
            top: 100%;
            left: 50%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            border-color: rgba(74, 74, 74, 0);
            border-top-color: #4a4a4a;
            border-width: 3px;
            margin-left: -3px;
          }

          .wrapper:hover .tooltip {
            display: block;
          }

          button {
            display: block;
            background: none;
            border: none;
            cursor: pointer;
            color: #2479ff;
            padding: 0;
            font-size: 32px;
          }
        `}</style>
      </div>
    );
  };

  return (
    <header>
      {!props.first && !props.firstStep && renderRestart()}
      {props.first ? <LogoIcon medium /> : <LogoIcon small />}
      {!props.first && (
        <div className="bubble">
          <ProfilePic
            image={{
              src: "/static/images/people/martin.jpg",
              altText: "A smiling girl"
            }}
          />
        </div>
      )}
      <style jsx>{`
        header {
          position: relative;
          width: 100%;
          border-bottom: 1px solid #41ef8b;
          padding: 0 1.25rem;
          margin-bottom: 2.2rem;
        }

        .bubble {
          position: absolute;
          right: 0;
          bottom: 0;
          transform: translateY(50%);
          pointer-events: none;
        }
      `}</style>
    </header>
  );
}

export default withFirebase(Header);
