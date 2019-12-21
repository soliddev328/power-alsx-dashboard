import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
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

  doSignOut = () => this.auth.signOut();
  doGetCurrentUser = callback =>
    this.auth.currentUser
      .getIdToken(true)
      .catch(error => {
        console.log(error);
      })
      .then(idToken => callback(idToken));
  doUpdateUser = callback =>
    this.auth.onAuthStateChanged(user => callback(user));

  // MERGE AUTH AND DB USER API
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });
}

export default Firebase;
