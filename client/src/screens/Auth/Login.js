import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Common/InputBox";
import SubmitButton from "../../components/SubComp/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = ({ navigation }) => {
  //global state
  const [state, setState] = useContext(AuthContext);
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //function
  // Login button function..
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please fill all fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      //send data to server
      const { data } = await axios.post("/auth/login", { email, password });
      //set data to global state
      setState(data);
      //store data to local
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("HomeScreen");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      Alert.alert("Login Error", errorMessage);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
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
      </View>
      <SubmitButton
        btnTitle={"Login"}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Want to be member..Please{"  "}
        <Text
          style={styles.link}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Register
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
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "#af9f85",
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "red",
  },
});
export default Login;

// screens/Register.js to be converted Login screen
// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// // import * as PhoneNumber from "expo-sms-retriever";
// import { PhoneAuthProvider } from "firebase/auth";
// import { auth } from "../../services/firebase";

// const Register = ({ navigation }) => {
//   const [phone, setPhone] = useState("");
//   const recaptchaVerifier = useRef(null);

//   const handlePhoneChange = (text) => {
//     const cleaned = text.replace(/[^0-9]/g, "").slice(0, 10);
//     setPhone(cleaned);
//   };

//   const sendOtp = async () => {
//     const fullPhone = `+91${phone}`; // 🔥 CHANGED: Ensure proper format
//     try {
//       const provider = new PhoneAuthProvider(auth);
//       const verificationId = await provider.verifyPhoneNumber(
//         fullPhone,
//         recaptchaVerifier.current
//       );
//       navigation.navigate("OTPVerify", {
//         phone: fullPhone,
//         verificationId,
//       });
//     } catch (err) {
//       Alert.alert("Failed to send OTP", err.message);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={auth.app.options}
//       />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//       >
//         <Text style={styles.title}>Welcome to Lonari Youth</Text>
//         <View style={styles.inputContainer}>
//           <Text style={styles.prefix}>+91</Text>
//           <TextInput
//             placeholder="Enter your phone number"
//             keyboardType="phone-pad"
//             value={phone}
//             onChangeText={handlePhoneChange}
//             style={styles.input}
//             maxLength={10}
//           />
//         </View>
//         <TouchableOpacity
//           onPress={() => sendOtp()}
//           style={[
//             styles.button,
//             { backgroundColor: phone.length === 10 ? "#ffa500" : "#ccc" },
//           ]}
//           disabled={phone.length !== 10}
//         >
//           <Text style={styles.buttonText}>Continue</Text>
//         </TouchableOpacity>
//         <Text style={styles.terms}>
//           By continuing, you agree to our Terms & Privacy Policy.
//         </Text>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fffef5",
//     padding: 24,
//     justifyContent: "flex-end",
//     borderWidth: 1,
//     borderColor: "#333",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 50,
//     textAlign: "center",
//     letterSpacing: 1,
//     color: "#333",
//   },
//   inputContainer: {
//     height: 50,
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     paddingHorizontal: 12,
//     marginBottom: 20,
//   },
//   prefix: {
//     fontSize: 16,
//     marginRight: 6,
//     fontWeight: "bold",
//     color: "#333", // 🔥 NEW: Style for +91
//     letterSpacing: 1,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     letterSpacing: 3,
//   },
//   button: {
//     height: 50,
//     backgroundColor: "#ffa500",
//     borderRadius: 10,
//     justifyContent: "center",
//   },
//   buttonText: {
//     textAlign: "center",
//     fontSize: 18,
//     color: "#fff",
//     fontWeight: "bold",
//     letterSpacing: 1,
//   },
//   terms: {
//     fontSize: 12,
//     marginTop: 20,
//     textAlign: "center",
//     color: "#555",
//     letterSpacing: 0.5,
//   },
// });

// export default Register;
