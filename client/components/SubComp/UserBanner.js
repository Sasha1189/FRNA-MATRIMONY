import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const UserBanner = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onPressProfile = async () => {
    setLoading(true);
    try {
      const dynamicUserId = item?.userId;
      // Construct query params
      const params = { dynamicUserId };
      const response = await axios.get("/profile/dynamicUser", { params });
      let profile = response?.data?.profile || [];
      navigation.navigate("DynymicUserProfile", { item: profile });
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableOpacity style={styles.profileItem} onPress={onPressProfile}>
      <Image
        source={
          require("../../assets/images/profile.png")
          //   { uri: item.image?.imageUrls?.[0] }
        }
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
    margin: 4,
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
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
    color: "#222",
  },
  profileDetails: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },
});

export default UserBanner;
