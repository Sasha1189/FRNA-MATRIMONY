import { Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileDisplay from "../../components/SubComp/ProfileDisplay";

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({
    id: "xyz",
    image: {},
    profile: {},
  });

  useEffect(() => {
    const loadAuthUserDataFromLocal = async () => {
      try {
        const storedBiodata = JSON.parse(
          await AsyncStorage.getItem("storedBiodata")
        );
        const storedImages = JSON.parse(
          await AsyncStorage.getItem("storedImages")
        );

        if (storedBiodata && storedImages) {
          setLoading(false);
          setItem({
            id: "xyz",
            image: { imageUrls: storedImages },
            profile: storedBiodata,
          });
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load images.");
        console.error(error);
      }
    };
    loadAuthUserDataFromLocal();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <SafeAreaView style={styles.container}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Loading Profile...
          </Text>
        </SafeAreaView>
      ) : (
        <ProfileDisplay item={item} />
      )}
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
