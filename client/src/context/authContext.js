import React, { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import axios from "axios";

//context
const AuthContext = createContext();

//provider
const AuthProvider = ({ children }) => {
  //global state
  const [state, setState] = useState({
    user: null,
    token: "",
  });
  //default axios setting
  axios.defaults.headers.common["Authorization"] = `Bearer ${state?.token}`;
  axios.defaults.baseURL =
    "https://frna-matrimony-backend-295491417988.asia-south1.run.app/api/v1";
  //  "http://192.168.94.147:8080/api/v1";

  //Initial local storage data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setState({ user: user.uid, token });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        setState({ ...state, user: null, token: "" });
        delete axios.defaults.headers.common["Authorization"];
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
