import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import VideoCard from "../../screens/test/components/VideoCard";

const { height, width } = Dimensions.get("window");

const DATA = [
  {
    id: "1",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVvpbwvlsBuK-oz1H9oPa5s4Yfx2MJAPph9w&s",
    caption: "Beautiful Sunset",
  },
  {
    id: "2",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWXh5ZK-oALZvFBFKEJ6e7IyKKgyx9hm-t7g&s",
    caption: "Mountain Adventure",
  },
  {
    id: "3",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwNWb3ZZDtEOH8S-SAzbp20isaFGuNOg51bQ&s",
    caption: "City Lights",
  },
];

const ImageShortsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
    }
  }).current;

  const renderItem = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <Text style={styles.caption}>{item.caption}</Text>
    </View>
  );

  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => {
        <VideoCard imageUri={item.imageUri} />;
      }}
      keyExtractor={(item) => item.id}
      pagingEnabled
      snapToAlignment="center"
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 80, // Image considered "active" when 80% visible
      }}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height,
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  image: {
    height: "99%",
    width: "99%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  caption: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ImageShortsScreen;
