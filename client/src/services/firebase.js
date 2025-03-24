import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBSW7hAbu2_1-H2kAWj39DEDU12LNSEzrk",
  authDomain: "smooth-pivot-453409-f7.firebaseapp.com",
  projectId: "smooth-pivot-453409-f7",
  storageBucket: "smooth-pivot-453409-f7.firebasestorage.app",
  messagingSenderId: "295491417988",
  appId: "1:295491417988:web:b2163a62a138ffa6a34fd1",
  measurementId: "G-DE53ST5ZK3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
