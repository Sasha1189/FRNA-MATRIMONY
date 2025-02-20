// /src/navigation/HomeStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import DynymicUserProfile from "../screens/Home/DynymicUserProfile";
import FiltersScreen from "../screens/Search/FiltersScreen";
import SearchScreen from "../screens/Search/SearchScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DynymicUserProfile" component={DynymicUserProfile} />
      <Stack.Screen name="FiltersScreen" component={FiltersScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
