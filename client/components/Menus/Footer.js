import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const Footer = () => {
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={styles.iconContainer}
      >
        <FontAwesome5
          name="user"
          style={styles.iconStyle}
          color={route.name === "Profile" && "orange"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={styles.iconContainer}
      >
        <FontAwesome5
          name="heart"
          style={styles.iconStyle}
          color={route.name === "HomeScreen" && "orange"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.iconContainer}
      >
        <FontAwesome5
          name="comment-dots"
          style={styles.iconStyle}
          color={route.name === "Home" && "orange"}
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
    padding: 10, // Increases touchable area for better usability
    borderRadius: 25, // Optional for circular touch feedback
  },
  iconStyle: {
    fontSize: 26,
  },
});
export default Footer;
