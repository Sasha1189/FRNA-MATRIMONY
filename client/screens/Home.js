import React, { useEffect, useContext, useState, useCallback } from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/authContext"; // Assuming JWT auth

const HomeScreen = () => {
  const { state } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchProfiles = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://192.168.66.147:8080/api/v1/auth/profiles"
      );
      setProfiles(response.data.profiles || []); // Ensure profiles is always an array
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  }, [state?.token]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const renderProfile = ({ item }) => (
    <View style={{ padding: 20, flex: 1 }}>
      <Text>{item.profile?.fullname || "Unknown"}</Text>
      <Text>{item.image?.imageUrls || "Unknown"}</Text>
      {item.image?.imageUrls?.length > 0 && (
        <>
          <Image
            source={{ uri: item.image?.imageUrls[0] }}
            resizeMode="cover"
            style={{ width: 100, height: 200 }}
          />
          <Image
            source={{ uri: item.image?.imageUrls[1] }}
            resizeMode="cover"
            style={{ width: 100, height: 200 }}
          />
          <Image
            source={{ uri: item.image?.imageUrls[2] }}
            resizeMode="cover"
            style={{ width: 100, height: 200 }}
          />
          <Image
            source={{ uri: item.image?.imageUrls[3] }}
            resizeMode="cover"
            style={{ width: 100, height: 200 }}
          />
        </>
      )}
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={{ flex: 1, borderWidth: 1, borderColor: "red" }}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item._id}
        renderItem={renderProfile}
        pagingEnabled // Enables vertical swipe per profile
      />
    </View>
  );
};

export default HomeScreen;

//home old
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   RefreshControl,
//   SafeAreaView,
// } from "react-native";
// import React, { useCallback, useContext, useState } from "react";
// import { PostContext } from "../context/postContext";
// import PostCard from "../components/Menus/PostCard";
// import Footer from "../components/Menus/Footer";
// const posts = [];
// const Home = () => {
//   //access global state data
//   // const [posts, setPosts, getAllPosts] = useContext(PostContext);
//   const [refreshing, setRefreshing] = useState(false);
//   //refresh control
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     // getAllPosts();

//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//   }, []);
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <ScrollView
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//         >
//           <PostCard posts={posts} />
//         </ScrollView>
//       </View>
//       <View style={styles.header}>
//         <Footer />
//       </View>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: { flex: 5 },
//   header: {
//     flex: 1,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "red",
//   },
// });
// export default Home;
