import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "../components/SubComp/VideoCard";
import EmptyList from "../components/SubComp/EmptyList";
import Footer from "../components/Menus/Footer";

const { height, width } = Dimensions.get("window");

const DATA = [
  {
    id: "1",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVvpbwvlsBuK-oz1H9oPa5s4Yfx2MJAPph9w&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMgn5ptL4lS38EOu7ooPOmUzSZmyEkmu89bg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsmW8qnrjPjrBAv5QkP2DJIU5Muy-LWQptnA&s",
    ],

    caption: "Beautiful Sunset",
  },
  {
    id: "2",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWXh5ZK-oALZvFBFKEJ6e7IyKKgyx9hm-t7g&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrGnOzNsyvytROgL7iu9Je9YRuSEBAPkTDzQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOkOKsKk_Mk9dqDR0Iqkr8tcmWlJorRwYatw&s",
    ],
    caption: "Mountain Adventure",
  },
  {
    id: "3",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwNWb3ZZDtEOH8S-SAzbp20isaFGuNOg51bQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToA5egJYawjmoibG30ksrnHCEYc2sW6Ym1MQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimP40ZfDxfoFIhof-9Hwff8Ff0CMstHnhbA&s",
    ],
    caption: "City Lights",
  },
];

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
    }
  }).current;
  // console.log("from home scree", DATA.indexOf(item));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard item={item} />}
        contentContainerStyle={styles.listContainer}
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
            title="No Video's Found"
            subtitle="Be the first one to upload a video"
          />
        )}
      />
      <View style={styles.footer}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  footer: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  listContainer: {
    // paddingBottom: 20,
    borderWidth: 1,
    borderColor: "red",
  },
});

export default HomeScreen;
