import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

// examples picker
// const fontStyles = ["normal", "italic"];
// const [fontStyleIdx, setFontStyleIdx] = useState(0);

{
  /* <CustomPicker
  label="Font Style"
  data={fontStyles}
  currentIndex={fontStyleIdx}
  onSelected={setFontStyleIdx}
/>; */
}
// for display/select
//<Text>fontStyle: fontStyles[fontStyleIdx]</Text>

const CustomPicker = ({ label, data, currentIndex, onSelected }) => {
  return (
    <>
      <Text style={styles.title}>{label}</Text>
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
                      color: selected ? "black" : "grey",
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
    color: "#fff",
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
