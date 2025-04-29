import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  TextInput,
  Platform,
  Keyboard,
  ToastAndroid,
  BackHandler,
} from "react-native";
import {
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { useAuth } from "../../context/authContext";
import axios from "axios";
// import RNSmsRetriever from "react-native-sms-retriever";

const CODE_LENGTH = 6;

const OTPVerify = ({ route, navigation }) => {
  const { verificationId:initialVerificationId, phone } = route.params;
  const { authState } = useAuth();

  const [verificationId, setVerificationId] = useState(initialVerificationId)
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [verifying, setVerifying] = useState(false);

  const inputRef = useRef();

  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (timer > 0) return true;
        return false;
      }
    );
    return () => backHandler.remove();
  }, [timer]);

  useEffect(() => {
    const timeout = setTimeout(() => setTimer(0), 60000);
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (code.length === CODE_LENGTH) {
      Keyboard.dismiss();
      verifyCode();
    }
  }, [code]);

  useEffect(() => {
    if (authState.user) {
      navigation.replace("HomeScreen");
    }
  }, [authState.user]);

  const verifyCode = async () => {
    try {
      setError("");
      setLoading(true);

       if (verifying) return; // Prevent double verify
        setVerifying(true);

      const credential = PhoneAuthProvider.credential(verificationId, code);
      const result = await signInWithCredential(auth, credential);
      
      console.log("Verified User:",result?.user);

      const { uid, phoneNumber } = result?.user;
      const token = await result?.user?.getIdToken();

    try {
    await axios.post("/users/create-user", { uid, phoneNumber, token });
    navigation.replace("HomeScreen");
    } catch (apiError) {
    console.error("API error:", apiError);
    handleError(apiError);  // show user-friendly error
    }

    } catch (error) {
      console.log("OTP verification error:", error.message);
      handleError(error)
    } finally {
      setLoading(false);
      setVerifying(false)
    }
  };

  const handleResend = async () => {
    try {
      setCode("");
      setTimer(60);
      setError("");
      setLoading(true);

      const appVerifier = undefined;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );

      if (confirmationResult.verificationId) {
        setVerificationId(confirmationResult.verificationId);
        setResendMessage("Code sent again!"); // ✨ Set feedback message
        setTimeout(() => setResendMessage(""), 5000);
      }
    } catch (err) {
      console.log("Resend OTP error:", err);
      Alert.alert("Error", "Failed to resend OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.code === "auth/code-expired") {
      setError("OTP expired. Please resend the code.");
    } else if (error.code === "auth/invalid-verification-code") {
      setError("Invalid OTP. Please try again.");
    } else {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {timer === 0 && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text>BackButton</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.timer}>{formatTime(timer)}</Text>
      <Text style={styles.desc}>Enter the 6-digit code we sent to {phone}</Text>

      {resendMessage ? (
        <Text style={styles.feedbackText}>{resendMessage}</Text>
      ) : null}

      {/* 🟡 Replaced custom hidden input with visible OS keyboard-supported input */}
      <TextInput
        ref={inputRef}
        style={styles.visibleInput}
        value={code}
        onChangeText={handleCodeChange}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        maxLength={6}
        autoFocus
      />

      <TouchableOpacity
        style={styles.otpBoxesContainer}
        onPress={() => inputRef.current.focus()}
        activeOpacity={1}
      >
        {[...Array(CODE_LENGTH)].map((_, i) => (
          <View key={i} style={styles.box}>
            <Text style={styles.boxText}>{code[i] || ""}</Text>
          </View>
        ))}
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#ff9800"
          style={{ marginBottom: 20 }}
        />
      )}

      <TouchableOpacity
        disabled={timer > 0}
        onPress={handleResend}
        style={[styles.resendBtn, { opacity: timer > 0 ? 0.4 : 1 }]}
      >
        <Text style={styles.resendText}>Resend Code</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.doneBtn,
          { opacity: code.length === CODE_LENGTH ? 1 : 0.5 },
        ]}
        disabled={code.length !== CODE_LENGTH}
        onPress={verifyCode}
      >
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OTPVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 24,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    elevation: 3,
  },
  timer: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginBottom: 12,
  },
  desc: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 24,
    fontWeight: "500",
  },
  visibleInput: {
    position: "absolute",
    opacity: 0,
    height: 50,
    width: "100%",
  },
  otpBoxesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 16,
  },
  box: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ffc107",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  boxText: {
    fontSize: 22,
    color: "#333",
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
  resendBtn: {
    marginTop: 20,
    alignSelf: "center",
  },
  resendText: {
    color: "#ff9800",
    fontSize: 16,
  },
  doneBtn: {
    height: 50,
    backgroundColor: "#ffa500",
    borderRadius: 10,
    justifyContent: "center",
  },
  doneText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
