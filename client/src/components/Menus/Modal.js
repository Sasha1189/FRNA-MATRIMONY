import { getAuth, updateProfile } from "firebase/auth";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, setTimeout } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import LoadingScreen from "../SubComp/LoadingScreen";

const GenderModal = ({ visible, onClose }) => {
  const { setUser } = useAuth();
  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retry, setRetry] = useState(false);

  const updateFirebaseUser = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!gender) {
      Alert.alert("Select Gender", "Please select a gender before updating.");
      return;
    }
    setLoading(true);
    setRetry(false);

    try {
      if (!currentUser?.displayName) {
        await updateProfile(currentUser, {
          displayName: gender,
        });
        await currentUser.reload();
      }

      setUser(auth.currentUser);
      await createUser(auth.currentUser);

      Alert.alert(
        "Done!",
        "Gender updated successfully. You can now complete your profile."
      );
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      setRetry(true);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (firebaseUser) => {
    try {
      const newUser = {
        uid: firebaseUser.uid,
        phoneNumber: firebaseUser.phoneNumber,
        displayName: firebaseUser.displayName,
      };
      // create on backend
      await axios.post(`/users/create-user`, newUser);
    } catch (error) {
      console.error("Error creating user in backend:", error);
      throw error;
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
          <TouchableOpacity
            style={styles.modalButtonUpdate}
            onPress={updateFirebaseUser}
            disabled={loading || !gender}
          >
            {loading ? (
              <LoadingScreen />
            ) : (
              <Text style={styles.modalButtonText}>
                {retry ? "Try Again" : "Update"}
              </Text>
            )}
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
