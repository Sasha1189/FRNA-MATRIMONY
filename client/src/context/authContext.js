import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
  useMemo,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.240.147:8000/api/v1";
const AuthContext = createContext({ user: null });
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const renderCount = useRef(0);
  renderCount.current += 1;

  if (__DEV__) {
    console.log(`AuthContext screen count: ${renderCount.current}`);
  }
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };

// Firebase Auth State listener
// useEffect(() => {
//   const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
//     if (firebaseUser) {
//       const uid = firebaseUser.uid;
//       const phoneNumber = firebaseUser.phoneNumber;
//       const displayName = firebaseUser.displayName;
//       try {
//         const token = await firebaseUser.getIdToken();
//         const genderData = await fetchAndCacheUserData(
//           uid,
//           phoneNumber,
//           displayName
//         );
//         console.log("userData from fn fetchAndCacheUserData :", genderData);
//         const gender = genderData ?? null;
//         setAuthState({
//           user: {
//             uid,
//             phoneNumber,
//             displayName,
//           },
//           token,
//           gender,
//           loading: false,
//         });
//         await AsyncStorage.setItem(`user_${uid}`, JSON.stringify(authState));
//       } catch (err) {
//         console.warn("Auth init error:", err);
//         setAuthState({
//           user: {
//             uid,
//             phoneNumber,
//             displayName,
//           },
//           token,
//           gender: null,
//           loading: false, // prevent infinite loading
//         });
//       }
//     } else {
//       Alert.alert("Soemething went wrong", "Please try again later.");
//       setAuthState({
//         user: {
//           uid: null,
//           phoneNumber: null,
//           displayName: null,
//         },
//         token: null,
//         gender: null,
//         loading: false,
//       });
//     }
//   });
//   return () => unsubscribe();
// }, []);

// Optional: Refresh token every 50 mins
// useEffect(() => {
//   const interval = setInterval(async () => {
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       const token = await currentUser.getIdToken(true);
//       setAuthState((prev) => ({
//         ...prev,
//         token,
//       }));
//     }
//   }, 50 * 60 * 1000);

//   return () => clearInterval(interval);
// }, []);

// Axios interceptor to include token
// useEffect(() => {
//   const interceptor = axios.interceptors.request.use(
//     (config) => {
//       if (authState.token) {
//         config.headers.Authorization = `Bearer ${authState.token}`;
//       } else {
//         delete config.headers.Authorization;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return () => axios.interceptors.request.eject(interceptor);
// }, [authState.token]);

// Logout
// const logout = async () => {
//   try {
//     await auth.signOut();
//   } catch (err) {
//     console.error("Logout error:", err);
//   } finally {
//     setAuthState({
//       user: {
//         uid: null,
//         phoneNumber: null,
//         displayName: null,
//       },
//       token: null,
//       gender: null,
//       loading: false,
//     });
//   }
// };

// Delete Account
// const deleteAccount = async () => {
//   try {
//     const user = auth.currentUser;
//     if (!user) throw new Error("No user signed in.");

//     await deleteDoc(doc(db, "users", user.uid));
//     await deleteUser(user);
//     await storage.ref(`users/${user.uid}`).delete(); // Delete user data from storage
//     await logout();
//   } catch (err) {
//     console.error("Delete account error:", err);
//     if (err.code === "auth/requires-recent-login") {
//       throw new Error("Please re-authenticate to delete your account.");
//     } else {
//       throw new Error(err.message || "Account deletion failed.");
//     }
//   }
// };

// ✅ Update Auth State — supports updating gender or anything else
// const updateAuthState = (updatedFields) => {
//   setAuthState((prev) => ({
//     ...prev,
//     user: {
//       ...prev.user,
//       ...updatedFields,
//     },
//     ...updatedFields,
//   }));
// };
