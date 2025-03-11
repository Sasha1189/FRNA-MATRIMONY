import { useColorScheme } from "react-native";
import React, { useMemo } from "react";
import ScreenMenu from "./src/navigation/ScreenMenu";
import { AuthProvider } from "./src/context/authContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootNavigation = () => {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => {
    if (!colorScheme) return DefaultTheme;
    return colorScheme === "dark" ? DarkTheme : LightTheme;
  }, [colorScheme]);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ScreenMenu />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default RootNavigation;
