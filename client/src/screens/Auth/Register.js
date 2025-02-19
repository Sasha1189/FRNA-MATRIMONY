import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import InputBox from "../../components/Common/InputBox";
import SubmitButton from "../../components/SubComp/SubmitButton";
import axios from "axios";

const genders = ["Male", "Female"];

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  //function
  // Register button function..
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password || !gender) {
        Alert.alert("Please fill all fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      //send data to server
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
        gender,
      });
      alert(data && data.message);
      navigation.navigate("Login");
      console.log("Registration data", { name, email, password, gender });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(fasle);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register to our lonari community</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox inputTitle={"Name"} value={name} setValue={setName} />
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
        <Text style={styles.genderTitle}>Gender</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(value) => setGender(value)}
            style={styles.picker}
            dropdownIconColor="#808080"
          >
            <Picker.Item
              label="Select gender"
              value=""
              style={styles.placeholderLabel}
            />
            {genders.map((status) => (
              <Picker.Item key={status} label={status} value={status} />
            ))}
          </Picker>
        </View>
      </View>
      <SubmitButton
        btnTitle={"Register"}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Already registered Please{"  "}
        <Text
          style={styles.link}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          LogIn
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputBox: {
    height: 50,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "#af9f85",
  },
  genderTitle: {
    marginBottom: 10,
  },
  dropdownContainer: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
  },
  picker: {
    color: "#010101", // Label color for selected value
    fontSize: 14,
    height: 50,
    width: "100%",
  },
  placeholderLabel: {
    color: "#888888", // Light gray for the placeholder
    fontSize: 14,
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "red",
  },
});

export default Register;
