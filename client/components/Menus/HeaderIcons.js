import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const HeaderIcons = () => {
  const onSearchPress = () => {
    // Navigate to search screen or open search modal
  };
  const onFilterPress = () => {
    // Navigate to filter screen or open filter modal
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        // marginRight: 1,
        // borderWidth: 1,
      }}
    >
      <TouchableOpacity onPress={onSearchPress} style={{}}>
        <Image
          source={require("../../assets/icons/chatt1.png")}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
        {/* <Icon name="search" size={24} color="#fff" /> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={onFilterPress} style={{ marginLeft: 20 }}>
        <Image
          source={require("../../assets/icons/filter1.png")}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
        {/* <Icon name="filter-list" size={24} color="#fff" /> */}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderIcons;
