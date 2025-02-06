import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import IconButton from "../SubComp/IconButton";

const { width, height } = Dimensions.get("window");
const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};
const Footer = () => {
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <IconButton
          name="user-o"
          size={24}
          color={COLORS.like}
          handlePress={() => navigation.navigate("Profile")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <IconButton
          name="heart-o"
          size={24}
          color={COLORS.nope}
          handlePress={() => navigation.navigate("HomeScreen")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <IconButton
          name="commenting-o"
          size={24}
          color={COLORS.star}
          handlePress={() => navigation.navigate("Home")}
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
    backgroundColor: "gray",
    width: width,
  },
  iconContainer: {
    padding: 4, // Increases touchable area for better usability
  },
});
export default Footer;
