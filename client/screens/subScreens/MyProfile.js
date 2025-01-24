import { SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileDisplay from "../../components/SubComp/ProfileDisplay";

const MyProfile = () => {
  const [images, setImages] = useState([]);
  const [Biodata, setBiodata] = useState({});
  const loadImagesFromLocal = async () => {
    try {
      const storedImages = await AsyncStorage.getItem("storedImages");
      if (storedImages) {
        setImages(JSON.parse(storedImages));
        setUser({
          id: "xyz1",
          images: images,
          biodata: "",
        });
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
        setUser({
          id: "xyz1",
          images: images,
          biodata: Biodata,
        });
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
  const user = {
    id: "xyz1",
    images: images,
    biodata: Biodata,
  };
  return (
    <SafeAreaView style={styles.container}>
      <ProfileDisplay user={user} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
export default MyProfile;
