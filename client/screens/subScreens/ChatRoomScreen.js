import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/SubComp/IconButton";
import io from "socket.io-client";
import { AuthContext } from "../../context/authContext";

const ChatRoomScreen = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const [state] = useContext(AuthContext);
  const { otherUserId, otherUserName } = route.params;
  const currentUserId = state?.user?.userId;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [skip, setSkip] = useState(0);
  const socketRef = useRef(null);

  const COLORS = {
    like: "#00eda6",
    nope: "#ff006f",
    star: "#07A6FF",
  };

  useEffect(() => {
    // Connect to socket with token
    socketRef.current = io("http://192.168.237.147:8080", {
      auth: {
        token: state?.token,
      },
    });

    // Join ephemeral room => triggers server to send initial chatHistory
    socketRef.current.emit("joinRoom", otherUserId);

    // Listen for initial chat history
    socketRef.current.on("chatHistory", (initialMsgs) => {
      setMessages(initialMsgs);
      setSkip(initialMsgs.length);
    });

    // Listen for new messages
    socketRef.current.on("chatMessage", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
      setSkip((prev) => prev + 1);
    });

    // Listen for older messages
    socketRef.current.on("oldMessages", (older) => {
      // Prepend older messages
      setMessages((prev) => [...older, ...prev]);
      setSkip((prev) => prev + older.length);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [otherUserId]);

  // Fetch older messages
  const loadOlderMessages = () => {
    socketRef.current.emit("fetchOldMessages", {
      otherUserId,
      skip,
      limit: 20,
    });
  };

  // Send new message
  const sendMessage = () => {
    if (!text.trim()) return;
    socketRef.current.emit("chatMessage", { otherUserId, text });
    setText("");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }) => {
    const isCurrentUser = item.senderId === currentUserId;
    return (
      <View
        style={[
          styles.messageRow,
          isCurrentUser ? styles.rowRight : styles.rowLeft,
        ]}
      >
        {/* If it's not current user, show avatar on the left side */}
        {/* {!isCurrentUser && (
          <Image
            source={
              // item?.userImage
              //   ? { uri: item?.userImage } :
              require("../../assets/images/profile.png")
            }
            style={styles.avatar}
          />
        )} */}

        <View
          style={[
            styles.bubble,
            isCurrentUser ? styles.bubbleRight : styles.bubbleLeft,
          ]}
        >
          <Text style={styles.bubbleText}>{item?.text}</Text>
          <Text style={styles.timestamp}>
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        {/* If it IS current user, optionally show an empty space or an avatar on the right */}
        {/* {isCurrentUser && <View style={{ width: 40 }} />} */}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton
              name="arrow-left"
              size={20}
              color={COLORS.star}
              bgColor={"transparent"}
              style={{
                elevation: 0,
                height: 40,
                width: 40,
                marginRight: 2,
                borderWidth: 0,
              }}
            />
            <Image
              source={require("../../assets/images/profile.png")}
              style={{
                width: 45,
                height: 45,
                borderRadius: 25,
                marginRight: 10,
                borderWidth: 0.5,
                borderColor: "#ff006f",
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 18,
                alignItems: "center",
                fontWeight: "bold",
                fontStyle: "",
                color: "#ff006f",
                letterSpacing: 2,
              }}
            >
              {otherUserName}
            </Text>
          </View>
          <IconButton
            name="ellipsis-v"
            size={24}
            color={COLORS.star}
            bgColor={"transparent"}
            style={{
              elevation: 0,
              height: 50,
              width: 50,
              marginRight: 5,
              borderWidth: 0,
            }}
            // handlePress={() => navigation.navigate("SearchScreen")}
          />
        </View>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          style={styles.flatList}
        />
        {/* Input row */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
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
    padding: 4,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  flatListContainer: {
    flex: 1,
    overflow: "hidden",
  },
  flatList: {
    flex: 1,
    padding: 12,
  },
  inputRow: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#07A6FF",
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 4,
  },
  rowLeft: {
    justifyContent: "flex-start",
  },
  rowRight: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 6,
  },
  bubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 12,
  },
  bubbleLeft: {
    backgroundColor: "#ff006f1A",
    borderTopLeftRadius: 0,
  },
  bubbleRight: {
    backgroundColor: "#07A6FF1A",
    borderTopRightRadius: 0,
  },
  bubbleText: {
    color: "#000",
  },
  timestamp: {
    color: "#888",
    fontSize: 10,
    textAlign: "right",
    marginTop: 4,
  },
});

export default ChatRoomScreen;
