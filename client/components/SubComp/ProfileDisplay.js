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
  const [Biodata, setBiodata] = useState({});
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
  const loadBiodataFromLocal = async () => {
    try {
      const storedBiodata = await AsyncStorage.getItem("storedBiodata");
      if (storedBiodata) {
        setBiodata(JSON.parse(storedBiodata));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load images.");
      console.error(error);
    }
  };
  useEffect(() => {
    loadImagesFromLocal();
    loadBiodataFromLocal();
  }, []);
  const data = [
    {
      id: "xyz1",
      images: images,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <VideoCard item={data[0]} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About me</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{Biodata.aboutme}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Work</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{Biodata.work}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Current City</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{Biodata.livesin}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Hometown</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{Biodata.hometown}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Income</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{Biodata.income}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Height</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{Biodata.height}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Hobby</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{Biodata.hobies}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>family Details</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{Biodata.familyDetails}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Partner Expectatios</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{Biodata.partnerExpectations}</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.section}>
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
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollViewContainer: {
    marginBottom: 50,
  },
  listContainer: {
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
