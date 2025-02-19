import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import IconButton from "../SubComp/IconButton";

const { width, height } = Dimensions.get("window");
const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <IconButton
          name="user-o"
          size={24}
          color={COLORS.like}
          bgColor={route.name === "Profile" ? "#1E1E2DE6" : "#1E1E2D1A"}
          elev={route.name === "Profile" ? 5 : null}
          handlePress={
            route.name === "Profile"
              ? null
              : () => navigation.navigate("Profile")
          }
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <IconButton
          name="heart-o"
          size={24}
          color={COLORS.nope}
          bgColor={route.name === "HomeScreen" ? "#1E1E2DE6" : "#1E1E2D1A"}
          elev={route.name === "HomeScreen" ? 5 : null}
          handlePress={
            route.name === "HomeScreen"
              ? null
              : () => navigation.navigate("HomeScreen")
          }
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <IconButton
          name="commenting-o"
          size={24}
          color={COLORS.star}
          bgColor={route.name === "Chat" ? "#1E1E2DE6" : "#1E1E2D1A"}
          elev={route.name === "Chat" ? 5 : null}
          handlePress={
            route.name === "Chat" ? null : () => navigation.navigate("Chat")
          }
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around", // Equal spacing between icons
    alignItems: "center", // Align icons vertically
    width: width,
  },
  iconContainer: {
    padding: 4, // Increases touchable area for better usability
  },
});
export default Footer;
