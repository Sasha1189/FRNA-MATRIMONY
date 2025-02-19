import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const ScreenMenu = () => {
  const [state] = useContext(AuthContext);
  const authenticatedUser = state?.user && state?.token;

  return (
    <NavigationContainer>
      {authenticatedUser ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default ScreenMenu;
