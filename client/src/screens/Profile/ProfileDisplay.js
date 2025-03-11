import React, { useContext, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageCarousal from "../../components/SubComp/ImageCarousal";
import { ThemeContext } from "../../context/ThemeContext"; // <-- Import ThemeContext

const ProfileDisplay = ({ item }) => {
  const { height } = Dimensions.get("window");
  const containerHeight = height * 0.8;

  // 1) consume the theme
  const { theme } = useContext(ThemeContext);

  // 2) create dynamic style object
  const styles = useMemo(
    () => createStyles(theme, containerHeight),
    [theme, containerHeight]
  );

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </SafeAreaView>
    );
  }

  const Biodata = item?.profile;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionImage}>
          <ImageCarousal id={item._id} images={item?.image} />
        </View>

        <View style={styles.sectionBiodata}>
          <Text style={styles.sectionTitle}>About me</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {Biodata.aboutme || "Not Updated"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Work</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {Biodata.work || "Not Updated"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Current City</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {Biodata.livesin || "Not Updated"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Hometown</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {Biodata.hometown || "Not Updated"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Income</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {Biodata.income || "Not Updated"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Height</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {Biodata.height || "Not Updated"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Hobby</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {Biodata.hobies?.[0] || "Not Updated"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Family Details</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {Biodata.familyDetails || "Not Updated"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Partner Expectations</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {Biodata.partnerExpectations || "Not Updated"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileDisplay;

// 3) dynamic style generator
function createStyles(theme, containerHeight) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingText: {
      color: theme.colors.text,
      textAlign: "center",
      marginTop: 20,
    },
    sectionImage: {
      flex: 1,
      height: containerHeight,
      borderRadius: 10,
      margin: 5,
      overflow: "hidden",
    },
    sectionBiodata: {
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      marginTop: 16,
      marginBottom: 16,
      padding: 20,
      paddingBottom: 0,
      borderRadius: 16,
      backgroundColor: theme.colors.secondaryBackground,
    },
    sectionTitle: {
      marginBottom: 8,
      fontWeight: "600",
      color: theme.colors.text,
    },
    button: {
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      marginBottom: 16,
      paddingHorizontal: 16,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: theme.colors.background,
    },
    buttonText: {
      color: theme.colors.text,
      textAlign: "center",
      paddingVertical: 5,
    },
  });
}
