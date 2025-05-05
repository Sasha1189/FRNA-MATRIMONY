import React from "react";
import { useAuth } from "../context/authContext";
import AuthStack from "./AuthStack";
import TabNavigator from "./TabNavigator";
import LoadingScreen from "../components/SubComp/LoadingScreen";

const ScreenMenu = () => {
  const { user } = useAuth();
  console.log("ScreenMenu screen user:", user?.uid || null);
  // if(user === undefined) return null; // Prevents the app from crashing when user is undefined

  if (user === undefined) return <LoadingScreen />;

  return user ? <TabNavigator /> : <AuthStack />;
};

export default ScreenMenu;

// {
//     "_redirectEventId": undefined,
//     "apiKey": "AIzaSyBSW7hAbu2_1-H2kAWj39DEDU12LNSEzrk",
//     "appName": "[DEFAULT]",
//     "createdAt": "1746388158395",
//     "displayName": undefined,
//     "email": undefined,
//     "emailVerified": false,
//     "isAnonymous": false,
//     "lastLoginAt": "1746388158395",
//     "phoneNumber": "+919766757691",
//     "photoURL": undefined,
//     "providerData": [[Object]],
//     "stsTokenManager": { "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmOWEwNTBkYzRhZTgyOG"},
//     "tenantId": undefined,
//     "uid": "Kk2aD4VYqGUugIpQl914hQrnrhp1"
// }
