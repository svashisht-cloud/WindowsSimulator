// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvc7ucbydkMgAo-u-B0GQgBj4QwRHUUpM",
  authDomain: "portfoliosv2.firebaseapp.com",
  projectId: "portfoliosv2",
  storageBucket: "portfoliosv2.appspot.com",
  messagingSenderId: "226031295563",
  appId: "1:226031295563:web:e59f79961ed74e16b481ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
