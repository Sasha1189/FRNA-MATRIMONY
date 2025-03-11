// themes.js

export const Font = {
  GilroyLight: "Gilroy-Light",
  GilroyMedium: "Gilroy-Medium",
  GilroyBold: "Gilroy-Bold",
  GilroySemiBold: "Gilroy-SemiBold",
  GilroyExtraBold: "Gilroy-ExtraBold",
  GilroyRegular: "Gilroy-Regular",
};

export const DefaultConfigs = {
  typography: {
    fontFamily: {
      light: Font.GilroyLight,
      medium: Font.GilroyMedium,
      regular: Font.GilroyRegular,
      semiBold: Font.GilroySemiBold,
      bold: Font.GilroyBold,
      extraBold: Font.GilroyExtraBold,
    },
    sizes: {
      h1: { size: 38, lineHeight: 44 },
      h2: { size: 32, lineHeight: 36 },
      h3: { size: 24, lineHeight: 30 },
      large: { size: 18, lineHeight: 26 },
      regular: { size: 16, lineHeight: 18 },
      small: { size: 14, lineHeight: 20 },
    },
  },
};

// "DarkTheme" in plain JS
export const DarkTheme = {
  ...DefaultConfigs,
  dark: true,
  colors: {
    primary: "#D45B90",
    text: "#ffffff",
    background: "#07112D",
    secondaryBackground: "#111D40",
    border: "#111D40",
  },
};

// "LightTheme" in plain JS
export const LightTheme = {
  ...DefaultConfigs,
  dark: false,
  colors: {
    primary: "#EE61A1",
    text: "#070F26",
    background: "#ffffff",
    secondaryBackground: "#F8F8F8",
    border: "#f2f2f2",
  },
};

// Default export if you want a "default" theme
export const DefaultTheme = LightTheme;
