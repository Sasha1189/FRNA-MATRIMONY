import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

const UserBanner = ({ item }) => {
  const onPressProfile = () => {
    console.log("Pressed me");
  };
  return (
    <TouchableOpacity style={styles.profileItem} onPress={onPressProfile}>
      <Image
        source={
          require("../../assets/images/profile.png")
          //   { uri: item.image?.imageUrls?.[0] }
        } // CHANGE: Adjust based on your data
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>
          {item?.fullname || "Not Provided"}
        </Text>
        <Text style={styles.profileDetails}>
          {22 + " yrs, "}
          {item?.education || "No Education Info"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    backgroundColor: "#222",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // Circular image
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  profileDetails: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
});

export default UserBanner;
