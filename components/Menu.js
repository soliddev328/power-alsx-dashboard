import Link from "next/link";
import Router from "next/router";
import MenuItem from "./MenuItem";

const signOut = () => {
  window.firebase
    .auth()
    .signOut()
    .then(() => {
      Router.push({
        pathname: "/"
      });
    })
    .catch(() => {});
};

export default function MainMenu() {
  return (
    <ul>
      <li>
        <MenuItem to="/dashboard">My energy</MenuItem>
      </li>
      <li>
        <MenuItem>My Source</MenuItem>
      </li>
      <li>
        <MenuItem>My Impact</MenuItem>
      </li>
      <li>
        <MenuItem>Referrals</MenuItem>
      </li>
      <li>
        <MenuItem>Profile</MenuItem>
      </li>

      <li className="sign-out">
        <button onClick={signOut}>Sign out</button>
      </li>

      <style jsx>{`
        button {
          appearance: none;
          border: none;
          background: none;
          padding: 0;
          color: #2479ff;
          cursor: pointer;
        }
        ul {
          position: relative;
          list-style: none;
          padding: 0;
          margin: 0;
          height: calc(100vh - 128px);
        }
        .sign-out {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: 0;
        }
      `}</style>
    </ul>
  );
}
