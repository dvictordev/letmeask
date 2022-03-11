import { initializeApp } from "@firebase/app";

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  get,
  push,
  set,
  onValue,
  child,
} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv0jBF_puuCNgvm_aGotzoRkVcdWsBVxg",
  authDomain: "letmeask-8628c.firebaseapp.com",
  databaseURL: "https://letmeask-8628c-default-rtdb.firebaseio.com",
  projectId: "letmeask-8628c",
  storageBucket: "letmeask-8628c.appspot.com",
  messagingSenderId: "1004698332504",
  appId: "1:1004698332504:web:6f5196d4377406f925c92d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const database = getDatabase(app);

export {
  app,
  GoogleAuthProvider,
  signInWithPopup,
  auth,
  database,
  ref,
  get,
  push,
  onValue,
  set,
  child,
};
