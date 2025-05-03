import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const fetchAndCacheUserData = async (uid, phoneNumber, displayName) => {
  try {
    // First try cache
    const cached = await AsyncStorage.getItem(`user_${uid}`);
    if (cached) {
      const parced = JSON.parse(cached);
      console.log("Cache hit:", parced);
      if (parced.gender === "male" || parced.gender === "female") return parced;
    }

    // Fallback to API
    const res = await axios.get(`/users/${uid}`);
    console.log(" hit axios res", res.data);
    await AsyncStorage.setItem(`user_${uid}`, JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    // If user not found, create it
    if (
      err.response?.status === 404 &&
      err.response.data?.message === "User not found."
    ) {
      const newUser = { uid, phoneNumber, displayName, gender: null };
      // create on backend
      const crt = await axios.post(`/users/create-user`, newUser);
      const userToCache = crt.data || newUser;
      await AsyncStorage.setItem(`user_${uid}`, JSON.stringify(userToCache));
      return userToCache;
    }
    // other errors bubble up
    console.error("Error fetching user data:", err);
    return null;
  }
};
