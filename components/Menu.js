import Link from "next/link"
import Router from "next/router"
import MenuItem from "./MenuItem"

const signOut = () => {
  window.firebase
    .auth()
    .signOut()
    .then(() => {
      Router.push({
        pathname: "/"
      })
    })
    .catch(() => { })
}

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

      {/* <li>
          <button onClick={this.signOut}>Sign out</button>
        </li> */}

      <style jsx>{`
          button {
            appearance: none;
            border: none;
            background: none;
            padding: 0;
            color: #2479ff;
          }
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
        `}</style>
    </ul>
  )
}
