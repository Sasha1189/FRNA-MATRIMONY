import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import EmptyList from "../../components/SubComp/EmptyList";
import UserBanner from "../../components/SubComp/UserBanner";
import { ThemeContext } from "../../context/ThemeContext"; // <-- import your ThemeContext

const { height } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.9;
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 2;

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // 1) consume the theme
  const { theme } = useContext(ThemeContext);

  // 2) dynamic style object
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Clear and re-search
  const handleSearch = () => {
    setProfiles([]);
    setHasMore(true);
    searchProfiles(query, true);
  };

  // Function to fetch posts
  const searchProfiles = useCallback(
    async (searchQuery, reset = false) => {
      if (!searchQuery.trim() || loading) return;

      setLoading(true);
      try {
        const response = await axios.get("/profile/search", {
          params: {
            query: searchQuery,
            // page, limit, etc. if needed
          },
        });

        const newProfiles = response.data.profiles || [];

        if (reset) {
          setProfiles(newProfiles);
        } else {
          // if pagination, you might append to `profiles`
          // setProfiles((prev) => [...prev, ...newProfiles]);
        }

        setHasMore(newProfiles.length > 0);
      } catch (error) {
        console.error("🚨 Error getting profiles:", error);
        setError("Failed to fetch results. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  );

  // Infinite scrolling
  const handleEndReached = useCallback(() => {
    if (loading || profiles.length === 0) return;
    // searchProfiles(query);
  }, [loading, profiles.length]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Search Input */}
      <View style={styles.searchInputWrapper}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInput}
            value={query}
            placeholder="Type name, Education or places"
            placeholderTextColor={`${theme.colors.text}80`}
            onChangeText={(text) => setQuery(text)}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Image
              source={require("../../assets/icons/search.png")}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Loader or Results */}
      {loading ? (
        <ActivityIndicator
          size="large"
          style={styles.loader}
          color={theme.colors.primary}
        />
      ) : (
        <FlatList
          data={profiles}
          keyExtractor={(item) =>
            item?.userId?.toString() || Math.random().toString()
          }
          renderItem={({ item }) => <UserBanner item={item} />}
          ListEmptyComponent={<EmptyList title="No Profiles Found" />}
          // onEndReached={handleEndReached}
          // onEndReachedThreshold={0.8}
          // getItemLayout={(_, index) => ({
          //   length: ITEM_HEIGHT,
          //   offset: ITEM_HEIGHT * index,
          //   index,
          // })}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

// 3) dynamic style generator
function createStyles(theme) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    searchInputWrapper: {
      padding: 16,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      height: 54,
      backgroundColor: theme.colors.secondaryBackground,
      borderRadius: 16,
      borderWidth: 0.5,
      borderColor: theme.colors.border,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      marginTop: 2,
      color: theme.colors.text,
      fontFamily: "Poppins-Regular",
    },
    icon: {
      width: 20,
      height: 20,
      tintColor: theme.colors.primary,
    },
    loader: {
      marginTop: 50,
    },
    contentContainer: {
      padding: 10,
    },
  });
}

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   TextInput,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
//   Dimensions,
//   Image,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";
// import EmptyList from "../../components/SubComp/EmptyList";
// import UserBanner from "../../components/SubComp/UserBanner";

// const { height } = Dimensions.get("window");
// const ITEM_HEIGHT = height * 0.9;
// const DEFAULT_PAGE = 1;
// const DEFAULT_LIMIT = 2;

// const SearchScreen = () => {
//   const [query, setQuery] = useState("");
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasMore, setHasMore] = useState(true);
//   // const [page, setPage] = useState(DEFAULT_PAGE);

//   const handleSearch = () => {
//     setProfiles([]); // ✅ Clear previous search results immediately
//     setHasMore(true); // ✅ Reset hasMore to allow new searches
//     searchProfiles(query, true); // ✅ Fetch new results
//   };
//   // Function to fetch posts (memoized to prevent unnecessary re-renders)
//   const searchProfiles = useCallback(
//     async (searchQuery, reset = false) => {
//       if (!searchQuery.trim() || loading) return;

//       setLoading(true);
//       try {
//         // const currentPage = reset ? DEFAULT_PAGE : page;
//         const response = await axios.get("/profile/search", {
//           params: {
//             query: searchQuery,
//             // page: currentPage,
//             // limit: DEFAULT_LIMIT,
//           },
//         });

//         const newProfiles = response.data.profiles || [];

//         if (reset) {
//           setProfiles(newProfiles);
//           // setPage(DEFAULT_PAGE + 1);
//         } else {
//           // setProfiles((prev) => [...prev, ...newProfiles]);
//           // setPage((prev) => prev + 1);
//         }
//         setHasMore(newProfiles.length > 0);
//         // if (newProfiles.length === 0) {
//         //   setHasMore(false);
//         // }
//       } catch (error) {
//         console.error("🚨 Error getting profiles:", error);
//         setError("Failed to fetch results. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [loading, hasMore] // Depends only on `page`, not `query`
//   );

//   // Infinite scrolling
//   const handleEndReached = useCallback(() => {
//     if (loading || profiles.length === 0) return;
//     searchProfiles();
//   }, [loading, profiles.length]);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.searchInputWrapper}>
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={styles.textInput}
//             value={query}
//             placeholder="Type name, Education or places "
//             // placeholderTextColor="#CDCDE0"
//             onChangeText={(text) => setQuery(text)}
//           />
//           <TouchableOpacity onPress={handleSearch}>
//             <Image
//               source={require("../../assets/icons/search.png")}
//               style={styles.icon}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" style={styles.loader} />
//       ) : (
//         <FlatList
//           data={profiles}
//           keyExtractor={(item) => item?.userId.toString()}
//           renderItem={({ item }) => <UserBanner item={item} />}
//           ListEmptyComponent={<EmptyList title="No Profiles Found" />}
//           // onEndReached={handleEndReached}
//           // onEndReachedThreshold={0.8}
//           // getItemLayout={(_, index) => ({
//           //   length: ITEM_HEIGHT,
//           //   offset: ITEM_HEIGHT * index,
//           //   index,
//           // })}
//           initialNumToRender={5}
//           maxToRenderPerBatch={5}
//           windowSize={5}
//           contentContainerStyle={styles.contentContainer}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     // backgroundColor: "#1E1E2C",
//   },
//   searchInputWrapper: {
//     padding: 16,
//     // paddingTop: 16,
//   },
//   contentContainer: {
//     padding: 10,
//     // borderWidth: 1,
//     // borderRadius: 16,
//   },
//   loader: {
//     marginTop: 50,
//     borderRadius: 1,
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     height: 54,
//     backgroundColor: "#CDCDE0" || "#1E1E2D",
//     borderRadius: 16,
//     borderWidth: 0.5,
//     borderColor: "#333",
//   },
//   textInput: {
//     flex: 1,
//     fontSize: 16,
//     marginTop: 2,
//     // color: "#fff",
//     fontFamily: "Poppins-Regular",
//   },
//   icon: {
//     width: 20,
//     height: 20,
//   },
// });

// export default SearchScreen;
