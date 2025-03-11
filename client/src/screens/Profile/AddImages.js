import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  View,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/SubComp/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext"; // <--- import your ThemeContext

const MAX_IMAGES = 4;
const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

const AddImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1) consume the theme
  const { theme } = useContext(ThemeContext);

  // 2) dynamic style object
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Save images to local
  const saveImagesToLocal = async (imgArr = images) => {
    try {
      await AsyncStorage.setItem("storedImages", JSON.stringify(imgArr));
    } catch (error) {
      console.error(error);
    }
  };

  // Load initial images
  useEffect(() => {
    const loadImages = async () => {
      try {
        const storedImages = await AsyncStorage.getItem("storedImages");
        if (storedImages) {
          const parsedImages = JSON.parse(storedImages);
          if (Array.isArray(parsedImages) && parsedImages.length > 0) {
            setImages(parsedImages);
            return;
          }
        }
        // If no valid local data, fetch from server
        const { data } = await axios.get("/images/myImages");
        const userImages = data?.userImages;
        if (userImages) {
          setImages(userImages);
          await AsyncStorage.setItem(
            "storedImages",
            JSON.stringify(userImages)
          );
        }
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };
    loadImages();
  }, []);

  // Upload to server
  const Upload = async () => {
    if (!images.length) {
      Alert.alert("No Images", "Please select images before uploading.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/images/uploadImages", images);
      await saveImagesToLocal();
      Alert.alert("Success", "Images uploaded successfully!");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const openPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: MAX_IMAGES - images.length,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      const updatedImages = [...images, ...selectedImages];
      setImages(updatedImages);
      saveImagesToLocal(updatedImages);
    } else {
      Alert.alert("Cancelled", "No images were selected.");
    }
  };

  const removeImage = async (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    await saveImagesToLocal(updated);
    // optionally re-upload if needed
    // await Upload();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <IconButton
            name="arrow-left"
            size={24}
            color={COLORS.star}
            bgColor={"transparent"}
            style={styles.iconBtn}
          />
          <Text style={styles.headerTitle}>ADD IMAGES</Text>
          <Text style={styles.iconPlaceholder} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.flatListContainer}>
        <View style={styles.contentHeaderName}>
          <Text style={styles.contentHeaderText}>
            Add your profile photos here...
          </Text>
        </View>

        <View style={styles.contentContainer}>
          {Array.from({ length: MAX_IMAGES }).map((_, index) => (
            <View key={index} style={styles.imageWrapper}>
              {images[index] ? (
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: images[index] }}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.removeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={openPicker} style={styles.addImage}>
                  <Image
                    source={require("../../assets/icons/upload.png")}
                    style={styles.uploadIcon}
                  />
                  <Text style={styles.uploadText}>Choose a file</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={Upload} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>
            {loading ? "Uploading..." : "Upload Images"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddImages;

// 3) the dynamic style generator
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
      borderRadius: 10,
      margin: 5,
      overflow: "hidden",
    },
    contentHeaderName: {
      paddingHorizontal: 16,
      marginVertical: 24,
    },
    contentHeaderText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
      marginLeft: 20,
    },
    contentContainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginHorizontal: 16,
    },
    imageWrapper: {
      width: "40%",
      height: "40%",
      marginVertical: 8,
    },
    imageContainer: {
      flex: 1,
      position: "relative",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: "hidden",
      backgroundColor: theme.colors.secondaryBackground,
    },
    thumbnailImage: {
      width: "100%",
      height: "100%",
    },
    removeButton: {
      position: "absolute",
      top: 4,
      right: 4,
      backgroundColor: "#FF6666",
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    removeButtonText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "bold",
    },
    addImage: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.secondaryBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    uploadIcon: {
      width: 32,
      height: 32,
      marginBottom: 8,
    },
    uploadText: {
      fontSize: 14,
      color: theme.colors.text,
      textAlign: "center",
    },
    uploadButton: {
      backgroundColor: "#FF8C42",
      padding: 12,
      width: "80%",
      marginHorizontal: "10%",
      marginBottom: 50,
      borderRadius: 16,
      alignItems: "center",
    },
    uploadButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "600",
    },
  });
}
