import app from "firebase/app";
import "firebase/auth";
import CONSTANTS from "../globals";
import Router from "next/router";

const { FIREBASE } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

const config = {
  apiKey: FIREBASE.APIKEY,
  authDomain: `${FIREBASE.PROJECTID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE.DATABASE}.firebaseio.com`,
  projectId: FIREBASE.PROJECTID,
  storageBucket: `${FIREBASE.BUCKET}.appspot.com`,
  messagingSenderId: FIREBASE.SENDERID
};

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    } else {
      app.app();
    }
    this.auth = app.auth();
  }

  // AUTH API
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doEmailAuthProvider = (email, password, callback) => {
    const credential = app.auth.EmailAuthProvider.credential(email, password);
    this.auth.currentUser.linkWithCredential(credential).then(
      usercred => {
        const { user } = usercred;
        callback(user);
      },
      error => {
        console.log("Account linking error", error);
      }
    );
  };

  doSignInAnonymously = callback =>
    this.auth.signInAnonymously().then(
      authUser => {
        callback(authUser);
      },
      error => console.log(error)
    );

  doSignOut = () => {
    localStorage.clear();
    this.auth.signOut();
  };

  doGetCurrentUser = callback => {
    this.auth.onAuthStateChanged(user => {
      callback(user);
    });
  };

  doGetCurrentUserIdToken = callback =>
    this.auth.currentUser.getIdToken(true).then(
      idToken => callback(idToken),
      error => console.log(error)
    );

  doUpdateUser = callback =>
    this.auth.onAuthStateChanged(
      user => {
        const { pathname } = Router;
        if (user) {
          user.getIdToken(true).then(
            idToken => callback(user, idToken),
            error => console.log(error)
          );
        } else {
          if (pathname.includes("/dashboard")) {
            Router.push({
              pathname: "/"
            });
          }
        }
      },
      error => {
        console.log(error);
      }
    );

  doSendPasswordResetEmail = email => {
    const actionCodeSettings = {
      url: "https://my.commonenergy.us/"
    };
    this.auth.sendPasswordResetEmail(email, actionCodeSettings);
  };

  doConfirmPasswordReset = (code, newPassword) =>
    this.auth.confirmPasswordReset(code, newPassword);

  doSendSignInEmail = (email, config) =>
    this.auth.sendSignInLinkToEmail(email, config);

  doCheckIsSignInWithEmailLink = url => this.auth.isSignInWithEmailLink(url);

  doSignInWithEmailLink = (email, completeUrl) =>
    this.auth.signInWithEmailLink(email, completeUrl);
}

let firebase;

function getFirebase(app, auth) {
  if (!firebase) {
    firebase = new Firebase(app, auth);
  }

  return firebase;
}

export default getFirebase;
