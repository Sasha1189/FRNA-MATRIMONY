import React from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../SubComp/IconButton";
import { SafeAreaView } from "react-native-safe-area-context";

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
        justifyContent: "space-around",
        // borderWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          // borderWidth: 1,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/icons/images.jpeg")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 20,
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
          // borderWidth: 1,
          alignItems: "center",
        }}
      >
        <IconButton
          name="search"
          size={24}
          color={COLORS.star}
          bgColor={"transparent"}
          style={{ elevation: 0, height: 50, width: 50, marginRight: 15 }}
          handlePress={() => navigation.navigate("")}
        />
        <IconButton
          name="sliders"
          size={24}
          color={COLORS.star}
          bgColor={"transparent"}
          style={{ elevation: 0, height: 50, width: 50 }}
          handlePress={() => navigation.navigate("FiltersScreen")}
        />
      </View>
    </View>
  );
};

export default HeaderIcons;
