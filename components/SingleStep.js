import { useEffect, useState } from "react";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { useRouter } from "next/router";
import cn from "classnames";
import Highlight from "./Highlight";
import routeUser from "../lib/route-user";
import { withFirebase } from "../firebase";
import CONSTANTS from "../globals";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function SingleStep(props) {
  const {
    highlight,
    prefix,
    title,
    suffix,
    toast,
    children,
    image,
    wide
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { pathname, query } = router;

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
    props.firebase.doGetCurrentUser(firebaseUser => {
      if (!!firebaseUser) {
        firebaseUser.getIdToken(true).then(idToken => {
          axios
            .get(`${API}/v1/subscribers/${firebaseUser.uid}`, {
              headers: {
                Authorization: idToken
              }
            })
            .then(response => {
              const user = response?.data?.data;
              user.isAnonymous = firebaseUser.isAnonymous;
              routeUser(user);
              if (isOnboarding) {
                setIsLoading(false);
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
  }, []);

  return (
    <div className={cn("content", { wide })}>
      {isLoading ? (
        renderLoader()
      ) : (
        <>
          <div className="heading">
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
          max-width: 100%;
          margin: 0 auto;
        }
        .content.wide {
          margin-left: -20%;
          margin-right: -20%;
          max-width: initial;
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
        }
        figure {
          margin: 0;
          text-align: center;
        }
        img {
          max-width: 65%;
        }
        @media (max-width: 1000px) {
          .content.wide {
            max-width: 90%;
            margin: 0 auto;
          }
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
