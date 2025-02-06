import React from "react";
import { Image } from "react-native";

const AppLogo = () => {
  return (
    <Image
      source={require("../../assets/icons/images.jpeg")}
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        // borderWidth: 1,
        marginLeft: 16,
      }}
      resizeMode="contain"
    />
  );
};

export default AppLogo;
