import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "../components/SubComp/VideoCard";
import EmptyList from "../components/SubComp/EmptyList";
import Footer from "../components/Menus/Footer";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import HeaderIcons from "../components/Menus/HeaderIcons";

const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.9; // Fixed height per card

const HomeScreen = () => {
  const [state] = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchProfiles = useCallback(async () => {
    try {
      const response = await axios.get("/auth/profiles");
      setProfiles(response.data.profiles || []); // Ensure profiles is always an array
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  }, [state?.token]);

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
      <View style={styles.footer}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    justifyContent: "flex-start",
    borderWidth: 1,
    // elevation: 1,
  },
  flatListContainer: {
    flex: 1,
    borderRadius: 10,
    margin: 5,
    overflow: "hidden",
    borderWidth: 1,
  },
  footer: {
    justifyContent: "flex-end",
    borderWidth: 1,
  },
});

export default HomeScreen;
