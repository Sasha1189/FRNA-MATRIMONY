import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { PostContext } from "../context/postContext";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";

const Post = ({ navigation }) => {
  // global state
  const [posts, setPosts] = useContext(PostContext);
  //local state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  //handle form data post Data
  const handlePost = async () => {
    try {
      setLoading(true);
      if (!title) {
        alert("Please add post title");
      }
      if (!description) {
        alert("Please add post description");
      }
      const { data } = await axios.post("/post/create-post", {
        title,
        description,
      });
      setLoading(false);
      setPosts([...posts, data?.post]);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.responce.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Create a post</Text>
          <TextInput
            placeholder="Add a post"
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.inputBox}
          />
          <TextInput
            placeholder="Add a post"
            placeholderTextColor={"gray"}
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            numberOfLines={6}
            style={styles.inputBox}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={handlePost} style={styles.postBtn}>
            <Text style={styles.postBtnText}>Create post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    width: 320,
    verticalAlignText: "top",
    paddingTop: 10,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  postBtn: {
    backgroundColor: "black",
    width: 300,
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  postBtnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Post;
