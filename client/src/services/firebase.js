import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);
export { auth, db, storage };
export default app;
