import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/authContext";
import AuthStack from "./AuthStack";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const ScreenMenu = () => {
  const [state] = useContext(AuthContext);
  const authenticatedUser = state?.user && state?.token;

  return authenticatedUser ? <TabNavigator /> : <AuthStack />;
};

export default ScreenMenu;
