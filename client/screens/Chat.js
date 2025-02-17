import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import io from "socket.io-client";
import { AuthContext } from "../context/authContext";

const ChatListScreen = ({ navigation }) => {
  const [state] = useContext(AuthContext);
  const [partners, setPartners] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // 1. Connect to Socket.IO
    socketRef.current = io("http://192.168.237.147:8080", {
      auth: {
        token: state?.token, // from AsyncStorage or Redux
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
  }, []);

  const goToChatRoom = (user) => {
    // e.g. navigate to ChatRoom with userId
    navigation.navigate("ChatRoom", { otherUserId: user._id });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Recent Chat Partners</Text>
      <FlatList
        data={partners}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToChatRoom(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatListScreen;
