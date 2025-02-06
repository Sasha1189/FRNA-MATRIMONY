import React from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Pagination from "./Pagination";

const { width, height } = Dimensions.get("window");

const ImageCarousal = ({ images }) => {
  const scrollRef = React.useRef();
  const scrollAnimation = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.screen}>
      <Animated.FlatList
        ref={scrollRef}
        data={images?.imageUrls}
        bounces={false}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(imageUrls, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollAnimation } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            width * (index - 0.5),
            width * index,
            width * (index + 0.5),
          ];
          return (
            <View style={styles.item}>
              <Animated.Image
                source={{ uri: item }}
                resizeMode={"cover"}
                style={[
                  styles.image,
                  {
                    transform: [
                      {
                        translateX: scrollAnimation.interpolate({
                          inputRange: [
                            width * (index - 1),
                            width * index,
                            width * (index + 1),
                          ],
                          outputRange: [-width * 0.5, 0, width * 0.5],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
          );
        }}
      />
      {/* <Pagination
        items={item}
        scrollAnimation={scrollAnimation}
        scrollRef={scrollRef}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  itemOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  image: {
    width: width,
    height: height * 0.82,
    resizeMode: "cover",
  },
});

export default ImageCarousal;
