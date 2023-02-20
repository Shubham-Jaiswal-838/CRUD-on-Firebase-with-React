import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "crud-58c87.firebaseapp.com",
  projectId: "crud-58c87",
  storageBucket: "crud-58c87.appspot.com",
  messagingSenderId: "537905390680",
  appId: "1:537905390680:web:4db389948fddb2a088d62d"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)