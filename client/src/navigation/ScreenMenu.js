import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import TabNavigator from "./TabNavigator";
import MainStack from "./MainStack";

const ScreenMenu = () => {
  const [state] = useContext(AuthContext);
  const authenticatedUser = state?.user && state?.token;

  return (
    <NavigationContainer>
      {authenticatedUser ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default ScreenMenu;
