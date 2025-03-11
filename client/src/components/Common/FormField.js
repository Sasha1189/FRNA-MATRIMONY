import React, { useContext, useMemo } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

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
  const { theme } = useContext(ThemeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={[styles.input, otherStyles]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={styles.placeholder}
        onChangeText={handleChangeText}
        multiline={multiline}
      />
    </View>
  );
};
function createStyles(theme) {
  return StyleSheet.create({
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: 8,
    },
    input: {
      color: theme.colors.text,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      textAlign: "center",
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.secondaryBackground,
    },
    placeholder: {
      color: theme.colors.text,
    },
  });
}

export default FormField;
