import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Auth/Register";
import Login from "../screens/Auth/Login";
import OTPVerify from "../screens/Auth/OTPVerify";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="OTPVerify" component={OTPVerify} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
