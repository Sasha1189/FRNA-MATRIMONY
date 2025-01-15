import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "../components/SubComp/VideoCard";
import EmptyList from "../components/SubComp/EmptyList";
import HeaderMenu from "../components/Menus/HeaderMenu";

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
  {
    id: "4",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimP40ZfDxfoFIhof-9Hwff8Ff0CMstHnhbA&s",
    caption: "City Lights",
  },
  {
    id: "5",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToA5egJYawjmoibG30ksrnHCEYc2sW6Ym1MQ&s",
    caption: "City Lights",
  },
  {
    id: "6",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCLmemnUWG3yO5Vqpp2eQSOu_3EK6DlDAoBw&s",
    caption: "City Lights",
  },
  {
    id: "7",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOkOKsKk_Mk9dqDR0Iqkr8tcmWlJorRwYatw&s",
    caption: "City Lights",
  },
  {
    id: "8",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrGnOzNsyvytROgL7iu9Je9YRuSEBAPkTDzQ&s",
    caption: "City Lights",
  },
  {
    id: "9",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsmW8qnrjPjrBAv5QkP2DJIU5Muy-LWQptnA&s",
    caption: "City Lights",
  },
  {
    id: "10",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMgn5ptL4lS38EOu7ooPOmUzSZmyEkmu89bg&s",
    caption: "City Lights",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
    }
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#115", justifyContent: "flex-start" }}>
        <HeaderMenu />
      </View>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard imageUri={item.imageUri} />}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 80, // Image considered "active" when 80% visible
        }}
        ListEmptyComponent={() => (
          <EmptyList
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 10,
    // justifyContent: "space-between",
  },
});

export default Home;
