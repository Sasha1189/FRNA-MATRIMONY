import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import DynymicUserProfile from "../screens/Home/DynymicUserProfile";
import FiltersScreen from "../screens/Search/FiltersScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import ChatListScreen from "../screens/Chat/Chat";
import ChatRoomScreen from "../screens/Chat/ChatRoomScreen";
import Profile from "../screens/Profile/Profile";
import MyProfile from "../screens/Profile/MyProfile";
import AddImages from "../screens/Profile/AddImages";
import Biodata from "../screens/Profile/Biodata";
import Setting from "../screens/Profile/Setting";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DynymicUserProfile" component={DynymicUserProfile} />
      <Stack.Screen name="FiltersScreen" component={FiltersScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="Chat" component={ChatListScreen} />
      <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="AddImages" component={AddImages} />
      <Stack.Screen name="Biodata" component={Biodata} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

export default MainStack;
