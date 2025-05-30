import React, { useState, useEffect, useContext, useMemo } from "react";
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
import { useAuth } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import IconButton from "../../components/SubComp/IconButton";
import FormField from "../../components/Common/FormField";
import { ThemeContext } from "../../context/ThemeContext"; // <--- import your ThemeContext

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

const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

const Biodata = () => {
  const [loading, setLoading] = useState(false);
  const { authState } = useAuth();
  const [form, setForm] = useState({
    uid: authState.user || "",
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
    gender: "", // <--- Added
    dob: "",
  });

  // 1) Get the theme from context
  const { theme } = useContext(ThemeContext);
  // 2) Create a dynamic StyleSheet that depends on `theme`
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Utility to filter data
  const filterProfileData = (profileData) => ({
    uid: profileData.uid || authState.user,
    fullname: profileData.fullname || "",
    aboutme: profileData.aboutme || "",
    education: profileData.education || "",
    work: profileData.work || "",
    height: profileData.height || "",
    livesin: profileData.livesin || "",
    hometown: profileData.hometown || "",
    income: profileData.income || "",
    hobbies: profileData.hobbies || [],
    maritalStatus: profileData.maritalStatus || "",
    familyDetails: profileData.familyDetails || "",
    partnerExpectations: profileData.partnerExpectations || "",
    gender: profileData.gender || "", // <-- added
    dob: profileData.dob || "",
  });

  // Load local or server biodata
  useEffect(() => {
    const loadBiodata = async () => {
      try {
        const storedBiodata = await AsyncStorage.getItem("storedBiodata");
        if (storedBiodata) {
          const parsedData = JSON.parse(storedBiodata);
          if (parsedData && parsedData._id) {
            setForm(filterProfileData(parsedData));
            return;
          }
        }
        // If no valid local data, fetch from server
        const { data } = await axios.get("/profile/myprofile");
        if (data?.currentUserProfile) {
          const filteredProfile = filterProfileData(data.currentUserProfile);
          setForm(filteredProfile);
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { data } = await axios.post("/profiles/update-profile", form);
      const { userData } = await axios.post("/users/", form.gender);
      if (data?.status !== "success") {
        Alert.alert("Error", data?.message || "Update failed.");
        return;
      }
      // setForm(data);
      // await saveBiodataToLocal();
      Alert.alert("Success", "Biodata updated successfully!");
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Update failed.");
    } finally {
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
            style={{ elevation: 0, height: 50, width: 50, borderWidth: 0 }}
          />

          <Text style={styles.headerTitle}>BIODATA</Text>
          <Text style={{ height: 50, width: 50 }} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.contentHeader}>
              <Text style={styles.contentHeaderText}>
                Update your biodata here...
              </Text>
            </View>

            {/* Text Fields */}
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

            <View style={styles.fieldContainer}>
              <Text style={styles.title}>Gender</Text>
              <View style={styles.dropdownContainer}>
                <Picker
                  selectedValue={form.gender}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, gender: value }))
                  }
                  style={styles.picker}
                  dropdownIconColor="#808080"
                >
                  <Picker.Item
                    label="Select gender"
                    value=""
                    style={styles.placeholderLabel}
                  />
                  <Picker.Item
                    label="Male"
                    value="Male"
                    style={styles.placeholderLabel}
                  />
                  <Picker.Item
                    label="Female"
                    value="Female"
                    style={styles.placeholderLabel}
                  />
                </Picker>
              </View>
            </View>

            {/* Date of Birth Field */}
            <View style={styles.fieldContainer}>
              <FormField
                title="Date of Birth"
                value={form.dob}
                placeholder="YYYY-MM-DD"
                handleChangeText={(value) =>
                  setForm((prev) => ({ ...prev, dob: value }))
                }
                keyboardType="default"
              />
            </View>

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
                    <Picker.Item
                      key={option}
                      label={option}
                      value={option}
                      style={styles.placeholderLabel}
                    />
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
                      style={styles.placeholderLabel}
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
                      style={styles.placeholderLabel}
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
                    <Picker.Item
                      key={status}
                      label={status}
                      value={status}
                      style={styles.placeholderLabel}
                    />
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
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={submit}
          style={[styles.publishBtn, loading && { opacity: 0.6 }]}
          disabled={loading}
        >
          <Text style={styles.publishBtnText}>
            {loading ? "Updating..." : "UPDATE"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Biodata;

// 3) The dynamic style generator
function createStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background, // from theme
    },
    header: {
      justifyContent: "flex-start",
      padding: 2,
      borderBottomWidth: 0.5,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.secondaryBackground, // from theme
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      letterSpacing: 2,
      color: theme.colors.primary, // e.g. highlight color
    },
    contentContainer: {
      flex: 1,
      margin: 5,
      overflow: "hidden",
    },
    scrollView: {
      marginHorizontal: 16,
      paddingVertical: 24,
    },
    contentHeader: {
      marginBottom: 16,
    },
    contentHeaderText: {
      fontSize: 18,
      textAlign: "left",
      color: theme.colors.text, // from theme
    },
    fieldContainer: {
      marginBottom: 16,
      padding: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 8,
      color: theme.colors.text,
    },
    dropdownContainer: {
      color: theme.colors.text,
      backgroundColor: theme.colors.secondaryBackground,
      borderRadius: 8,
      overflow: "hidden",
      borderWidth: 1,
    },
    picker: {
      fontSize: 16,
      height: 50,
      width: "100%",
      backgroundColor: theme.colors.secondaryBackground,
      color: theme.colors.text,
    },
    placeholderLabel: {
      fontSize: 14,
      color: theme.colors.text,
      backgroundColor: theme.colors.secondaryBackground,
    },
    footer: {
      justifyContent: "flex-end",
      backgroundColor: theme.colors.secondaryBackground,
    },
    publishBtn: {
      backgroundColor: theme.colors.primary, //if you prefer
      padding: 10,
      width: "80%",
      marginHorizontal: "10%",
      marginVertical: 8,
      borderRadius: 16,
      alignItems: "center",
    },
    publishBtnText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "600",
      letterSpacing: 0.5,
    },
  });
}
