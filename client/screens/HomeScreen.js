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

const { height, width } = Dimensions.get("window");

const HomeScreen = () => {
  const [state] = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState("");
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={profiles}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <VideoCard item={item} />}
          pagingEnabled
          snapToAlignment="center"
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 80, // Image considered "active" when 80% visible
          }}
          ListEmptyComponent={() => <EmptyList title="No Profiles Found" />}
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
  footer: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  flatListContainer: {
    flex: 1,
    borderRadius: 10,
    margin: 5,
    overflow: "hidden",
  },
});

export default HomeScreen;
