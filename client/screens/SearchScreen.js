import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import EmptyList from "../components/SubComp/EmptyList";
import UserBanner from "../components/SubComp/UserBanner";

const { height } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.9;
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  // const [page, setPage] = useState(DEFAULT_PAGE);

  // Function to fetch posts (memoized to prevent unnecessary re-renders)
  const searchProfiles = useCallback(
    async (searchQuery, reset = false) => {
      if (!query.trim() || loading || !hasMore) return;

      setLoading(true);
      try {
        // const currentPage = reset ? DEFAULT_PAGE : page;
        const response = await axios.get("/profile/search", {
          params: {
            query: searchQuery,
            // page: currentPage,
            // limit: DEFAULT_LIMIT,
          },
        });

        const newProfiles = response.data.profiles || [];

        if (reset) {
          setProfiles(newProfiles);
          // setPage(DEFAULT_PAGE + 1);
        } else {
          // setProfiles((prev) => [...prev, ...newProfiles]);
          // setPage((prev) => prev + 1);
        }
        if (newProfiles.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("🚨 Error getting profiles:", error);
        setError("Failed to fetch results. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore] // Depends only on `page`, not `query`
  );

  // Handle search manually (not in `useEffect`)
  const handleSearch = () => {
    // setPage(DEFAULT_PAGE);
    setProfiles([]);
    setHasMore(true);
    searchProfiles(query, true);
  };

  // Infinite scrolling
  // const handleEndReached = useCallback(() => {
  //   if (loading || profiles.length === 0) return;
  //   searchProfiles();
  // }, [loading, profiles.length]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchInputWrapper}>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            value={query}
            placeholder="Search a name"
            // placeholderTextColor="#CDCDE0"
            onChangeText={(text) => setQuery(text)}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.iconBorder}>
            <Image
              source={require("../assets/icons/search.png")}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={profiles}
          keyExtractor={(item) => item?.userId.toString()}
          renderItem={({ item }) => <UserBanner item={item} />}
          ListEmptyComponent={<EmptyList title="No Profiles Found" />}
          // onEndReached={handleEndReached}
          // onEndReachedThreshold={0.8}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "#1E1E2C",
  },
  searchInputWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  loader: {
    marginTop: 50,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 54,
    backgroundColor: "#CDCDE0" || "#1E1E2D",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#333",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginTop: 2,
    // color: "#fff",
    fontFamily: "Poppins-Regular",
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconBorder: {
    borderRadius: 1,
    borderColor: "#07A6FF",
  },
});

export default SearchScreen;

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   Dimensions,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import SearchInput from "../components/SubComp/SearchInput";
// import EmptyState from "../components/SubComp/SearchInput";
// import VideoCard from "../components/SubComp/SearchInput";
// import EmptyList from "../components/SubComp/EmptyList";

// const { height, width } = Dimensions.get("window");
// const ITEM_HEIGHT = height * 0.9; // Fixed item height
// const DEFAULT_PAGE = 1;
// const DEFAULT_LIMIT = 20;

// const SearchScreen = () => {
//   // Local state for query and fetched profiles
//   const [query, setQuery] = useState("");
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(DEFAULT_PAGE);
//   const navigation = useNavigation();

//   // Axios function to fetch posts with pagination
//   const searchProfiles = async (searchQuery) => {
//     if (!query.trim()) {
//       setProfiles([]);
//       return;
//     }
//     console.log("searchposts called");
//     setLoading(true);
//     try {
//       const response = await axios.get("/profile/search", {
//         params: { query: searchQuery },
//       });
//       setProfiles(response?.data?.profiles || []);
//       return response.data;
//     } catch (error) {
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch posts: if reset=true, replace profiles; otherwise, append to list
//   // const fetchPosts = useCallback(
//   //   async (reset = false) => {
//   //     console.log("fetchposts called 1", query);
//   //     // Prevent an API call if the query is empty
//   //     if (!query.trim()) {
//   //       setProfiles([]);
//   //       return;
//   //     }
//   //     console.log("fetchposts called 2");
//   //     setLoading(true);
//   //     try {
//   //       const currentPage = reset ? DEFAULT_PAGE : page;
//   //       const data = await searchPosts(query, currentPage, DEFAULT_LIMIT);
//   //       if (reset) {
//   //         setProfiles(data.posts || []);
//   //         setPage(DEFAULT_PAGE + 1);
//   //       } else {
//   //         setProfiles((prev) => [...prev, ...(data.posts || [])]);
//   //         setPage((prev) => prev + 1);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching posts:", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   },
//   //   [page]
//   // );

//   // Refetch posts when the query changes (only if query is non-empty)
//   // useEffect(() => {
//   //   if (!query.trim()) {
//   //     setProfiles([]);
//   //     return;
//   //   }
//   //   setPage(DEFAULT_PAGE);
//   //   fetchPosts(true);
//   // }, []);

//   // Infinite scrolling: load more posts when reaching the end
//   // const handleEndReached = useCallback(() => {
//   //   if (!loading) {
//   //     fetchPosts();
//   //   }
//   // }, [loading, fetchPosts]);

//   // Memoize renderItem for performance
//   const renderItem = useCallback(
//     ({ item }) => {
//       const onPressProfile = () => {
//         navigation.navigate("ProfileDetail", { profile: item.profile });
//       };
//       return <VideoCard item={item} onPress={onPressProfile} />;
//     },
//     [navigation]
//   );

//   // Memoize keyExtractor
//   const keyExtractor = useCallback((item) => item.$id.toString(), []);

//   // Use getItemLayout for fixed-height items to speed up rendering
//   const getItemLayout = useCallback(
//     (_, index) => ({
//       length: ITEM_HEIGHT,
//       offset: ITEM_HEIGHT * index,
//       index,
//     }),
//     []
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.searchInputWrapper}>
//         <SearchInput
//           query={query}
//           setQuery={setQuery}
//           handleSearch={searchProfiles}
//         />
//       </View>
//       {loading ? (
//         <ActivityIndicator size="large" color="#fff" style={styles.loader} />
//       ) : (
//         <FlatList
//           data={profiles}
//           keyExtractor={keyExtractor}
//           renderItem={renderItem}
//           ListHeaderComponent={
//             <View style={styles.headerContainer}>
//               <Text style={styles.searchResultLabel}>Search Results..</Text>
//             </View>
//           }
//           ListEmptyComponent={<EmptyList title="No Profiles Found" />}
//           // onEndReached={handleEndReached}
//           onEndReachedThreshold={0.5}
//           getItemLayout={getItemLayout}
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
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   headerContainer: {
//     marginVertical: 24,
//     paddingHorizontal: 16,
//   },
//   searchResultLabel: {
//     fontSize: 14,
//     fontWeight: "500",
//     // color: "#CDCDE0",
//   },
//   searchQueryText: {
//     fontSize: 24,
//     fontWeight: "600",
//     // color: "#FFFFFF",
//     marginTop: 4,
//   },
//   contentContainer: {
//     paddingBottom: 80,
//   },
//   loader: {
//     marginTop: 20,
//   },
// });

// export default SearchScreen;

// // import React, { useEffect, useCallback } from "react";
// // import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { useNavigation, useRoute } from "@react-navigation/native";
// // import axios from "axios";
// // import { EmptyState, SearchInput } from "../../components";

// // const DEFAULT_PAGE = 1;
// // const DEFAULT_LIMIT = 20;
// // const { height } = Dimensions.get("window");
// // const ITEM_HEIGHT = height * 0.9; // adjust as per your design

// // const SearchScreen = () => {
// //   const route = useRoute();
// //   const { query } = route.params;
// //   const navigation = useNavigation();

// //   // STATE: profiles & loading
// //   const [profiles, setProfiles] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [page, setPage] = useState(DEFAULT_PAGE);

// //   const searchPosts = async (
// //     searchQuery,
// //     page = DEFAULT_PAGE,
// //     limit = DEFAULT_LIMIT
// //   ) => {
// //     try {
// //       const response = await axios.get("/profiles/search", {
// //         params: {
// //           query: searchQuery,
// //           page,
// //           limit,
// //         },
// //       });
// //       return response.data;
// //     } catch (error) {
// //       // You can enhance error handling here if needed.
// //       throw error;
// //     }
// //   };

// //   const fetchPosts = useCallback(
// //     async (reset = false) => {
// //       try {
// //         setLoading(true);
// //         const currentPage = reset ? DEFAULT_PAGE : page;
// //         const data = await searchPosts(query, currentPage, DEFAULT_LIMIT);
// //         if (reset) {
// //           setProfiles(data.posts || []);
// //           setPage(DEFAULT_PAGE + 1);
// //         } else {
// //           setProfiles((prev) => [...prev, ...(data.posts || [])]);
// //           setPage((prev) => prev + 1);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching posts:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     },
// //     [query, page]
// //   );

// //   // When query changes, refetch the data.
// //   useEffect(() => {
// //     setPage(DEFAULT_PAGE);
// //     fetchPosts(true);
// //   }, [query, fetchPosts]);

// //   // Infinite scrolling: load more posts when reaching the end.
// //   const handleEndReached = useCallback(() => {
// //     if (!loading) {
// //       fetchPosts();
// //     }
// //   }, [loading, fetchPosts]);

// //   // Memoized renderItem for performance
// //   // const renderItem = useCallback(
// //   //   ({ item }) => {
// //   //     const onPressProfile = () => {
// //   //       navigation.navigate("ProfileDetail", { profile: item.profile });
// //   //     };
// //   //     return <VideoCard item={item} onPress={onPressProfile} />;
// //   //   },
// //   //   [navigation]
// //   // );

// //   const renderItem = useCallback(
// //     ({ item }) => {
// //       const onPressProfile = () => {
// //         navigation.navigate("ProfileDetail", { profile: item.profile });
// //       };

// //       return (
// //         <TouchableOpacity style={styles.profileItem} onPress={onPressProfile}>
// //           <Image
// //             source={{ uri: item.image?.imageUrls?.[0] }} // CHANGE: Adjust based on your data
// //             style={styles.profileImage}
// //           />
// //           <View style={styles.profileInfo}>
// //             <Text style={styles.profileName}>
// //               {item.profile?.fullname || "Not Provided"}
// //             </Text>
// //             <Text style={styles.profileDetails}>
// //               {item.profile?.age ? item.profile.age + " yrs, " : ""}
// //               {item.profile?.education || "No Education Info"}
// //             </Text>
// //           </View>
// //         </TouchableOpacity>
// //       );
// //     },
// //     [navigation]
// //   );

// //   // --- Memoized keyExtractor
// //   const keyExtractor = useCallback((item) => item.$id.toString(), []);

// //   const getItemLayout = useCallback(
// //     (data, index) => ({
// //       length: ITEM_HEIGHT,
// //       offset: ITEM_HEIGHT * index,
// //       index,
// //     }),
// //     []
// //   );

// //   if (loading) {
// //     return (
// //       <SafeAreaView style={styles.safeArea}>
// //         <ActivityIndicator size="large" color="#fff" />
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <SafeAreaView style={styles.safeArea}>
// //       <FlatList
// //         data={profiles}
// //         keyExtractor={keyExtractor}
// //         renderItem={renderItem}
// //         ListHeaderComponent={
// //           <View style={styles.headerContainer}>
// //             <Text style={styles.searchResultLabel}>Search Results</Text>
// //             <Text style={styles.searchQueryText}>{query}</Text>
// //             <View style={styles.searchInputContainer}>
// //               <SearchInput
// //                 initialQuery={query}
// //                 refetch={() => fetchPosts(true)}
// //               />
// //             </View>
// //           </View>
// //         }
// //         ListEmptyComponent={
// //           loading ? (
// //             <ActivityIndicator size="large" color="#fff" />
// //           ) : (
// //             <EmptyState
// //               title="No Profiles Found"
// //               subtitle="No profiles found for this search query"
// //             />
// //           )
// //         }
// //         onEndReached={handleEndReached}
// //         onEndReachedThreshold={0.5}
// //         getItemLayout={getItemLayout}
// //         initialNumToRender={5}
// //         maxToRenderPerBatch={5}
// //         windowSize={5}
// //         contentContainerStyle={styles.contentContainer}
// //       />
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   // safeArea: {
// //   //   flex: 1,
// //   //   backgroundColor: "#1E1E2C", // Example primary background color
// //   // },
// //   // headerContainer: {
// //   //   marginVertical: 24, // Equivalent to my-6 and mt-6 mb-8
// //   //   paddingHorizontal: 16, // Equivalent to px-4
// //   // },
// //   // searchResultLabel: {
// //   //   fontSize: 14,
// //   //   fontWeight: "500",
// //   //   color: "#CDCDE0", // Light gray for labels
// //   // },
// //   // searchQueryText: {
// //   //   fontSize: 24,
// //   //   fontWeight: "600",
// //   //   color: "#FFFFFF",
// //   //   marginTop: 4,
// //   // },
// //   // searchInputContainer: {
// //   //   marginTop: 24,
// //   //   marginBottom: 32,
// //   // },
// //   safeArea: {
// //     flex: 1,
// //     backgroundColor: "#1E1E2C",
// //   },
// //   headerContainer: {
// //     marginVertical: 24,
// //     paddingHorizontal: 16,
// //   },
// //   searchResultLabel: {
// //     fontSize: 14,
// //     fontWeight: "500",
// //     color: "#CDCDE0",
// //   },
// //   searchQueryText: {
// //     fontSize: 24,
// //     fontWeight: "600",
// //     color: "#FFFFFF",
// //     marginTop: 4,
// //   },
// //   searchInputContainer: {
// //     marginTop: 24,
// //     marginBottom: 32,
// //   },
// //   contentContainer: {
// //     paddingBottom: 80, // Ensures the last card is not hidden behind the footer
// //   },
// // });

// // export default SearchScreen;
