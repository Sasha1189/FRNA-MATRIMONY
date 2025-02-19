import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext } from "react";
import IconButton from "../../components/SubComp/IconButton";
import { AuthContext } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

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
            SETTINGS
          </Text>
          <Text style={{ height: 50, width: 50 }}></Text>
        </View>
      </View>
      <View style={styles.flatListContainer}>
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
    margin: 5,
    overflow: "hidden",
  },
  scrollView: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  section: {
    borderWidth: 0.5,
    borderColor: "#333333",
    marginBottom: 16,
    padding: 16,
    paddingBottom: 0,
    backgroundColor: "#fff", // Replace with your black-100 equivalent
    borderRadius: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#AAAAAA", // Replace with your gray-100 equivalent
  },
  button: {
    borderWidth: 0.5,
    borderColor: "#444444", // Replace with your secondary color
    height: 48,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
  },
  buttonText: {
    // color: "#FFFFFF",
    textAlign: "center",
  },
  sectionDanger: {
    borderWidth: 0.5,
    borderColor: "#333333",
    marginBottom: 100,
    padding: 16,
    paddingBottom: 0,
    backgroundColor: "#fff", // Replace with your black-100 equivalent
    borderRadius: 16,
  },
});

export default Setting;
