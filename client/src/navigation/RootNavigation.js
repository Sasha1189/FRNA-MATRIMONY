import { useColorScheme } from "react-native";
import React, { useMemo } from "react";
import ScreenMenu from "./ScreenMenu";
import { AuthProvider } from "../context/authContext";
import { ThemeProvider } from "../context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootNavigation = () => {
  const colorScheme = useColorScheme();
  // const theme = useMemo(() => {
  //   if (!colorScheme) return DefaultTheme;
  //   return colorScheme === "dark" ? DarkTheme : DefaultTheme;
  // }, [colorScheme]);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <ScreenMenu />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default RootNavigation;
