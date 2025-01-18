import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import Post from "../../screens/Post";
import Myposts from "../../screens/Myposts";
import Account from "../../screens/Account";
import HomeScreen from "../../screens/HomeScreen";
import Profile from "../../screens/Profile";
import Biodata from "../../screens/subScreens/Biodata";
import Setting from "../../screens/subScreens/Setting";
import AddImages from "../../screens/subScreens/AddImages";

const ScreenMenu = () => {
  // Access the global state
  const [state] = useContext(AuthContext);
  // auth condition
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="Myposts"
            component={Myposts}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="AddImages"
            component={AddImages}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Biodata"
            component={Biodata}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{
              headerShown: true,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
