// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import { PhoneAuthProvider } from "firebase/auth";
// import { auth } from "../../services/firebase";
// // import styles from "./registerStyles";

// const Register = ({ navigation }) => {
//   const [phone, setPhone] = useState("");
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [birthDate, setBirthDate] = useState(null);

//   const [user, setUser] = useState({
//     uid: "",
//     phoneNumber: "",
//     gender: "",
//     name: "",
//     birthdate: "",
//     isOnline: false,
//     isVerified: false,
//     isBlocked: false,
//     isPremium: false,
//   });

//   const [errors, setErrors] = useState({});
//   const recaptchaVerifier = useRef(null);

//   const handlePhoneChange = (text) => {
//     const cleaned = text.replace(/[^0-9]/g, "").slice(0, 10);
//     setPhone(cleaned);
//     if (cleaned.length === 10) {
//       setErrors((prev) => ({ ...prev, phone: "" }));
//     }
//   };

//   const validateFields = () => {
//     const newErrors = {};
//     if (!user.name.trim()) newErrors.name = "Name is required";
//     if (!user.gender) newErrors.gender = "Please select gender";
//     if (!user.birthdate) newErrors.birthdate = "Birthdate is required";
//     if (phone.length !== 10) newErrors.phone = "Enter valid 10-digit number";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const sendOtp = async () => {
//     if (!validateFields()) return;

//     const fullPhone = `+91${phone}`;
//     try {
//       const provider = new PhoneAuthProvider(auth);
//       const verificationId = await provider.verifyPhoneNumber(
//         fullPhone,
//         recaptchaVerifier.current
//       );
//       navigation.navigate("OTPVerify", {
//         phone: fullPhone,
//         verificationId,
//         user: { ...user, phoneNumber: fullPhone },
//       });
//     } catch (err) {
//       Alert.alert("Failed to send OTP", err.message);
//     }
//   };

//   const onDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setBirthDate(selectedDate);
//       setUser({ ...user, birthdate: selectedDate.toISOString().split("T")[0] });
//       setErrors((prev) => ({ ...prev, birthdate: "" }));
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

//         {/* Name */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.prefix}>Name :</Text>
//           <TextInput
//             placeholder="Enter your name"
//             value={user.name}
//             onChangeText={(text) => {
//               setUser({ ...user, name: text });
//               if (text.trim()) setErrors((prev) => ({ ...prev, name: "" }));
//             }}
//             style={styles.input}
//             maxLength={30}
//           />
//         </View>
//         {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

//         {/* Gender */}
//         <Text style={[styles.prefix, { marginBottom: 6 }]}>Gender :</Text>
//         <View style={styles.genderRow}>
//           {["Male", "Female"].map((g) => (
//             <TouchableOpacity
//               key={g}
//               onPress={() => {
//                 setUser({ ...user, gender: g });
//                 setErrors((prev) => ({ ...prev, gender: "" }));
//               }}
//               style={[
//                 styles.genderButton,
//                 user.gender === g && styles.genderButtonSelected,
//               ]}
//             >
//               <Text style={{ color: user.gender === g ? "#fff" : "#000" }}>
//                 {g}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//         {errors.gender ? (
//           <Text style={styles.error}>{errors.gender}</Text>
//         ) : null}

//         {/* Birthdate */}
//         <TouchableOpacity
//           onPress={() => setShowDatePicker(true)}
//           style={styles.inputContainer}
//         >
//           <Text style={styles.prefix}>Birthdate :</Text>
//           <Text style={{ color: user.birthdate ? "#000" : "#aaa" }}>
//             {user.birthdate || "Select date"}
//           </Text>
//         </TouchableOpacity>
//         {errors.birthdate ? (
//           <Text style={styles.error}>{errors.birthdate}</Text>
//         ) : null}

//         {showDatePicker && (
//           <DateTimePicker
//             value={birthDate || new Date(2000, 0, 1)}
//             mode="date"
//             display="default"
//             maximumDate={new Date()}
//             onChange={onDateChange}
//           />
//         )}

//         {/* Phone */}
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
//         {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}

//         <TouchableOpacity
//           onPress={sendOtp}
//           style={[
//             styles.button,
//             {
//               backgroundColor:
//                 !user.name ||
//                 !user.gender ||
//                 !user.birthdate ||
//                 phone.length !== 10
//                   ? "#ccc"
//                   : "#ffa500",
//             },
//           ]}
//           disabled={
//             !user.name || !user.gender || !user.birthdate || phone.length !== 10
//           }
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
//   error: {
//     color: "#e60000",
//     fontSize: 12,
//     marginBottom: 10,
//     marginLeft: 4,
//   },
// });

// export default Register;

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
  // const [user, setUser] = useState({
  //   uid: "",
  //   phoneNumber: "",
  //   gender: "",
  //   name: "",
  //   age: "",
  //   isOnline: false,
  //   isVerified: false,
  //   isBlocked: false,
  //   isPremium: false,
  // });
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
        <Text style={styles.title}>Welcome to Lonari Youth</Text>

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
    letterSpacing: 1,
    color: "#333",
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
    letterSpacing: 1,
  },
  terms: {
    fontSize: 12,
    marginTop: 20,
    textAlign: "center",
    color: "#555",
    letterSpacing: 0.5,
  },
});

export default Register;
