// components/GenderModal.js
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import LoadingScreen from "../SubComp/LoadingScreen";

const GenderModal = ({ visible, onClose }) => {
  const { authState, updateAuthState } = useAuth();
  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenderSelect = async () => {
    setLoading(true);
    console.log(gender);

    try {
      await axios.post("/users/update-user", gender);

      updateAuthState({ gender: gender });

      // 2️⃣ Also overwrite the local cache so next fetch sees the new gender
      await AsyncStorage.setItem(
        `user_${authState.user.uid}`,
        JSON.stringify(updatedUser)
      );

      onClose();

      Alert.alert(
        "Success",
        "Gender updated successfully...Later update your complete profile"
      );
    } catch (error) {
      setLoading(false);
      console.error("Error updating gender:", error);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Please select your gender</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              style={[
                styles.modalButtonMale,
                gender === "male" && styles.maleSelected,
              ]}
              onPress={() => setGender("male")}
              disabled={loading}
            >
              <Text style={styles.modalButtonText}>Male</Text>
            </Pressable>
            <Pressable
              style={[
                styles.modalButtonFemale,
                gender === "female" && styles.femaleSelected,
              ]}
              onPress={() => setGender("female")}
              disabled={loading}
            >
              <Text style={styles.modalButtonText}>Female</Text>
            </Pressable>
          </View>
          <TouchableOpacity style={styles.modalButtonUpdate}>
            <Text
              style={styles.modalButtonText}
              onPress={() => handleGenderSelect()}
            >
              {!loading ? "Update" : "Updating" && <LoadingScreen />}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GenderModal;

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonMale: {
    backgroundColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonFemale: {
    backgroundColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonUpdate: {
    alignContent: "flex-end",
    marginTop: 20,
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  femaleSelected: {
    backgroundColor: "#FF1493", // Pink for Female
  },
  maleSelected: {
    backgroundColor: "#007AFF", // Blue for Male
  },
});
