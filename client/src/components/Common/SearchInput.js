import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";

const SearchInput = ({ query, setQuery, handleSearch }) => {
  console.count();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={query}
        placeholder="Search a name"
        // placeholderTextColor="#CDCDE0"
        onChangeText={(text) => setQuery(text)}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image
          source={require("../../assets/icons/search.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 54,
    backgroundColor: "#CDCDE0" || "#1E1E2D",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#333",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginTop: 2,
    // color: "#fff",
    fontFamily: "Poppins-Regular",
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default SearchInput;
