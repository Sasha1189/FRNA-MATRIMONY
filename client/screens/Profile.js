import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { images, icons } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "../components/Menus/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [images, setImages] = useState([]);

  const loadImagesFromLocal = async () => {
    try {
      const storedImages = await AsyncStorage.getItem("storedImages");
      if (storedImages) {
        setImages(JSON.parse(storedImages));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load images.");
      console.error(error);
    }
  };
  //Load initial local stored images
  useEffect(() => {
    loadImagesFromLocal();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {/* Profile Section */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MyProfile")}
          style={styles.profileSection}
        >
          <View style={styles.profileImageContainer}>
            {images.length > 0 ? (
              <Image
                source={{ uri: images[0] }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("../assets/images/profile.png")}
                style={styles.profileImage}
                resizeMode="contain"
              />
            )}
          </View>
          <Text style={styles.profileName}>Swaraj, 24</Text>
        </TouchableOpacity>
        {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddImages")}
            style={styles.buttonWrapper}
          >
            <View style={styles.iconContainer}>
              <Image
                source={require("../assets/icons/camera.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.buttonText}>Add Images</Text>
          </TouchableOpacity>
          <View style={styles.horizontalButtons}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Biodata")}
              style={styles.buttonWrapper}
            >
              <View style={styles.iconContainer}>
                <Image
                  source={require("../assets/icons/usered.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.buttonText}>Add Biodata</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Setting")}
              style={styles.buttonWrapper}
            >
              <View style={styles.iconContainer}>
                <Image
                  source={require("../assets/icons/set.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subscribe Section */}
        <View style={styles.subscribeSection}>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footerSection}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2C", // Dark background for a modern look
  },
  mainContent: {
    // flex: 1, // Ensures main content takes all available space above the footer
  },
  profileSection: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    marginBottom: 15,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3C3C4E",
    borderWidth: 2,
    borderColor: "#A6A6C1",
    overflow: "hidden",
  },
  profileImage: {
    height: "100%",
    width: "100%",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  buttonsSection: {
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  buttonWrapper: {
    alignItems: "center",
    marginVertical: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "#333333",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3C3C4E",
    overflow: "hidden",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  buttonText: {
    marginTop: 8,
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
  },
  horizontalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 40,
  },
  subscribeSection: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  subscribeButton: {
    paddingVertical: 12,
    paddingHorizontal: 100,
    backgroundColor: "#FF8C42",
    borderRadius: 30,
    borderWidth: 2,
  },
  subscribeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  footerSection: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default Profile;
