import React, { useEffect, useState, useRef, useContext, useMemo } from "react";
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
import io from "socket.io-client";
import { AuthContext } from "../../context/authContext";
import IconButton from "../../components/SubComp/IconButton";
import { ThemeContext } from "../../context/ThemeContext"; // <-- import your ThemeContext

const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};
const ChatRoomScreen = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [skip, setSkip] = useState(0);

  const { otherUserId, otherUserName } = route.params;
  const [state] = useContext(AuthContext);
  const currentUserId = state?.user?.userId; // or whatever your user ID field is
  const socketRef = useRef(null);

  // 1) consume the theme
  const { theme } = useContext(ThemeContext);

  // 2) dynamic style object
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    // Connect to socket with token
    socketRef.current = io(
      "https://frna-matrimony-backend-295491417988.asia-south1.run.app",
      {
        auth: {
          token: state?.token,
        },
      }
    );

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
      socketRef.current?.disconnect();
    };
  }, [otherUserId, state?.token]);

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
        <ActivityIndicator size="large" color={theme.colors.primary} />
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
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.leftHeader}>
            <TouchableOpacity
              onPress={() => {
                // e.g. navigation.goBack()
              }}
              style={styles.backIconBtn}
            >
              {/* <Image
                source={require("../../assets/icons/arrow-left.png")}
                style={styles.iconImage}
              /> */}
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
            </TouchableOpacity>
            <Image
              source={require("../../assets/images/profile.png")}
              style={styles.userAvatar}
              resizeMode="contain"
            />
            <Text style={styles.headerTitle}>{otherUserName}</Text>
          </View>
          <TouchableOpacity style={styles.rightIconBtn}>
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
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
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
            placeholderTextColor={`${theme.colors.text}80`}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;

// 3) dynamic style generator
function createStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      justifyContent: "flex-start",
      padding: 4,
      borderBottomWidth: 0.5,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.secondaryBackground,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    leftHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
    backIconBtn: {
      elevation: 0,
      height: 40,
      width: 40,
      marginRight: 2,
      borderWidth: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    rightIconBtn: {
      elevation: 0,
      height: 50,
      width: 50,
      marginRight: 5,
      borderWidth: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    iconImage: {
      width: 20,
      height: 20,
      tintColor: theme.colors.primary,
    },
    userAvatar: {
      width: 45,
      height: 45,
      borderRadius: 25,
      marginRight: 10,
      borderWidth: 0.5,
      borderColor: theme.colors.primary,
    },
    headerTitle: {
      fontSize: 18,
      alignItems: "center",
      fontWeight: "bold",
      color: theme.colors.primary,
      letterSpacing: 2,
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
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.secondaryBackground,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 16,
      paddingHorizontal: 12,
      marginRight: 8,
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
    },
    sendButton: {
      backgroundColor: theme.colors.primary,
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
    bubble: {
      maxWidth: "80%",
      padding: 10,
      borderRadius: 12,
    },
    bubbleLeft: {
      backgroundColor: `${theme.colors.nope}1A`, // e.g. tinted color
      borderTopLeftRadius: 0,
    },
    bubbleRight: {
      backgroundColor: `${theme.colors.like}1A`,
      borderTopRightRadius: 0,
    },
    bubbleText: {
      color: theme.colors.text,
    },
    timestamp: {
      color: `${theme.colors.text}80`,
      fontSize: 10,
      textAlign: "right",
      marginTop: 4,
    },
  });
}
