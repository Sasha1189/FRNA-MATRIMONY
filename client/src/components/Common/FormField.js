import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  multiline = false,
  titleStyle,
  placeholderStyle,
}) => {
  return (
    <View>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <TextInput
        style={[styles.input, otherStyles]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderStyle?.color || "#AAAAAA"}
        onChangeText={handleChangeText}
        multiline={multiline}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    // color: "#FFFFFF", // Default title color
    marginBottom: 8,
  },
  input: {
    // backgroundColor: "#2E2E40",
    // color: "#FFFFFF",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
});

export default FormField;
