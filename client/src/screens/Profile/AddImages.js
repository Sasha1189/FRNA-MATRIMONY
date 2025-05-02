import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  View,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/SubComp/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext"; // <--- import your ThemeContext
import { firebaseApp } from "../../services/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  refFromURL,
  deleteObject,
} from "firebase/storage"; // Firebase Storage
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { useAuth } from "../../context/authContext";

const MAX_IMAGES = 4;
const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

const AddImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const { authState } = useAuth();
  const { theme } = useContext(ThemeContext);
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const storedImages = await AsyncStorage.getItem(
          `storedImages:${authState.user?.userId}`
        );
        if (storedImages) {
          setImages(JSON.parse(storedImages));
        }
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };
    loadImages();
  }, []);

  // Save images to local
  const saveImagesToLocal = async (imgArr = images) => {
    try {
      await AsyncStorage.setItem(
        `storedImages:${authState?.user?.userId}`,
        JSON.stringify(imgArr)
      );
    } catch (error) {
      console.error("Error saving images to local:", error);
    }
  };

  const openPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });
    if (!result.canceled) {
      try {
        const localUrl = await processImage(result.assets[0].uri);
        const selectedImage = { downloadURL: "", localUrl: localUrl };
        const updatedImages = [...images, selectedImage].slice(0, MAX_IMAGES);
        setImages(updatedImages);
      } catch (error) {
        console.error("Image processing failed:", error);
      }
    } else {
      Alert.alert("Cancelled", "No image was selected.");
    }
  };
  // Function to process image (resize, compress, convert, rename)
  const processImage = async (uri) => {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      throw new Error("File does not exist.");
    }
    // Check if file size > 1MB or format is not JPEG
    if (fileInfo.size > 1024 * 1024 || !uri.endsWith(".jpeg")) {
      console.log("Compressing, converting to JPEG, and renaming...");

      const processedImage = await ImageManipulator.manipulateAsync(
        uri,
        [], // Resize to 512x512
        { compress: 0.75, format: ImageManipulator.SaveFormat.JPEG } // Compress & convert to JPEG
      );
      console.log("processed image", processedImage.uri);

      return processedImage.uri; // Return the new file path
    }
    return uri; // Return original URI if no changes were needed
  };

  const uriToBlob = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Blob conversion failed:", error);
      throw error;
    }
  };

  const uploadImages = async () => {
    if (!images.length) {
      Alert.alert("No Images", "Please select images before uploading.");
      return;
    }

    const pendingUploads = images.filter((img) => !img.downloadURL);
    if (pendingUploads.length === 0) {
      Alert.alert("All Done", "All selected images are already uploaded.");
      return;
    }

    setLoading(true);
    setProgress(new Animated.Value(0));
    const storage = getStorage(firebaseApp);
    let uploadedUrls = [];

    try {
      // Upload each image and collect Promises
      const uploadPromises = images.map((image, index) => {
        if (image.downloadURL !== "") return null; // Already uploaded
        const uniqueFilename = `IMG_${new Date()
          .toISOString()
          .replace(/[-:.TZ]/g, "")}_${Math.floor(Math.random() * 10000)}.jpg`;
        const storageRef = ref(
          storage,
          `users/${authState?.user?.userId}/profileImages/${uniqueFilename}`
        );
        return uriToBlob(image.localUrl).then((blob) => {
          return new Promise((resolve, reject) => {
            const uploadTask = uploadBytesResumable(storageRef, blob);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progressPercent =
                  snapshot.bytesTransferred / snapshot.totalBytes;
                Animated.timing(progress, {
                  toValue: progressPercent,
                  duration: 200,
                  useNativeDriver: false,
                }).start();
              },
              (error) => {
                console.error("Upload failed:", error);
                reject(error);
              },
              async () => {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                uploadedUrls.push(downloadURL);
                image.downloadURL = downloadURL;
                resolve(downloadURL);
              }
            );
          });
        });
      });

      // Wait for all uploads to finish
      await Promise.all(uploadPromises.filter(Boolean));
      saveImagesToLocal(images); // ✅ Save with downloadURL updates
      // Now send to backend
      try {
        await axios.post("/images/uploadImages", uploadedUrls);
        Alert.alert("Success", "Images uploaded successfully!");
      } catch (error) {
        console.error("Failed to upload URLs to DB:", error);
        // 🧽 Clean up uploaded images from Firebase
        for (const url of uploadedUrls) {
          deleteImage(url); // Assuming this is defined
        }
        Alert.alert(
          "Upload Failed",
          "Images were uploaded but failed to save. Please try again."
        );
      }
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Error", "Upload failed.");
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(new Animated.Value(0)), 1000);
    }
  };

  const deleteImage = async (downloadURL) => {
    const storage = getStorage(firebaseApp);
    // Extract the path from the download URL
    const decodedURL = decodeURIComponent(downloadURL);
    const storagePath = decodedURL.substring(
      decodedURL.indexOf("/o/") + 3,
      decodedURL.indexOf("?")
    );
    const imagePath = storagePath.replace(/%2F/g, "/");
    // Create a reference
    const imageRef = ref(storage, imagePath);
    try {
      await deleteObject(imageRef);
      Alert.alert("Success", "Image deleted successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to delete image.");
    }
  };

  const removeImage = async (index) => {
    setLoading(true);
    try {
      await deleteImage(images[index]?.downloadURL);
      const updated = images.filter((_, i) => i !== index);
      setImages(updated);
      await saveImagesToLocal(updated);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
                    source={{ uri: images[index].localUrl }}
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
                  <Text style={styles.uploadText}>Click to Choose a Image</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={uploadImages}
          style={styles.uploadButton}
          disabled={loading}
          activeOpacity={loading ? 1 : 0.7} // disable press animation when uploading
        >
          <Text style={styles.uploadButtonText}>
            {loading ? "Uploading..." : "Upload Images"}
          </Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#FFA500" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddImages;

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
      backgroundColor: "#FF9800", // Fallback color (initial)
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 24,
      overflow: "hidden", // 🔥 Required to clip animated fill
      elevation: 3, // subtle shadow
      position: "relative", // for absoluteFill to work correctly
    },
    uploadButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
      zIndex: 1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject, // full screen
      backgroundColor: "rgba(255, 255, 255, 0.6)", // transparent white overlay
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10, // make sure it's above everything
    },
  });
}
