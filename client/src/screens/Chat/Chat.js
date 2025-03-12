import React, { useEffect, useState, useRef, useContext, useMemo } from "react";
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
import { AuthContext } from "../../context/authContext";
import { ThemeContext } from "../../context/ThemeContext"; // <-- Import your ThemeContext

const ChatListScreen = ({ navigation }) => {
  const [state] = useContext(AuthContext);
  const [partners, setPartners] = useState([]);
  const [likes, setLikes] = useState([]);
  const [crush, setCrush] = useState([]);

  // Tab states
  const [isMessagesShow, setIsMessagesShow] = useState(true);
  const [isCrushShow, setIsCrushShow] = useState(true);

  // Decide which data to display
  const flatListData = isMessagesShow ? partners : isCrushShow ? crush : likes;

  const socketRef = useRef(null);

  // 1) consume the theme
  const { theme } = useContext(ThemeContext);

  // 2) dynamic style object
  const styles = useMemo(
    () => createStyles(theme, isMessagesShow, isCrushShow),
    [theme, isMessagesShow, isCrushShow]
  );

  useEffect(() => {
    // Connect to Socket.IO
    socketRef.current = io(
      "https://frna-matrimony-backend-295491417988.asia-south1.run.app",
      {
        auth: {
          token: state?.token,
        },
      }
    );

    // Listen for the returned partners
    socketRef.current.on("recentPartners", (users) => {
      setPartners(users);
    });

    // On mount, fetch the list
    socketRef.current.emit("fetchRecentPartners");

    return () => {
      socketRef.current.disconnect();
    };
  }, [state?.token]);

  const goToChatRoom = (user) => {
    navigation.navigate("ChatRoomScreen", {
      otherUserId: user?._id,
      otherUserName: user?.name,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setIsMessagesShow(true)}>
            <Text style={styles.messagesTab}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsMessagesShow(false)}>
            <Text style={styles.likesTab}>Likes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sub-Tab Row */}
      {!isMessagesShow && (
        <View style={styles.subTabRow}>
          <TouchableOpacity onPress={() => setIsCrushShow(true)}>
            <Text style={styles.crushTab}>CRUSH</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsCrushShow(false)}>
            <Text style={styles.likesSubTab}>LIKES</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
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
                source={require("../../assets/images/profile.png")}
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
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No data found.</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatListScreen;

// 3) dynamic style generator
function createStyles(theme, isMessagesShow, isCrushShow) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      justifyContent: "flex-start",
      padding: 2,
      borderBottomWidth: 0.5,
      borderColor: "#ccc",
      backgroundColor: theme.colors.secondaryBackground,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    messagesTab: {
      fontSize: 18,
      paddingVertical: 10,
      elevation: 5,
      alignItems: "center",
      fontWeight: "bold",
      letterSpacing: 2,
      color: isMessagesShow
        ? theme.colors.primary
        : `${theme.colors.primary}80`,
    },
    likesTab: {
      fontSize: 18,
      paddingVertical: 10,
      elevation: 5,
      alignItems: "center",
      fontWeight: "bold",
      letterSpacing: 2,
      color: isMessagesShow
        ? `${theme.colors.primary}80`
        : theme.colors.primary,
    },
    subTabRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      backgroundColor: theme.colors.secondaryBackground,
      paddingVertical: 4,
    },
    crushTab: {
      fontSize: 14,
      padding: 8,
      margin: 5,
      fontWeight: "bold",
      letterSpacing: 2,
      borderRadius: 10,
      color: isCrushShow ? theme.colors.primary : `${theme.colors.primary}40`,
      backgroundColor: isCrushShow ? theme.colors.like : "transparent",
    },
    likesSubTab: {
      fontSize: 14,
      padding: 8,
      margin: 5,
      fontWeight: "bold",
      letterSpacing: 2,
      borderRadius: 10,
      color: isCrushShow ? `${theme.colors.primary}40` : theme.colors.primary,
      backgroundColor: isCrushShow ? "transparent" : theme.colors.like,
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
      backgroundColor: theme.colors.secondaryBackground,
      borderRadius: 8,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
    },
    profileDetails: {
      fontSize: 14,
      color: `${theme.colors.text}80`,
      marginTop: 4,
    },
    emptyContainer: {
      alignItems: "center",
      marginTop: 20,
    },
    emptyText: {
      color: theme.colors.text,
    },
  });
}
