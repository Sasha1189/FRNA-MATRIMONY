// /src/navigation/ProfileStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile/Profile";
import MyProfile from "../screens/Profile/MyProfile";
import AddImages from "../screens/Profile/AddImages";
import Biodata from "../screens/Profile/Biodata";
import Setting from "../screens/Profile/Setting";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Profile"
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="AddImages" component={AddImages} />
      <Stack.Screen name="Biodata" component={Biodata} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
