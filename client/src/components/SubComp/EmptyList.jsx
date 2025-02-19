import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const EmptyList = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/empty.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 16,
  },
  image: {
    width: 270,
    height: 216,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#CCCCCC",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 8,
  },
});

export default EmptyList;
