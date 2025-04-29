import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/authContext";
import AuthStack from "./AuthStack";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const ScreenMenu = () => {
  const { authState } = useAuth();
  const authenticatedUser = authState?.user && authState?.token;

  return authenticatedUser ? <TabNavigator /> : <AuthStack />;
};

export default ScreenMenu;
