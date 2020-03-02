import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";
import CONSTANTS from "../../globals";

const { FIREBASE } = CONSTANTS.dev;

const fbConfig = {
  apiKey: FIREBASE.APIKEY,
  authDomain: `${FIREBASE.PROJECTID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE.DATABASE}.firebaseio.com`,
  projectId: FIREBASE.PROJECTID,
  storageBucket: `${FIREBASE.BUCKET}.appspot.com`,
  messagingSenderId: FIREBASE.SENDERID
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
