import { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import FormField from "../../components/Forms/FormField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const districts = [
  "Ahmednagar",
  "Akola",
  "Amravati",
  "Aurangabad",
  "Beed",
  "Bhandara",
  "Buldhana",
  "Chandrapur",
  "Dhule",
  "Gadchiroli",
  "Gondia",
  "Hingoli",
  "Jalgaon",
  "Jalna",
  "Kolhapur",
  "Latur",
  "Mumbai City",
  "Mumbai Suburban",
  "Nagpur",
  "Nanded",
  "Nandurbar",
  "Nashik",
  "Osmanabad",
  "Palghar",
  "Parbhani",
  "Pune",
  "Raigad",
  "Ratnagiri",
  "Sangli",
  "Satara",
  "Sindhudurg",
  "Solapur",
  "Thane",
  "Wardha",
  "Washim",
  "Yavatmal",
];
const maritalStatuses = ["Single", "Divorced", "Widowed"];
const incomeOptions = ["Less than 10 Lakh", "More than 10 Lakh"];

const Biodata = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    aboutme: "",
    education: "",
    work: "",
    height: "",
    livesin: "",
    hometown: "",
    income: "",
    hobies: "",
    maritalStatus: "",
    familyDetails: "",
    partnerExpectations: "",
  });
  //for data filter
  const filterProfileData = (profileData) => {
    return {
      fullname: profileData.fullname || "",
      aboutme: profileData.aboutme || "",
      education: profileData.education || "",
      work: profileData.work || "",
      height: profileData.height || "",
      livesin: profileData.livesin || "",
      hometown: profileData.hometown || "",
      income: profileData.income || "",
      hobbies: profileData.hobbies || [], // Ensure hobbies is an array
      maritalStatus: profileData.maritalStatus || "",
      familyDetails: profileData.familyDetails || "",
      partnerExpectations: profileData.partnerExpectations || "",
    };
  };
  //Load initial local stored biodata if not server
  useEffect(() => {
    const loadBiodata = async () => {
      try {
        const storedBiodata = await AsyncStorage.getItem("storedBiodata");

        if (storedBiodata) {
          const parsedData = JSON.parse(storedBiodata);
          // Ensure the data is valid before setting state
          if (parsedData && parsedData._id) {
            setForm(filterProfileData(parsedData));
            return; // Exit to prevent unnecessary server call
          }
        }
        // If no valid local data, fetch from server
        const { data } = await axios.get("/profile/myprofile");

        if (data?.currentUserProfile) {
          const filteredProfile = filterProfileData(data.currentUserProfile);
          setForm(filteredProfile);

          // Store fetched data in AsyncStorage for next time
          await AsyncStorage.setItem(
            "storedBiodata",
            JSON.stringify(filteredProfile)
          );
        }
      } catch (error) {
        console.error("Error loading biodata:", error);
      }
    };

    loadBiodata();
  }, []);

  const validateForm = () => {
    const emptyFields = Object.keys(form).filter((key) => !form[key]);
    if (emptyFields.length) {
      Alert.alert(
        "Error",
        `Please fill out the following fields: ${emptyFields.join(", ")}`
      );
      return false;
    }
    return true;
  };
  const saveBiodataToLocal = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem("storedBiodata", JSON.stringify(form));
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      setLoading(true);
      const { data } = await axios.post("/profile/updateProfile", form);
      setForm(data);
      await saveBiodataToLocal();
      Alert.alert("Success", "Biodata updated successfully!");
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Update your biodata here...</Text>
          </View>
          {[
            {
              title: "Full Name",
              value: "fullname",
              placeholder: "Write your full name...",
            },
            {
              title: "About me",
              value: "aboutme",
              placeholder: "Write about yourself...",
              multiline: true,
            },
            {
              title: "Education",
              value: "education",
              placeholder: "Write your highest education..",
            },
            {
              title: "Work",
              value: "work",
              placeholder: "Company of your work..",
            },
            {
              title: "Height",
              value: "height",
              placeholder: "Enter your height (e.g., 5'7\")",
            },
            {
              title: "Hobby",
              value: "hobies",
              placeholder: "Write your hobbies",
            },
          ].map((field, index) => (
            <View key={index} style={styles.fieldContainer}>
              <FormField
                title={field.title}
                value={form[field.value]}
                placeholder={field.placeholder}
                multiline={field.multiline || false}
                otherStyles={field.multiline ? { height: 100 } : undefined}
                handleChangeText={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    [field.value]: value,
                  }))
                }
              />
            </View>
          ))}

          {/* Income Dropdown */}
          <View style={styles.fieldContainer}>
            <Text style={styles.title}>Income</Text>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={form.income}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, income: value }))
                }
                style={styles.picker}
                dropdownIconColor="#808080"
              >
                <Picker.Item
                  label="Select income"
                  value=""
                  style={styles.placeholderLabel}
                />
                {incomeOptions.map((option) => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Lives in Dropdown */}
          <View style={styles.fieldContainer}>
            <Text style={styles.title}>Current City</Text>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={form.livesin}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, livesin: value }))
                }
                style={styles.picker}
                dropdownIconColor="#808080"
              >
                <Picker.Item
                  label="Select a district"
                  value=""
                  style={styles.placeholderLabel}
                />
                {districts.map((district) => (
                  <Picker.Item
                    key={district}
                    label={district}
                    value={district}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Hometown Dropdown */}
          <View style={styles.fieldContainer}>
            <Text style={styles.title}>Hometown</Text>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={form.hometown}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, hometown: value }))
                }
                style={styles.picker}
                dropdownIconColor="#808080"
              >
                <Picker.Item
                  label="Select a district"
                  value=""
                  style={styles.placeholderLabel}
                />
                {districts.map((district) => (
                  <Picker.Item
                    key={district}
                    label={district}
                    value={district}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Marital Status Dropdown */}
          <View style={styles.fieldContainer}>
            <Text style={styles.title}>Marital Status</Text>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={form.maritalStatus}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, maritalStatus: value }))
                }
                style={styles.picker}
                dropdownIconColor="#808080"
              >
                <Picker.Item
                  label="Select marital status"
                  value=""
                  style={styles.placeholderLabel}
                />
                {maritalStatuses.map((status) => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Family Details */}
          <View style={styles.fieldContainer}>
            <FormField
              title="Family Details"
              value={form.familyDetails}
              placeholder="Describe your family details (e.g. family members, family size, occupations, etc.)"
              handleChangeText={(value) =>
                setForm((prev) => ({ ...prev, familyDetails: value }))
              }
              otherStyles={{ height: 100, textAlignVertical: "top" }}
              multiline={true}
            />
          </View>

          {/* Partner Expectations */}
          <View style={styles.fieldContainer}>
            <FormField
              title="Partner Expectations"
              value={form.partnerExpectations}
              placeholder="Write about your expectations for your partner"
              handleChangeText={(value) =>
                setForm((prev) => ({ ...prev, partnerExpectations: value }))
              }
              otherStyles={{ height: 100, textAlignVertical: "top" }}
              multiline={true}
            />
          </View>
          <TouchableOpacity
            onPress={submit}
            style={[styles.publishBtn, loading && { opacity: 0.6 }]}
            disabled={loading}
          >
            <Text style={styles.publishBtnText}>
              {loading ? "Updating..." : "UPDATE"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1E1E2C",
  },
  scrollView: {
    marginHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "medium",
    color: "#FFFFFF",
    textAlign: "left",
  },
  fieldContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#333333",
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  dropdownContainer: {
    backgroundColor: "#2E2E40",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    color: "#FFFFFF", // Label color for selected value
    fontSize: 16,
    height: 50,
    width: "100%",
  },
  placeholderLabel: {
    color: "#888888", // Light gray for the placeholder
    fontSize: 14,
  },
  publishBtn: {
    backgroundColor: "#FF8C42", // Replace with your desired color
    padding: 12,
    width: "80%",
    marginHorizontal: "10%",
    marginBottom: 50,
    borderRadius: 16,
    alignItems: "center",
  },
  publishBtnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Biodata;
