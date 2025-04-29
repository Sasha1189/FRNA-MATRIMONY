import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigationState } from "@react-navigation/native";
import axios from "axios";
import VideoCard from "../../components/SubComp/VideoCard";
import EmptyList from "../../components/SubComp/EmptyList";
import Footer from "../../components/Menus/Footer";
import { useAuth } from "../../context/authContext";
import HeaderIcons from "../../components/Menus/HeaderIcons";

const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.9; // Fixed height per card

const HomeScreen = () => {
  const route = useRoute();
  const state1 = useNavigationState((state) => state);
  const screenCount = state1?.routes?.length ?? 0;
  console.log(screenCount);

  // If filterParams is undefined or null, we fetch all profiles
  const filterParams = route.params?.filterParams || null;

  const { authState } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Single fetch function to handle normal or filtered requests
  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    try {
      let response;
      if (filterParams) {
        // If we have filters, call the filter endpoint
        response = await axios.get("/profile/filters", {
          params: filterParams,
        });
      } else {
        // Otherwise, fetch all opposite-gender profiles
        response = await axios.get("/profile/oppGenProfiles");
      }
      setProfiles(response.data.profiles || []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  }, [filterParams]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
    }
  }).current;

  // CHANGE: Memoize renderItem function to avoid unnecessary re-renders
  const renderItem = useCallback(({ item }) => <VideoCard item={item} />, []);

  // CHANGE: Memoize keyExtractor
  const keyExtractor = useCallback((item) => item._id.toString(), []);

  // CHANGE: Define getItemLayout for fixed height
  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderIcons />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={profiles}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          pagingEnabled
          snapToAlignment="center"
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 80, // Image considered "active" when 80% visible
          }}
          ListEmptyComponent={() => <EmptyList title="No Profiles Found" />}
          contentContainerStyle={{ paddingTop: 0, paddingBottom: 80 }} // CHANGE: Add bottom padding
          getItemLayout={getItemLayout} // CHANGE: Use getItemLayout for performance
          initialNumToRender={2} // CHANGE: Render only a few items initially
          maxToRenderPerBatch={5} // CHANGE: Render in smaller batches
          windowSize={5}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    justifyContent: "flex-start",
    padding: 2,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  flatListContainer: {
    flex: 1,
    borderRadius: 10,
    margin: 5,
    overflow: "hidden",
    // borderWidth: 1,
  },
  footer: {
    justifyContent: "flex-end",
    padding: 2,
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
