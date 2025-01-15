import { View, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";

const HeaderMenu = () => {
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  // logout
  // const handleLogout = async () => {
  //   console.log("Logout started");
  //   setState({ token: "", user: null });
  //   await AsyncStorage.removeItem("@auth");
  //   alert("logout successfully");
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <FontAwesome5
          name="user"
          style={styles.iconStyle}
          color={route.name === "Account" && "orange"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <FontAwesome5
          name="heart"
          style={styles.iconStyle}
          color={route.name === "HomeScreen" && "orange"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5
          name="home"
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
    margin: 10,
    justifyContent: "space-between",
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
  },
});
export default HeaderMenu;
