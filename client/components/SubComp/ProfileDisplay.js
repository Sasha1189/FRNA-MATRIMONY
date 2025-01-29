import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageCarousal from "./ImageCarousal";

const ProfileDisplay = ({ user }) => {
  const { height, width } = Dimensions.get("window");
  const containerHeight = height * 0.8;
  const Biodata = user.biodata;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={[styles.sectionImage, { height: containerHeight }]}>
          <ImageCarousal id={user.id} images={user.images} />
        </View>
        <View style={styles.sectionBiodata}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  listContainer: {
    borderWidth: 1,
    borderColor: "red",
  },
  sectionImage: {
    flex: 1,
    // height: containerHeight,
    borderRadius: 10,
    margin: 5,
    overflow: "hidden",
  },
  sectionBiodata: {
    borderWidth: 2,
    borderColor: "#333333",
    marginTop: 16,
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
