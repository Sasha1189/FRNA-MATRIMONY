import React from "react";
import { Image } from "react-native";

const AppLogo = () => {
  return (
    <Image
      source={require("../../assets/icons/images.jpeg")}
      style={{
        width: 55,
        height: 55,
        borderRadius: 30,
        marginLeft: 15,
      }}
      resizeMode="contain"
    />
  );
};

export default AppLogo;
