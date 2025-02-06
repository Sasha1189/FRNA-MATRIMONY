import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../SubComp/IconButton";

const HeaderIcons = () => {
  const navigation = useNavigation();
  const onSearchPress = () => {
    // Navigate to search screen or open search modal
  };
  const onFilterPress = () => {
    // Navigate to filter screen or open filter modal
  };
  const COLORS = {
    like: "#00eda6",
    nope: "#ff006f",
    star: "#07A6FF",
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 5,
      }}
    >
      <View>
        <IconButton
          name="search"
          size={24}
          color={COLORS.star}
          bgColor={"transparent"}
          style={{ elevation: 0, height: 50, width: 50 }}
          handlePress={() => navigation.navigate("")}
        />
      </View>
      <View>
        <IconButton
          name="sliders"
          size={24}
          color={COLORS.star}
          bgColor={"transparent"}
          style={{ elevation: 0, height: 50, width: 50, marginLeft: 20 }}
          handlePress={() => navigation.navigate("")}
        />
      </View>
    </View>
  );
};

export default HeaderIcons;
