import React from "react";
import { useAuth } from "../context/authContext";
import AuthStack from "./AuthStack";
import TabNavigator from "./TabNavigator";
import LoadingScreen from "../components/SubComp/LoadingScreen";

const ScreenMenu = () => {
  const { authState } = useAuth();
  console.log("ScreenMenu screen authState", authState);

  const authenticatedUser = authState?.user && authState?.token;

  if (authState.loading) return <LoadingScreen />;

  return authenticatedUser ? <TabNavigator /> : <AuthStack />;
};

export default ScreenMenu;
