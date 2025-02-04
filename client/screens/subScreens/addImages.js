import { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const MAX_IMAGES = 4;

const AddImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const saveImagesToLocal = async () => {
    try {
      await AsyncStorage.setItem("storedImages", JSON.stringify(images));
    } catch (error) {
      console.error(error);
    }
  };
  //Load initial local stored images
  useEffect(() => {
    const loadImagesFromLocal = async () => {
      try {
        const storedImages = await AsyncStorage.getItem("storedImages");
        if (storedImages) {
          setImages(JSON.parse(storedImages));
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadImagesFromLocal();
  }, []);
  // Upload to server
  const Upload = async () => {
    if (!images.length) {
      Alert.alert("No Images", "Please select images before uploading.");
      return;
    }
    setLoading(true);
    try {
      setLoading(true);
      const { data } = await axios.post("/images/uploadImages", images);
      // setImages(data);
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
      mediaTypes: "images",
      // allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: MAX_IMAGES - images.length,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      const updatedImages = [...images, ...selectedImages];
      setImages(updatedImages);
      //store images to local
      saveImagesToLocal(updatedImages);
    } else {
      Alert.alert("Cancelled", "No images were selected.");
    }
  };
  const removeImage = async (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    //update images to local storages
    await saveImagesToLocal(images);
    await Upload();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add your profile photos here...</Text>
      </View>
      <View style={styles.container}>
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
        <Text style={styles.uploadButtonText}>Upload Images</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1E1E2C", // Replace with your primary color
  },
  header: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600", // 'font-psemibold' equivalent
    color: "#FFFFFF",
    marginLeft: 20,
    // textAlign: "center",
  },
  container: {
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
    borderColor: "#444444",
    overflow: "hidden",
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
    backgroundColor: "#3C3C4E",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444444",
  },
  uploadIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    color: "#AAAAAA",
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "#FF8C42", // Replace with your desired color
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

export default AddImages;
