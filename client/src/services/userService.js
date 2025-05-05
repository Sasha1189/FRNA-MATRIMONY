import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const fetchAndCacheUserData = async (uid, phoneNumber, displayName) => {
  try {
    // First try cache
    const cached = await AsyncStorage.getItem(`user_${uid}`);
    if (cached) {
      const parced = JSON.parse(cached);
      console.log("Cache hit", parced);
      if (parced.gender === "male" || parced.gender === "female")
        return parced.gender;
    }
    // Fallback to API
    console.log("Cache miss, fetching from API...");
    const res = await axios.get(`/users/${uid}`);
    console.log(" hit axios res", res.data.gender);
    return res.data.gender;
  } catch (err) {
    // If user not found, create it
    if (
      err.response?.status === 404 &&
      err.response.data?.message === "User not found."
    ) {
      console.log("User not found, creating new user...");
      const newUser = { uid, phoneNumber, displayName };
      // create on backend
      const crt = await axios.post(`/users/create-user`, newUser);
      console.log("Created user:", crt.data.gender);
      const userToCache = crt.data.gender;
      return userToCache;
    }
    // other errors bubble up
    console.error("Error fetching user data:", err);
    return null;
  }
};
