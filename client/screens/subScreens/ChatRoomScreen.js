import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import io from "socket.io-client";
import { AuthContext } from "../context/authContext";

const ChatRoomScreen = ({ route }) => {
  const [state] = useContext(AuthContext);
  const { otherUserId } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [skip, setSkip] = useState(0);

  const socketRef = useRef(null);

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

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={loadOlderMessages}>
        <Text>Load Older</Text>
      </TouchableOpacity>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 8 }}>
            <Text>
              {item.senderId}: {item.text}
            </Text>
          </View>
        )}
      />
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1 }}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoomScreen;
