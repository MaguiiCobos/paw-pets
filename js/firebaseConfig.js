// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5irjDwJswlEDyfLuxBTDQrfl-taS-S2U",
  authDomain: "paw-pet-js.firebaseapp.com",
  projectId: "paw-pet-js",
  storageBucket: "paw-pet-js.appspot.com",
  messagingSenderId: "416852328078",
  appId: "1:416852328078:web:bcf65eb925b50e820513df",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
