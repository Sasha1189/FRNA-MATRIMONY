import React, { useState, useEffect, useContext, createContext } from "react";
import { onIdTokenChanged} from "firebase/auth";
import { auth } from "../services/firebase";
import axios from "axios";

// Setup Axios base URL once globally
axios.defaults.baseURL = "http://192.168.94.147:8080/api/v1";

// Create context with default fallback
const AuthContext = createContext({
  authState: { user: null, token: null, loading: true },
  logout: () => {},
});

// Custom hook for easy usage
 const useAuth = () => useContext(AuthContext);

// Auth provider component
 const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    loading: true,
  });

   // Setup Axios once
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
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

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [authState.token]);

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        setAuthState({
          user: firebaseUser.uid,
          token,
          loading: false,
        });
      } else {
        setAuthState({
          user: null,
          token: null,
          loading: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

    // Optional: Auto-refresh token every 50 mins
  useEffect(() => {
    const refreshToken = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(true); // force refresh
        setAuthState((prev) => ({
          ...prev,
          token,
        }));
      }
    }, 50 * 60 * 1000);

    return () => clearInterval(refreshToken);
  }, []);

  // Logout Function
  const logout = async () => {
   try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAuthState({
        user: null,
        token: null,
        loading: false,
      })
     delete axios.defaults.headers.common["Authorization"];
    }
  };

  return (
    <AuthContext.Provider value={{ authState, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };

// "https://frna-matrimony-backend-295491417988.asia-south1.run.app/api/v1";