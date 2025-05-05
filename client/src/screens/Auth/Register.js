import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  BackHandler,
  Platform,
  Alert,
  InteractionManager,
} from "react-native";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth } from "../../services/firebase";
import OTPVerify from "./OTPVerify";
// import * as PhoneNumber from "expo-sms-retriever";

const Register = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const inputRef = useRef();

  const renderCount = useRef(0);
  renderCount.current += 1;
  if (__DEV__) {
    console.log(`Register render count: ${renderCount.current}`);
  }

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
      setVerificationId(verificationId);
      // navigation.navigate("OTPVerify", {
      //   phone: fullPhone,
      //   verificationId,
      // });
    } catch (err) {
      Alert.alert("Failed to send OTP", err.message);
    }
  };

  useEffect(() => {
    if (phone.length === 10) {
      Keyboard.dismiss();
      sendOtp();
    }
  }, [phone]);

  return (
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Welcome to Lonari Youth</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+91</Text>
          <TextInput
            placeholder="Enter your phone number"
            keyboardType="number-pad"
            // autoFocus
            value={phone}
            onChangeText={handlePhoneChange}
            style={styles.input}
            maxLength={10}
          />
        </View>

        <OTPVerify verificationId={verificationId} />

        {/* <TouchableOpacity
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
        </Text> */}
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
    letterSpacing: 1,
    color: "#333",
  },
  inputContainer: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    marginBottom: 10,
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
});

export default Register;
