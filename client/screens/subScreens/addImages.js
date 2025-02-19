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
import IconButton from "../../components/SubComp/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const MAX_IMAGES = 4;
const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

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

  //Load initial images
  useEffect(() => {
    const loadImages = async () => {
      try {
        const storedImages = await AsyncStorage.getItem("storedImages");

        if (storedImages) {
          const parsedImages = JSON.parse(storedImages);
          // Ensure valid stored data before setting state
          if (Array.isArray(parsedImages) && parsedImages.length > 0) {
            setImages(parsedImages);
            return; // Exit to prevent unnecessary server call
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
            ADD IMAGES
          </Text>
          <Text style={{ height: 50, width: 50 }}></Text>
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
    borderRadius: 10,
    margin: 5,
    overflow: "hidden",
    // borderWidth: 1,
  },
  contentHeaderName: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  contentHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 20,
    // textAlign: "center",
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
