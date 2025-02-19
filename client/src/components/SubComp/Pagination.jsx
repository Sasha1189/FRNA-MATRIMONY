import React from "react";
import {
  Animated,
  Dimensions,
  View,
  StyleSheet,
  Pressable,
} from "react-native";

const { width } = Dimensions.get("window");

const itemSize = 6;
const activeItemSize = itemSize + 6;
const itemSpacing = 8;

const Pagination = ({ items, scrollAnimation, scrollRef }) => {
  return (
    <View style={styles.pagination}>
      <View style={styles.paginationInner}>
        <Animated.View
          style={[
            styles.activeItem,
            {
              transform: [
                {
                  translateX: scrollAnimation.interpolate({
                    inputRange: items.map((_, i) => width * i),
                    outputRange: items.map(
                      (_, i) => i * (itemSize + itemSpacing)
                    ),
                  }),
                },
              ],
            },
          ]}
        />
        {items.map(({ id }, index) => (
          <Pressable
            key={id}
            onPress={() => {
              scrollRef.current.scrollToOffset({
                animated: true,
                offset: width * index,
              });
            }}
          >
            <View
              style={[
                styles.item,
                index === items.length - 1 ? styles.lastItem : null,
              ]}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    position: "absolute",
    alignItems: "center",
    width,
    height: itemSize,
    bottom: 20,
  },
  paginationInner: {
    flexDirection: "row",
  },
  item: {
    width: itemSize * 4,
    height: itemSize,
    backgroundColor: "#1E1E2D",
    borderRadius: itemSize,
    marginRight: itemSpacing,
  },
  lastItem: {
    marginRight: 0,
  },
  activeItem: {
    position: "absolute",
    left: (itemSize - activeItemSize) / 2,
    top: (itemSize - activeItemSize) / 2,
    width: activeItemSize,
    height: activeItemSize,
    borderRadius: activeItemSize,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default Pagination;
