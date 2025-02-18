import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import io from "socket.io-client";
import IconButton from "../components/SubComp/IconButton";
import { AuthContext } from "../context/authContext";
import Footer from "../components/Menus/Footer";

const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

const ChatListScreen = ({ navigation }) => {
  const [state] = useContext(AuthContext);
  const [partners, setPartners] = useState([]);
  const [likes, setLikes] = useState([]);
  const [crush, setCrush] = useState([]);

  // Initialize booleans to false or true as needed
  const [isMessagesShow, setIsMessagesShow] = useState(true);
  const [isCrushShow, setIsCrushShow] = useState(true);

  // Decide which data to display based on booleans
  const flatListData = isMessagesShow ? partners : isCrushShow ? crush : likes;

  const socketRef = useRef(null);

  useEffect(() => {
    // 1. Connect to Socket.IO
    socketRef.current = io("http://192.168.237.147:8080", {
      auth: {
        token: state?.token,
      },
    });

    // 2. Listen for the returned partners
    socketRef.current.on("recentPartners", (users) => {
      setPartners(users);
    });

    // 3. On mount, fetch the list
    socketRef.current.emit("fetchRecentPartners");

    return () => {
      socketRef.current.disconnect();
    };
  }, [state?.token]);

  const goToChatRoom = (user) => {
    // e.g. navigate to ChatRoom with userId
    navigation.navigate("ChatRoomScreen", {
      otherUserId: user?._id,
      otherUserName: user?.name,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity onPress={() => setIsMessagesShow(true)}>
            <Text
              style={{
                fontSize: 18,
                paddingVertical: 10,
                elevation: 5,
                alignItems: "center",
                fontWeight: "bold",
                color: isMessagesShow ? "#ff006f" : "#ff006f40",
                letterSpacing: 2,
              }}
            >
              Messages
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsMessagesShow(false)}>
            <Text
              style={{
                fontSize: 18,
                paddingVertical: 10,
                elevation: 5,
                alignItems: "center",
                fontWeight: "bold",
                fontStyle: "",
                color: isMessagesShow ? "#ff006f80" : "#ff006f",
                letterSpacing: 2,
              }}
            >
              Likes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {!isMessagesShow && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity onPress={() => setIsCrushShow(true)}>
            <Text
              style={{
                fontSize: 14,
                padding: 8,
                margin: 5,
                alignItems: "center",
                fontWeight: "bold",
                color: isCrushShow ? "#ff006f" : "#ff006f40",
                backgroundColor: isCrushShow ? "#00eda6" : null,
                letterSpacing: 2,
                borderRadius: 10,
              }}
            >
              CRUSH
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsCrushShow(false)}>
            <Text
              style={{
                fontSize: 14,
                padding: 8,
                margin: 5,
                alignItems: "center",
                fontWeight: "bold",
                color: isCrushShow ? "#ff006f40" : "#ff006f",
                backgroundColor: isCrushShow ? null : "#00eda6",
                borderRadius: 10,
                letterSpacing: 2,
              }}
            >
              LIKES
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.flatListContainer}>
        <FlatList
          data={flatListData}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => goToChatRoom(item)}
            >
              <Image
                source={
                  require("../assets/images/profile.png")
                  //   { uri: item.image?.imageUrls?.[0] }
                }
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>
                  {item?.name || "Not Provided"}
                </Text>
                <Text style={styles.profileDetails}>
                  {22 + " yrs, "}
                  {item?.education || "No Education Info"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text>No data found.</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    justifyContent: "flex-start",
    padding: 2,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  flatListContainer: {
    flex: 1,
    borderRadius: 10,
    margin: 5,
    overflow: "hidden",
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 2,
    padding: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular image
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  profileDetails: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },
  footer: {
    justifyContent: "flex-end",
    padding: 2,
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
});

export default ChatListScreen;
