import React, { useEffect, useState, useContext, useMemo } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "../../components/SubComp/IconButton";
import ProfileDisplay from "./ProfileDisplay";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext"; // <-- import your ThemeContext

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

  // 1) consume the theme
  const { theme } = useContext(ThemeContext);

  // 2) create dynamic style object
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    // Hide bottom tab bar for this screen
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
          setItem({
            id: "xyz",
            image: { imageUrls: storedImages },
            profile: storedBiodata,
          });
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load images.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthUserDataFromLocal();

    return () => {
      // Restore the tab bar style
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <IconButton
            name="arrow-left"
            size={24}
            color={COLORS.star}
            bgColor="transparent"
            style={styles.iconBtn}
          />

          <Text style={styles.headerTitle}>MY PROFILE</Text>
          <Text style={styles.iconPlaceholder} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.flatListContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading Profile...</Text>
          </View>
        ) : (
          <ProfileDisplay item={item} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyProfile;

// 3) dynamic style generator
function createStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      justifyContent: "flex-start",
      padding: 2,
      borderBottomWidth: 0.5,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.secondaryBackground,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    iconBtn: {
      elevation: 0,
      height: 50,
      width: 50,
      borderWidth: 0,
    },
    headerTitle: {
      fontSize: 18,
      alignItems: "center",
      fontWeight: "bold",
      color: theme.colors.primary,
      letterSpacing: 2,
    },
    iconPlaceholder: {
      height: 50,
      width: 50,
    },
    flatListContainer: {
      flex: 1,
      margin: 5,
      overflow: "hidden",
    },
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    loadingText: {
      color: theme.colors.text,
      textAlign: "center",
      fontSize: 16,
    },
  });
}
