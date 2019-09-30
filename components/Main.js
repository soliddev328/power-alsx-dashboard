import React from "react";
import cn from "classnames";
import { FadeLoader } from "react-spinners";
import { StateProvider } from "../state";
import LogoIcon from "./Icons/LogoIcon";
import Menu from "../components/Menu";
import Menubar from "./Menubar";

export default function Main({ isLoading = true, children }) {
  const initialState = {
    selectedAccount: {
      value: 0
    }
  };

  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case "changeSelectedAccount":
        return {
          ...state,
          selectedAccount: action.newValue
        };

      default:
        return state;
    }
  };

  const renderLoader = () => {
    return (
      <div className="wrapper">
        <FadeLoader
          className="spinner"
          height={15}
          width={4}
          radius={1}
          color={"#FF69A0"}
          loading
        />
        <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <main>
        <Menubar />
        <div className={cn("content", { loading: isLoading })}>
          {isLoading ? renderLoader() : children}
        </div>
      </main>
      <style jsx>{`
        main {
          display: grid;
          grid-template-columns: 250px 1fr;
        }
        .content {
          padding: 40px 70px;
          max-width: 1200px;
          margin: 0;
          overflow-x: hidden;
          user-select: text;
        }

        .content:not(.loading) {
          transform: translateX(10px);
          opacity: 0;
          animation: fadeInFromRight 400ms ease-in-out forwards;
          animation-delay: 200ms;
        }

        @keyframes fadeInFromRight {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 1050px) {
          main {
            grid-template-columns: 1fr;
            overflow-x: hidden;
          }
          .content {
            padding: 0 20px;
            padding-top: 40px;
          }
        }
      `}</style>
    </StateProvider>
  );
}
