import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCard = ({ posts, myPostScreen }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  //handle delete prompt
  const handleDeletePrompt = (id) => {
    Alert.alert("Attention!", "Sure delete post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel press");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
    ]);
  };

  //delete post data
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.push("Myposts");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Total Posts: {posts?.length}</Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {posts.map((post, index) => (
        <View style={styles.card} key={index}>
          {myPostScreen && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                borderWidth: 1,
                borderColor: "#ffffff",
              }}
            >
              <Text style={{ marginHorizontal: 30 }}>
                <FontAwesome5
                  name="pen"
                  size={16}
                  color={"darkblue"}
                  onPress={() => {
                    setPost(post), setModalVisible(true);
                  }}
                />
              </Text>
              <Text>
                <FontAwesome5
                  name="trash"
                  size={16}
                  color={"red"}
                  onPress={() => handleDeletePrompt(post?._id)}
                />
              </Text>
            </View>
          )}
          <View>
            <Text style={styles.title}>Title : {post?.title}</Text>
            <Text style={styles.desc}>{post?.description}</Text>
          </View>
          <View style={styles.footer}>
            <Text>
              <FontAwesome5
                name="user"
                color={"orange"}
                style={{ marginHorizontal: 10 }}
              />
              {post?.postedBy?.name}
            </Text>
            <Text>
              <FontAwesome5
                name="clock"
                color={"orange"}
                style={{ marginHorizontal: 10 }}
              />
              {moment(post?.createdAt).format("DD:MM:YYYY")}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 0.25,
    borderColor: "gray",
    padding: 20,
    borderRadius: 25,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
    borderBottomWidth: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  desc: { marginTop: 10 },
});
export default PostCard;
