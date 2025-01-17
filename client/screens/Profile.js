import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { images, icons } from "../constants";
import Footer from "../components/Menus/Footer";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {/* Uncomment and use when the image is available */}
            <Image
              source={require("../assets/images/profile.png")}
              style={styles.profileImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.profileName}>Swaraj, 24</Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate("addImages")}
            style={styles.buttonWrapper}
          >
            <View style={styles.iconContainer}>
              {/* Uncomment and use when the icon is available */}
              <Image
                source={require("../assets/icons/camera.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.buttonText}>Add Images</Text>
          </TouchableOpacity>
          <View style={styles.horizontalButtons}>
            <TouchableOpacity style={styles.buttonWrapper}>
              <View style={styles.iconContainer}>
                {/* Uncomment and use when the icon is available */}
                <Image
                  source={require("../assets/icons/usered.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonWrapper}>
              <View style={styles.iconContainer}>
                {/* Uncomment and use when the icon is available */}
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
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    // borderWidth: 1,
    // borderColor: "red",
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
    // flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 5,
    // borderWidth: 1,
    // borderColor: "red",
  },
  buttonWrapper: {
    alignItems: "center",
    marginVertical: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "#FF8C42",
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
    // borderWidth: 1,
    // borderColor: "red",
  },
  subscribeButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#FF8C42",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#A6A6C1",
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
    // borderWidth: 1,
    // borderColor: "red",
  },
});

export default Profile;
