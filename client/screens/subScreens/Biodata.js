import { useState } from "react";
import { View, Text, Alert, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import FormField from "../../components/Forms/FormField";
import SubmitButton from "../../components/Forms/SubmitButton";

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
    work: "",
    education: "",
    livesin: "",
    hometown: "",
    hobies: "",
    height: "",
    maritalStatus: "",
    income: "",
    familyDetails: "",
    partnerExpectations: "",
  });

  const saveBiodataToLocal = async (form) => {
    setLoading(true);
    const isEmptyField = Object.values(form).some((value) => !value);
    if (isEmptyField) {
      setLoading(false);
      return Alert.alert("Error", "Please fill out all fields.");
    }

    try {
      await AsyncStorage.setItem("storedBiodata", JSON.stringify(form));
      Alert.alert("Success", "Biodata saved to local storage!");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to save biodata.");
      console.error(error);
    } finally {
      setLoading(false);
      setForm({
        fullname: "",
        aboutme: "",
        work: "",
        education: "",
        livesin: "",
        hometown: "",
        hobies: "",
        height: "",
        maritalStatus: "",
        income: "",
        familyDetails: "",
        partnerExpectations: "",
      });
    }
  };

  const submit = async () => {
    const isEmptyField = Object.values(form).some((value) => !value);
    if (isEmptyField) {
      return Alert.alert("Error", "Please fill out all fields.");
    }

    try {
      // Example API call
      await createVideoPost({
        ...form,
        // userId: user.$id, // Assuming user context is available
      });

      Alert.alert("Success", "Profile updated successfully!");
      // router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        fullname: "",
        work: "",
        education: "",
        livesin: "",
        hometown: "",
        aboutme: "",
        hobies: "",
        height: "",
        maritalStatus: "",
        income: "",
        familyDetails: "",
        partnerExpectations: "",
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
              handleChangeText={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [field.value]: e,
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
                <Picker.Item key={district} label={district} value={district} />
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
                <Picker.Item key={district} label={district} value={district} />
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
            handleChangeText={(e) =>
              setForm((prev) => ({ ...prev, familyDetails: e }))
            }
            otherStyles={{ height: 100 }}
            multiline={true}
          />
        </View>

        {/* Partner Expectations */}
        <View style={styles.fieldContainer}>
          <FormField
            title="Partner Expectations"
            value={form.partnerExpectations}
            placeholder="Write about your expectations for your partner (e.g., qualities, profession, etc.)"
            handleChangeText={(e) =>
              setForm((prev) => ({ ...prev, partnerExpectations: e }))
            }
            otherStyles={{ height: 100 }}
            multiline={true}
          />
        </View>

        <SubmitButton
          btnTitle="Publish"
          handlePress={saveBiodataToLocal}
          // containerStyles={styles.submitButton}
          // loading={loading}
        />
      </ScrollView>
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
  submitButton: {
    marginTop: 24,
    alignSelf: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#FF8C42",
    borderRadius: 30,
    borderWidth: 2,
    // borderColor: "#A6A6C1",
  },
  submitBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Biodata;
