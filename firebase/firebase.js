import app from "firebase/app";
import "firebase/auth";
import CONSTANTS from "../globals";

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

  doSignInAnonymously = callback =>
    this.auth
      .signInAnonymously()
      .then(authUser => {
        callback(authUser);
      })
      .catch(error => console.log(error));

  doSignOut = () => this.auth.signOut();

  doGetCurrentUser = callback =>
    this.auth.currentUser
      .getIdToken(true)
      .then(idToken => callback(idToken))
      .catch(error => console.log(error));

  doUpdateUser = callback =>
    this.auth.onAuthStateChanged(user => {
      user
        .getIdToken(true)
        .then(idToken => callback(idToken))
        .catch(error => console.log(error));
    });

  doSendSignInEmail = (email, config) =>
    this.auth.sendSignInLinkToEmail(email, config);

  doSendPasswordResetEmail = email => this.auth.sendPasswordResetEmail(email);

  doConfirmPasswordReset = (code, newPassword) =>
    this.auth.confirmPasswordReset(code, newPassword);
}

export default Firebase;
