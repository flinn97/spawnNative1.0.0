import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  databaseURL: "https://flinnapps-default-rtdb.firebaseio.com",
  apiKey: "AIzaSyAsCSTpKPzQsVx49J7lGS4DlJTtyDwhkfU",
  authDomain: "spawn-810bf.firebaseapp.com",
  projectId: "spawn-810bf",
  storageBucket: "spawn-810bf.appspot.com",
  messagingSenderId: "477573251377",
  appId: "1:477573251377:web:1d7dba5ace6367d0caf010",
  measurementId: "G-1YX5VJ83C4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore(app);
const auth = getAuth(app);
export {db, storage, auth};