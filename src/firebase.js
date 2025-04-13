// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDDNbFWEyZf0z6JXxgQQcbLuFtXG18ZDps",
//   authDomain: "facemate-prototype.firebaseapp.com",
//   projectId: "facemate-prototype",
//   storageBucket: "facemate-prototype.firebasestorage.app",
//   messagingSenderId: "229175041810",
//   appId: "1:229175041810:web:7cbfc2901f782fb397ddcb",
//   measurementId: "G-E3KLN0PLQQ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDNbFWEyZf0z6JXxgQQcbLuFtXG18ZDps",
  authDomain: "facemate-prototype.firebaseapp.com",
  projectId: "facemate-prototype",
  storageBucket: "facemate-prototype.appspot.com",
  messagingSenderId: "229175041810",
  appId: "1:229175041810:web:7cbfc2901f782fb397ddcb",
  measurementId: "G-E3KLN0PLQQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };