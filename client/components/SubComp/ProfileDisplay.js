import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VideoCard from "../../components/SubComp/VideoCard";

const ProfileDisplay = () => {
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
  useEffect(() => {
    loadImagesFromLocal();
  }, []);
  const data = [
    {
      id: "xyz1",
      images: images,
    },
  ];
  //   console.log(data[0]);
  //   console.log(data.indexOf(data[0]));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <VideoCard
          item={data[0]}
          //   index={data.indexOf(data[0])}
        />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment account</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Manage pay account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact us</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Legal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Privacy policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Term of service</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  section: {
    borderWidth: 2,
    borderColor: "#333333",
    marginBottom: 16,
    padding: 16,
    paddingBottom: 0,
    backgroundColor: "#1E1E2C", // Replace with your black-100 equivalent
    borderRadius: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#AAAAAA", // Replace with your gray-100 equivalent
  },
  button: {
    borderWidth: 2,
    borderColor: "#444444", // Replace with your secondary color
    height: 48,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  sectionDanger: {
    borderWidth: 2,
    borderColor: "#333333",
    marginBottom: 100,
    padding: 16,
    paddingBottom: 0,
    backgroundColor: "#1E1E2C", // Replace with your black-100 equivalent
    borderRadius: 16,
  },
});
export default ProfileDisplay;
