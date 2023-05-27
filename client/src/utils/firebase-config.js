import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDPFwIKkNzyagy1tHwRtb83Yos9KzcOTn8",
  authDomain: "react-netflix-77158.firebaseapp.com",
  projectId: "react-netflix-77158",
  storageBucket: "react-netflix-77158.appspot.com",
  messagingSenderId: "9106462561",
  appId: "1:9106462561:web:361ae9cb32bbc434029720",
  measurementId: "G-VBYQP0F6PD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth =  getAuth(app)