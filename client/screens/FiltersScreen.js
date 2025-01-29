import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Slider,
  Switch,
  FlatList,
} from "react-native";
// import { CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";

const FiltersScreen = () => {
  const [gender, setGender] = useState({
    Male: false,
    Female: true,
    Nonbinary: false,
  });
  const [ageRange, setAgeRange] = useState([18, 80]);
  const [distance, setDistance] = useState(50);
  const [withinRange, setWithinRange] = useState(false);
  const [languages, setLanguages] = useState(["English", "Spanish"]);
  const availableLanguages = ["English", "Spanish", "French", "German"];

  //   const toggleGender = (key) => {
  //     setGender({ ...gender, [key]: !gender[key] });
  //   };

  const handleClear = () => {
    setGender({ Male: false, Female: false, Nonbinary: false });
    setAgeRange([18, 80]);
    setDistance(50);
    setWithinRange(false);
    setLanguages([]);
  };

  return (
    <View style={styles.container}>
      {/* Gender Selection */}
      <Text style={styles.sectionTitle}>What is your preferred gender?</Text>
      {/* <View style={styles.checkBoxContainer}>
        {Object.keys(gender).map((key) => (
          <CheckBox
            key={key}
            title={key}
            checked={gender[key]}
            onPress={() => toggleGender(key)}
            containerStyle={styles.checkBox}
          />
        ))}
      </View> */}

      {/* Age Range Slider */}
      <Text style={styles.sectionTitle}>Age range:</Text>
      {/* <View style={styles.sliderContainer}>
        <Slider
          style={{ width: "100%" }}
          minimumValue={18}
          maximumValue={80}
          step={1}
          value={ageRange[0]}
          onValueChange={(value) => setAgeRange([value, ageRange[1]])}
        />
        <Slider
          style={{ width: "100%" }}
          minimumValue={18}
          maximumValue={80}
          step={1}
          value={ageRange[1]}
          onValueChange={(value) => setAgeRange([ageRange[0], value])}
        />
        <Text>{`Age: ${ageRange[0]} - ${ageRange[1]}`}</Text>
      </View> */}

      {/* Distance Slider */}
      <Text style={styles.sectionTitle}>Distance:</Text>
      <View style={styles.sliderContainer}>
        {/* <Slider
          style={{ width: "100%" }}
          minimumValue={10}
          maximumValue={80}
          step={1}
          value={distance}
          onValueChange={setDistance}
        />
        <Text>{`${distance} km`}</Text> */}
        <View style={styles.switchContainer}>
          <Text>
            Show profiles within a 15-km range when run out of matches.
          </Text>
          <Switch value={withinRange} onValueChange={setWithinRange} />
        </View>
      </View>

      {/* Languages Dropdown */}
      <Text style={styles.sectionTitle}>Languages:</Text>
      <Picker
        selectedValue={languages[0]}
        onValueChange={(itemValue) =>
          !languages.includes(itemValue) &&
          setLanguages([...languages, itemValue])
        }
      >
        {availableLanguages.map((lang) => (
          <Picker.Item key={lang} label={lang} value={lang} />
        ))}
      </Picker>
      <FlatList
        data={languages}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.language}>{item}</Text>}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => alert("Filters Applied!")}
        >
          <Text style={styles.buttonText}>Apply filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
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
    backgroundColor: "#6200EE",
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
