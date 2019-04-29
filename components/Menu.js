import React from "react";
import Router from "next/router";

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    window.firebase
      .auth()
      .signOut()
      .then(() => {
        Router.push({
          pathname: "/"
        });
      })
      .catch(() => {});
  }

  render() {
    return (
      <button onClick={this.signOut}>
        Sign out
        <style jsx>{`
          button {
            appearance: none;
            border: none;
            background: none;
            padding: 0;
            color: #2479ff;
          }
        `}</style>
      </button>
    );
  }
}
