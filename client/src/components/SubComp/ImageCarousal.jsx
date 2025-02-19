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
    width: "100%",
    height: "100%", // Fills the parent container (which is VideoCard)
  },
  item: {
    // alignItems: "center",
    // justifyContent: "center",
    // overflow: "hidden",
    // width: "100%", // Since VideoCard is fixed at width: width
    // height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  itemOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  image: {
    width: width,
    height: height * 0.8,
    resizeMode: "cover",
    // width: "100%",
    // height: "100%",
  },
});

export default ImageCarousal;
