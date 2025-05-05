import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
  Keyboard,
  ToastAndroid,
  BackHandler,
} from "react-native";
import {
  PhoneAuthProvider,
  signInWithCredential,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../services/firebase";
// import RNSmsRetriever from "react-native-sms-retriever";

const CODE_LENGTH = 6;

const OTPVerify = ({ verificationId }) => {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [verifying, setVerifying] = useState(false);
  // const inputRef = useRef();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     inputRef.current?.focus();
  //   }, 100); // Small delay after screen fully mounts

  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   const timeout = setTimeout(() => setTimer(0), 60000);
  //   const interval = setInterval(() => {
  //     setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //     clearTimeout(timeout);
  //   };
  // }, []);

  useEffect(() => {
    if (code.length === CODE_LENGTH) {
      Keyboard.dismiss();
      verifyCode();
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      setError("");
      setLoading(true);

      if (verifying) return; // Prevent double verify
      setVerifying(true);

      const credential = PhoneAuthProvider.credential(verificationId, code);
      const result = await signInWithCredential(auth, credential);
    } catch (error) {
      console.log("OTP verification error:", error.message);
      handleError(error);
    } finally {
      setLoading(false);
      setVerifying(false);
    }
  };

  // const handleResend = async () => {
  //   try {
  //     setCode("");
  //     setTimer(60);
  //     setError("");
  //     setLoading(true);

  //     // const appVerifier = undefined;

  //     const confirmationResult = await signInWithPhoneNumber(
  //       auth,
  //       phone
  //       // appVerifier
  //     );

  //     if (confirmationResult.verificationId) {
  //       setVerificationId(confirmationResult.verificationId);
  //       setResendMessage("Code sent again!"); // ✨ Set feedback message
  //       setTimeout(() => setResendMessage(""), 5000);
  //     }
  //   } catch (err) {
  //     console.log("Resend OTP error:", err);
  //     Alert.alert("Error", "Failed to resend OTP. Try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleError = (error) => {
    if (error.code === "auth/code-expired") {
      setError("OTP expired. Please resend the code.");
    } else if (error.code === "auth/invalid-verification-code") {
      setError("Invalid OTP. Please try again.");
    } else {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(errorMessage);

      if (Platform.OS === "android") {
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", errorMessage);
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      secs < 10 ? "0" + secs : secs
    }`;
  };

  const handleCodeChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, ""); // ✨ Accept only digits
    setCode(numericText);
  };

  return (
    <View style={styles.container1}>
      <View style={styles.timerOtpinline}>
        {/* <Text style={styles.timer}>{formatTime(timer)}</Text> */}
        <TouchableOpacity
          disabled={timer > 0}
          // onPress={handleResend}
          style={[styles.sendBtn, { opacity: timer > 0 ? 0.4 : 1 }]}
        >
          <Text style={styles.sendText}>Send OTP</Text>
        </TouchableOpacity>
      </View>

      {resendMessage ? (
        <Text style={styles.feedbackText}>{resendMessage}</Text>
      ) : null}

      <TextInput
        // ref={inputRef}
        style={styles.otpInput}
        value={code}
        onChangeText={handleCodeChange}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
        // autoFocus
        selectionColor="#ffa500"
        placeholder="------"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        onPress={() => verifyCode()}
        disabled={code.length !== CODE_LENGTH || !!error}
        style={[
          styles.button,
          {
            // backgroundColor: "#ccc",
            opacity: code.length === CODE_LENGTH && !error ? 1 : 0.5,
          },
        ]}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        By continuing, you agree to our Terms & Privacy Policy.
      </Text>
    </View>
  );
};

export default OTPVerify;

const styles = StyleSheet.create({
  container1: {
    borderWidth: 0,
    borderColor: "#333",
  },
  timerOtpinline: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 10,
  },
  sendBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 5,
  },
  sendText: {
    color: "#ff9800",
    fontSize: 14,
  },
  timer: {
    fontSize: 14,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#ff9800",
  },
  otpInput: {
    height: 45,
    fontSize: 16,
    letterSpacing: 16,
    color: "#000",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },
  feedbackText: {
    textAlign: "center",
    color: "green",
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    height: 45,
    backgroundColor: "#ffa500",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  terms: {
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
    color: "#555",
    letterSpacing: 0.5,
  },
});
