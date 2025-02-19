import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import CustomPicker from "../../components/Menus/CustomPicker";
import { useNavigation } from "@react-navigation/native";

const maritalStatuses = ["Single", "Divorced", "Widowed"];
const incomeOptions = ["Less than 10 Lakh", "More than 10 Lakh"];

const DEFAULT_MIN_AGE = 18;
const DEFAULT_MIN_HEIGHT = 4;

const FiltersScreen = () => {
  const [minAge, setMinAge] = useState(DEFAULT_MIN_AGE);
  const [minHeight, setMinHeight] = useState(DEFAULT_MIN_HEIGHT);
  const [incomeIdx, setIncomeIdx] = useState(0);
  const [maritalStatusIdx, setMaritalStatusIdx] = useState(0);
  const navigation = useNavigation();

  const applyFilters = async () => {
    try {
      const income = incomeOptions[incomeIdx];
      const maritalStatus = maritalStatuses[maritalStatusIdx];
      // Navigate to HomeScreen with filterParams
      navigation.navigate("HomeScreen", {
        filterParams: {
          income,
          maritalStatus,
        },
      });
    } catch (error) {
      Alert.alert("Error", "Failed to apply filters");
    }
  };

  const clearFilters = () => {
    // ✅ Navigate to HomeScreen with no filterParams
    navigation.navigate("HomeScreen", { filterParams: null });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Set filter here...</Text>
      </View>
      <View style={styles.container}>
        {/* Age Slider */}
        <Text style={styles.sectionTitle}>Select Minimum Age:</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={{ width: "100%" }}
            minimumValue={18}
            maximumValue={30}
            step={1}
            value={minAge}
            onValueChange={(value) => setMinAge(value)}
          />
          <Text>{`Minimum Age: ${minAge} Years selected`}</Text>
        </View>

        {/* Height Slider */}
        <Text style={styles.sectionTitle}>Select minimum height:</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={{ width: "100%" }}
            minimumValue={4}
            maximumValue={6}
            step={0.5}
            value={minHeight}
            onValueChange={(value) => setMinHeight(value)}
          />
          <Text>{`Minimum height: ${minHeight} Feet selected`}</Text>
        </View>

        {/* Income picker */}
        <CustomPicker
          label="Income"
          data={incomeOptions}
          currentIndex={incomeIdx}
          onSelected={setIncomeIdx}
        />
        <CustomPicker
          label="Marital Status"
          data={maritalStatuses}
          currentIndex={maritalStatusIdx}
          onSelected={setMaritalStatusIdx}
        />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.buttonText}>Clear all</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.buttonText}>Apply filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    margin: 16,
    marginTop: 40,
    padding: 10,
    // borderWidth: 0.5,
    // borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderRadius: 10,
  },

  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "medium",
    textAlign: "justify",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  checkBox: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  language: {
    fontSize: 16,
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    flex: 0.45,
    alignItems: "center",
  },
  applyButton: {
    backgroundColor: "#07A6FF",
    padding: 15,
    borderRadius: 10,
    flex: 0.45,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FiltersScreen;
