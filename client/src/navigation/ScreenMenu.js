import React from "react";
import { useAuth } from "../context/authContext";
import AuthStack from "./AuthStack";
import TabNavigator from "./TabNavigator";
import LoadingScreen from "../components/SubComp/LoadingScreen";

const ScreenMenu = () => {
  const { authState } = useAuth();
  // console.log("ScreenMenu screen authState", authState);

  const authenticatedUser = authState?.user && authState?.token;

  if (authState.loading) return <LoadingScreen />;

  return authenticatedUser ? <TabNavigator /> : <AuthStack />;
};

export default ScreenMenu;

// ScreenMenu screen authState:
// {
//   "gender": {
//     "createdAt": { "_nanoseconds": 857000000, "_seconds": 1746380431 },
//     "displayName": null,
//     "gender": null,
//       "isSubscribed": false,
//       "phoneNumber": "+919766757697",
//       "subscriptionType": "Free",
//         "uid": "kaIBLncIbpZclN7oqD3rHBBFEjK2"
//   },
//   "loading": false,
//     "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmOWEwNT",
//     "user": { "displayName": null, "phoneNumber": "+919766757697", "uid": "kaIBLncIbpZclN7oqD3rHBBFEjK2" }
// }
