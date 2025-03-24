import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {AuthProvider} from "./src/context/authContext";
import {ThemeProvider} from "./src/context/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import ScreenMenu from "./src/navigation/ScreenMenu";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <NavigationContainer>
            <ScreenMenu />
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}