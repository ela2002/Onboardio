import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAggQc6GjpDANebx6Miu8G9soICSTZ0Loc",
  authDomain: "onbordio-52625.firebaseapp.com",
  projectId: "onbordio-52625",
  storageBucket: "onbordio-52625.appspot.com",
  messagingSenderId: "8153339844",
  appId: "1:8153339844:web:484e27d004f33e8e74b691",
  measurementId: "G-JVRTSNWN1E",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
