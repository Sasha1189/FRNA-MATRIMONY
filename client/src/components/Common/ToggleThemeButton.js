// /src/components/ToggleThemeButton.js
import React, { useContext } from "react";
import { Button } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { LightTheme, DarkTheme } from "../themes";

const ToggleThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme.dark ? LightTheme : DarkTheme);
  };

  return <Button title="Toggle Theme" onPress={toggleTheme} />;
};

export default ToggleThemeButton;
