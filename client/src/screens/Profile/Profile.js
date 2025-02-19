import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "../../components/Menus/Footer";
import IconButton from "../../components/SubComp/IconButton";
import { AuthContext } from "../../context/authContext";

const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

const Profile = () => {
  const [state] = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [images, setImages] = useState([]);

  //Load initial local stored images
  useEffect(() => {
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
    loadImagesFromLocal();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ height: 50, width: 50 }}></Text>
          <Text
            style={{
              fontSize: 18,
              alignItems: "center",
              fontWeight: "bold",
              fontStyle: "",
              color: "#ff006f",
              letterSpacing: 2,
            }}
          >
            PROFILE
          </Text>
          <IconButton
            name="arrow-right"
            size={24}
            color={COLORS.star}
            bgColor={"transparent"}
            style={{
              elevation: 0,
              height: 50,
              width: 50,
              borderWidth: 0,
            }}
          />
        </View>
      </View>
      <View style={styles.mainContent}>
        {/* Profile Section */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MyProfile")}
          style={styles.profileSection}
        >
          <View style={styles.profileImageContainer}>
            {images.length > 0 ? (
              <Image
                source={{
                  uri: images[0],
                }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("../../assets/images/profile.png")}
                style={styles.profileImage}
                resizeMode="contain"
              />
            )}
          </View>
          <Text style={styles.profileName}>
            {state?.user?.name
              ?.toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
            , 23
          </Text>
        </TouchableOpacity>
        {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddImages")}
            style={styles.buttonWrapper}
          >
            <View style={styles.iconContainer}>
              <Image
                source={require("../../assets/icons/camera.png")}
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
                  source={require("../../assets/icons/usered.png")}
                  style={{ height: "80%", width: "80%" }}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.buttonText}>Update biodata</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Setting")}
              style={styles.buttonWrapper}
            >
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/icons/set.png")}
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
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat")}
            style={styles.subscribeButton}
          >
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#f2f2f2",
    // backgroundColor: "#1E1E2C", // Dark background for a modern look
  },
  header: {
    justifyContent: "flex-start",
    padding: 2,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  mainContent: {
    flex: 1,
    margin: 5,
    // borderWidth: 1,
  },
  profileSection: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3C3C4E",
    borderWidth: 0.5,
    borderColor: "#A6A6C1",
    overflow: "hidden",
  },
  profileImage: {
    height: "100%",
    width: "100%",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    // color: "#FFFFFF",
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
    borderWidth: 0.2,
    borderColor: "#333333",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#3C3C4E",
    overflow: "hidden",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  buttonText: {
    marginTop: 8,
    fontSize: 14,
    // color: "#FFFFFF",
    textAlign: "center",
  },
  horizontalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 40,
  },
  subscribeSection: {
    flex: 1,
    marginBottom: 20,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  subscribeButton: {
    backgroundColor: "#FF8C42", // Replace with your desired color
    padding: 12,
    width: "80%",
    marginHorizontal: "10%",
    marginBottom: 10,
    borderRadius: 16,
    alignItems: "center",
  },
  subscribeText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  footer: {
    justifyContent: "flex-end",
    padding: 2,
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
});

export default Profile;
