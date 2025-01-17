import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { PostContext } from "../context/postContext";
import PostCard from "../components/Menus/PostCard";
import Footer from "../components/Menus/Footer";

const Home = () => {
  //access global state data
  const [posts, setPosts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);
  //refresh control
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <PostCard posts={posts} />
        </ScrollView>
      </View>
      <View style={styles.header}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: { flex: 5 },
  header: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
  },
});
export default Home;
