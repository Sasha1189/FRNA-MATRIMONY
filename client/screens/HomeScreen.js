import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
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

const DATA = [
  {
    id: "1",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVvpbwvlsBuK-oz1H9oPa5s4Yfx2MJAPph9w&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMgn5ptL4lS38EOu7ooPOmUzSZmyEkmu89bg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsmW8qnrjPjrBAv5QkP2DJIU5Muy-LWQptnA&s",
    ],

    biodata: {
      aboutme: "Open minded free",
      education: "BCOM",
      familyDetails: "Father mother staying together ",
      fullname: "Pranav",
      height: "5'6 ",
      hobies: "Wrestaling",
      hometown: "Satara",
      income: "Less than 10 Lakh",
      livesin: "Pune",
      maritalStatus: "Single",
      partnerExpectations: "Well earning",
      work: "TCS",
    },
  },
  {
    id: "2",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWXh5ZK-oALZvFBFKEJ6e7IyKKgyx9hm-t7g&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrGnOzNsyvytROgL7iu9Je9YRuSEBAPkTDzQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOkOKsKk_Mk9dqDR0Iqkr8tcmWlJorRwYatw&s",
    ],
    biodata: {
      aboutme: "Caring, Loving, Social ",
      education: "Science",
      familyDetails: "Grand Parents, Father, mother, Brother, Sister",
      fullname: "Mohan",
      height: "7'",
      hobies: "Tennis",
      hometown: "Solapur",
      income: "Less than 10 Lakh",
      livesin: "Mumbai",
      maritalStatus: "Single",
      partnerExpectations: "Smart Ambitious Social",
      work: "Reliance",
    },
  },
  {
    id: "3",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwNWb3ZZDtEOH8S-SAzbp20isaFGuNOg51bQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToA5egJYawjmoibG30ksrnHCEYc2sW6Ym1MQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimP40ZfDxfoFIhof-9Hwff8Ff0CMstHnhbA&s",
    ],
    biodata: {
      aboutme: "Health man who has been working Caring ",
      education: "BA",
      familyDetails: "Father mother brother ",
      fullname: "Swaraj ",
      height: "6'",
      hobies: "Football ",
      hometown: "Buldhana",
      income: "Less than 10 Lakh",
      livesin: "Chandrapur",
      maritalStatus: "Single",
      partnerExpectations: "Well groomed mannered ",
      work: "Accenture ",
    },
  },
];

const HomeScreen = () => {
  const { state } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchProfiles = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://192.168.234.147:8080/api/v1/auth/profiles"
      );
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
          contentContainerStyle={styles.listContainer}
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
