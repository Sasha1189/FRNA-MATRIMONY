import React from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../SubComp/IconButton";

const HeaderIcons = () => {
  const navigation = useNavigation();
  const COLORS = {
    like: "#00eda6",
    nope: "#ff006f",
    star: "#07A6FF",
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        <Image
          source={require("../../assets/icons/images.jpeg")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
            borderWidth: 0.5,
            borderColor: "#ff006f",
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 24,
            alignItems: "center",
            fontWeight: "bold",
            fontStyle: "",
            color: "#ff006f",
            letterSpacing: 2,
          }}
        >
          LONARI
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: 10,
        }}
      >
        <IconButton
          name="search"
          size={20}
          color={COLORS.star}
          bgColor={"transparent"}
          style={{ elevation: 0, height: 45, width: 45, marginRight: 5 }}
          handlePress={() => navigation.navigate("SearchScreen")}
        />
        <IconButton
          name="sliders"
          size={20}
          color={COLORS.star}
          bgColor={"transparent"}
          style={{ elevation: 0, height: 45, width: 45 }}
          handlePress={() => navigation.navigate("FiltersScreen")}
        />
      </View>
    </View>
  );
};

export default HeaderIcons;
