// screens/Register.js
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import * as PhoneNumber from "expo-sms-retriever";
import { PhoneAuthProvider } from "firebase/auth";
import { auth } from "../../services/firebase";

const Register = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const recaptchaVerifier = useRef(null);

  const handlePhoneChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(cleaned);
  };

  const sendOtp = async () => {
    const fullPhone = `+91${phone}`; // 🔥 CHANGED: Ensure proper format
    try {
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(
        fullPhone,
        recaptchaVerifier.current
      );
      navigation.navigate("OTPVerify", {
        phone: fullPhone,
        verificationId,
      });
    } catch (err) {
      Alert.alert("Failed to send OTP", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Welcome to Lonari Community</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+91</Text>
          <TextInput
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={handlePhoneChange}
            style={styles.input}
            maxLength={10}
          />
        </View>
        <TouchableOpacity
          onPress={() => sendOtp()}
          style={[
            styles.button,
            { backgroundColor: phone.length === 10 ? "#ffa500" : "#ccc" },
          ]}
          disabled={phone.length !== 10}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <Text style={styles.terms}>
          By continuing, you agree to our Terms & Privacy Policy.
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffef5",
    padding: 24,
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
  },
  inputContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  prefix: {
    fontSize: 16,
    marginRight: 6,
    fontWeight: "bold",
    color: "#333", // 🔥 NEW: Style for +91
    letterSpacing: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    letterSpacing: 3,
  },
  button: {
    height: 50,
    backgroundColor: "#ffa500",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  terms: { fontSize: 12, marginTop: 20, textAlign: "center", color: "#555" },
});

export default Register;
