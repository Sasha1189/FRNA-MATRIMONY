import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

const CustomPicker = ({
  label,
  data,
  currentIndex,
  onSelected,
  themeStyle,
}) => {
  return (
    <>
      <Text
        style={{
          fontWeight: "bold",
          marginVertical: 8,
          color: themeStyle.colors.text,
        }}
      >
        {label}
      </Text>
      <View style={styles.wrapperHorizontal}>
        <FlatList
          bounces
          horizontal
          data={data}
          keyExtractor={(item) => String(item)}
          renderItem={({ item, index }) => {
            const selected = index === currentIndex;
            return (
              <TouchableWithoutFeedback onPress={() => onSelected(index)}>
                <View
                  style={[
                    styles.itemStyleHorizontal,
                    selected && styles.itemSelectedStyleHorizontal,
                  ]}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: selected ? themeStyle.colors.text : "grey",
                      fontWeight: selected ? "bold" : "normal",
                    }}
                  >
                    {item + ""}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pargraphWrapper: {
    backgroundColor: "black",
  },
  paragraph: {
    // color: themeStyle.colors.text,
    textDecorationColor: "yellow",
    textShadowColor: "red",
    textShadowRadius: 1,
    padding: 24,
  },
  wrapperHorizontal: {
    justifyContent: "center",
    color: "black",
  },
  itemStyleHorizontal: {
    marginRight: 10,
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    textAlign: "center",
    justifyContent: "center",
  },
  itemSelectedStyleHorizontal: {
    borderWidth: 2,
    borderColor: "#06bcee",
  },
  platformContainer: {
    marginTop: 8,
    borderTopWidth: 1,
  },
  platformContainerTitle: {
    marginTop: 8,
  },
  title: {
    fontWeight: "bold",
    marginVertical: 8,
  },
});

export default CustomPicker;
