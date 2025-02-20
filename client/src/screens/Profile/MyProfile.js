import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "../../components/SubComp/IconButton";
import ProfileDisplay from "./ProfileDisplay";
import { useNavigation } from "@react-navigation/native";

const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({
    id: "xyz",
    image: {},
    profile: {},
  });

  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });

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
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined, // or your default style
      });
    };
  }, [navigation]);

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
          <IconButton
            name="arrow-left"
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
            MY PROFILE
          </Text>
          <Text style={{ height: 50, width: 50 }}></Text>
        </View>
      </View>
      <View style={styles.flatListContainer}>
        {loading ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ textAlign: "center" }}>Loading Profile...</Text>
          </View>
        ) : (
          <ProfileDisplay item={item} />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    justifyContent: "flex-start",
    padding: 2,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  flatListContainer: {
    flex: 1,
    margin: 5,
    overflow: "hidden",
  },
});
export default MyProfile;
