import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import Highlight from "./Highlight";
import { withFirebase } from "../firebase";
import CONSTANTS from "../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function SingleStep(props) {
  const router = useRouter();
  const { pathname, query } = router;
  const {
    highlight,
    prefix,
    title,
    suffix,
    toast,
    children,
    image,
    isFirst
  } = props;
  const [isLoading, setIsLoading] = useState(true);

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

  const renderRestart = () => {
    return (
      <div className="wrapper">
        <button
          onClick={() => {
            props.firebase.doSignOut();
            router.push("/onboarding/step1");
          }}
        >
          ⟲
        </button>
        <span className="tooltip">Start Over</span>
        <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(100%, -215%);
          }

          .tooltip {
            display: none;
            font-size: 10px;
            color: #fff;
            background-color: #4a4a4a;
            padding: 3px 6px;
            border-radius: 2px;
            position: relative;
            transform: translate(-80%, -90%);
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
            background: none;
            border: none;
            cursor: pointer;
            font-size: 32px;
            color: #4a4a4a;
          }
        `}</style>
      </div>
    );
  };

  const renderTitle = () => {
    return highlight ? (
      <Highlight className="title" content={title} highlight={highlight} />
    ) : (
      <p className="title">{title}</p>
    );
  };

  const renderPrefix = () => {
    return highlight ? (
      <Highlight className="prefix" content={prefix} highlight={highlight} />
    ) : (
      <p className="prefix">{prefix}</p>
    );
  };

  const renderSuffix = () => {
    return <p className="suffix">{suffix}</p>;
  };

  useEffect(() => {
    const isOnboarding = pathname.includes("/onboarding");
    if (isOnboarding) {
      setIsLoading(true);
      props.firebase.doGetCurrentUser(user => {
        if (!!user) {
          user.getIdToken(true).then(idToken => {
            axios
              .get(`${API}/v1/subscribers/${user.uid}`, {
                headers: {
                  Authorization: idToken
                }
              })
              .then(response => {
                setIsLoading(false);

                const user = response?.data?.data;
                localStorage.setItem(
                  "username",
                  JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName
                  })
                );
                localStorage.setItem("leadId", user?.leadId);
                localStorage.setItem("email", user?.email);

                // retrieve utility information
                const utility = user?.milestones?.utility;
                const imageName = utility?.replace(/\s/g, "") || false;
                const utilityInfo = {
                  image: {
                    src: imageName
                      ? `/static/images/utilities/${imageName}.png`
                      : "/static/images/utilities/placeholder.png",
                    altText: "Utility logo"
                  },
                  label: utility
                };

                localStorage.setItem("utility", JSON.stringify(utilityInfo));

                // retrieve postalcode
                if (user?.milestones?.address?.postalCode) {
                  const postalCode = user?.milestones?.address?.postalCode;
                  localStorage.setItem(
                    "postalCode",
                    JSON.stringify(postalCode)
                  );
                }

                if (user?.milestones?.utilityPaperOnly) {
                  localStorage.setItem(
                    "billingMethod",
                    JSON.stringify({ billingMethod: "paper" })
                  );
                }

                const userStillNeedsToAddUtilityInfo = !user?.milestones
                  ?.utilityInfoCompleted;

                const userStillNeedstoAddBankInfo =
                  (user?.milestones?.utilityInfoCompleted &&
                    user?.milestones?.utilityLoginSuccessful) ||
                  !user?.milestones?.bankInfoCompleted;

                const userStillNeedsToAddAddressInfo =
                  user?.milestones?.utilityInfoCompleted &&
                  !user?.milestones?.addressInfoCompleted;

                // forward to the right page
                if (user?.signupCompleted) {
                  router.push({
                    pathname: "/dashboard"
                  });
                } else if (userStillNeedsToAddUtilityInfo && !query.next) {
                  router.push({
                    pathname: "/onboarding/step2",
                    query: {
                      onboardingNotFinished: true
                    }
                  });
                } else if (userStillNeedsToAddAddressInfo && !query.next) {
                  router.push({
                    pathname: "/onboarding/step4.2",
                    query: {
                      onboardingNotFinished: true
                    }
                  });
                } else if (userStillNeedstoAddBankInfo && !query.next) {
                  router.push({
                    pathname: "/onboarding/step7",
                    query: {
                      onboardingNotFinished: true
                    }
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          });
        } else {
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="content">
      {isLoading ? (
        renderLoader()
      ) : (
        <>
          <div className="heading">
            {!isFirst && renderRestart()}
            {toast && <p className="title">{toast}</p>}
            {prefix && renderPrefix()}
            {title && renderTitle()}
            {suffix && renderSuffix()}
          </div>
          {image && (
            <figure>
              <img src={image.src} alt={image.alt} />
            </figure>
          )}
          {children}
        </>
      )}
      <style jsx>{`
        .content {
          max-width: 87%;
          margin: 0 auto;
        }
        p {
          font-size: 1rem;
          text-align: center;
          font-weight: 700;
          line-height: 1.44;
        }
        p.title {
          color: #000;
          margin-bottom: 0;
          margin-top: 5px;
        }
        p.title + p.title {
          margin-top: 0;
        }
        .heading {
          margin-bottom: 1.5em;
          position: relative;
        }
        figure {
          margin: 0;
          text-align: center;
        }
        img {
          max-width: 65%;
        }
      `}</style>
      <style jsx global>{`
        p.prefix,
        p.title,
        p.suffix,
        span.title,
        span.prefix,
        span.suffix {
          display: block;
          text-align: center;
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          font-size: 1rem;
          font-weight: 400;
        }

        p.prefix {
          margin-bottom: 0;
        }

        p.prefix + p.title {
          margin-top: 0.5em;
          font-size: 1.4rem;
        }

        p.suffix,
        span.suffix {
          font-size: 1em;
          margin-top: -0.5em;
        }

        span.title mark {
          color: #41ef8b !important;
        }
      `}</style>
    </div>
  );
}

export default withFirebase(SingleStep);
