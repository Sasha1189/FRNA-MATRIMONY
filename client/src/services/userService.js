import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const fetchAndCacheUserData = async (uid) => {
  try {
    // First try cache
    const cached = await AsyncStorage.getItem(`user_${uid}`);
    const data = JSON.parse(cached);
    console.log("Cached user data:", data);

    if (data && data.gender) return JSON.parse(cached);

    // Fallback to API
    const res = await axios.get(`/users/${uid}`);

    if (!res.data) throw new Error("No user data returned from API");
    console.log("Fetched user data from API:", res.data);

    // Cache it
    await AsyncStorage.setItem(`user_${uid}`, JSON.stringify(res.data));

    return res.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
};
