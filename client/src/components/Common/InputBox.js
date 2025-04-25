import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const InputBox = ({
  inputTitle,
  placeholder,
  placeholderTextColor,
  keyboardType,
  autoComplete,
  secureTextEntry = false,
  value,
  setValue,
}) => {
  return (
    <View>
      <Text>{inputTitle}</Text>
      <TextInput
        style={styles.inputBox}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "#010101",
  },
});
export default InputBox;
