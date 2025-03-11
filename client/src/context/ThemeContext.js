import React, { createContext, useState } from "react";
import { DefaultTheme, LightTheme, DarkTheme } from "../themes";

export const ThemeContext = createContext({
  theme: DefaultTheme,
  setTheme: (theme) => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DefaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
