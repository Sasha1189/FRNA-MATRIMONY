import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Setting = () => {
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();
  // logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("@auth");
    await AsyncStorage.removeItem("storedImages");
    await AsyncStorage.removeItem("storedBiodata");
    setState({ token: "", user: null });
    alert("logout successfully");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment account</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Manage pay account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact us</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Legal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Privacy policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Term of service</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionDanger}>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Delete account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1E1E2C", // Replace with your primary color
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  section: {
    borderWidth: 2,
    borderColor: "#333333",
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

export default Setting;
