import React, { useState, useEffect, useContext, createContext } from "react";
import { fetchAndCacheUserData } from "../services/userService";
import { onIdTokenChanged, deleteUser } from "firebase/auth";
import { getdoc, doc, deleteDoc } from "firebase/firestore";
import { auth, db, storage } from "../services/firebase";
import axios from "axios";
import safeAsync from "../utils/safeAsync";

axios.defaults.baseURL = "http://192.168.181.147:8000/api/v1";
const AuthContext = createContext({
  authState: {
    user: {
      uid: null,
      phoneNumber: null,
      displayName: null,
    },
    token: null,
    gender: null,
    loading: true,
  },
  logout: () => {},
  deleteAccount: () => {},
  updateAuthState: () => {},
});
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: {
      uid: null,
      phoneNumber: null,
      displayName: null,
    },
    token: null,
    gender: null,
    loading: true,
  });

  // Firebase Auth State listener
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await safeAsync(
            firebaseUser.getIdToken(),
            null,
            "Get Token"
          );

          const uid = firebaseUser.uid;

          const userData = await safeAsync(
            fetchAndCacheUserData(uid),
            null,
            "Fetch User Data"
          );

          const gender = userData?.gender ?? null;

          setAuthState((prev) => ({
            ...prev,
            user: {
              uid,
              phoneNumber: firebaseUser.phoneNumber,
              displayName: firebaseUser.displayName,
            },
            token,
            gender,
            loading: false,
          }));
        } catch (err) {
          console.warn("Auth init error:", err);
          setAuthState({
            user: {
              uid: null,
              phoneNumber: null,
              displayName: null,
            },
            token: null,
            gender: null,
            loading: false, // prevent infinite loading
          });
        }
      } else {
        setAuthState({
          user: {
            uid: null,
            phoneNumber: null,
            displayName: null,
          },
          token: null,
          gender: null,
          loading: false,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Optional: Refresh token every 50 mins
  useEffect(() => {
    const interval = setInterval(async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken(true);
        setAuthState((prev) => ({
          ...prev,
          token,
        }));
      }
    }, 50 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Axios interceptor to include token
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (authState.token) {
          config.headers.Authorization = `Bearer ${authState.token}`;
        } else {
          delete config.headers.Authorization;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, [authState.token]);

  // Logout
  const logout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setAuthState({
        user: {
          uid: null,
          phoneNumber: null,
          displayName: null,
        },
        token: null,
        gender: null,
        loading: false,
      });
    }
  };

  // Delete Account
  const deleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user signed in.");

      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      await storage.ref(`users/${user.uid}`).delete(); // Delete user data from storage
      await logout();
    } catch (err) {
      console.error("Delete account error:", err);
      if (err.code === "auth/requires-recent-login") {
        throw new Error("Please re-authenticate to delete your account.");
      } else {
        throw new Error(err.message || "Account deletion failed.");
      }
    }
  };

  // ✅ Update Auth State — supports updating gender or anything else
  const updateAuthState = (updatedFields) => {
    setAuthState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        ...updatedFields,
      },
      ...updatedFields,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ authState, logout, deleteAccount, updateAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
