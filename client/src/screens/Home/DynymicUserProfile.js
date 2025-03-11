import React, { useState, useContext, useMemo } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/SubComp/IconButton";
import ProfileDisplay from "../Profile/ProfileDisplay";
import { ThemeContext } from "../../context/ThemeContext"; // <-- import your ThemeContext

const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

const DynymicUserProfile = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const { item } = route.params;
  if (!item) setLoading(true);

  // 1) consume the theme
  const { theme } = useContext(ThemeContext);

  // 2) dynamic style object
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <IconButton
            name="arrow-left"
            size={24}
            color={COLORS.star}
            bgColor="transparent"
            style={styles.iconBtn}
          />

          <Text style={styles.headerTitle}>MY PROFILE</Text>
          <Text style={styles.headerPlaceholder} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.flatListContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.like} />
            <Text style={styles.loadingText}>Loading Profile...</Text>
          </View>
        ) : (
          <ProfileDisplay item={item} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DynymicUserProfile;

// 3) dynamic style generator
function createStyles(theme) {
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
      justifyContent: "space-between",
    },
    iconBtn: {
      elevation: 0,
      height: 50,
      width: 50,
      borderWidth: 0,
    },
    headerTitle: {
      fontSize: 18,
      alignItems: "center",
      fontWeight: "bold",
      color: theme.colors.primary, // replaced "#ff006f"
      letterSpacing: 2,
    },
    headerPlaceholder: {
      height: 50,
      width: 50,
    },
    flatListContainer: {
      flex: 1,
      margin: 5,
      overflow: "hidden",
    },
    loadingContainer: {
      marginTop: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    loadingText: {
      fontSize: 18,
      marginTop: 50,
      alignItems: "center",
      fontWeight: "bold",
      color: theme.colors.nope, // replaced "#ff006f"
      letterSpacing: 5,
    },
  });
}

// import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
// import React, { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import IconButton from "../../components/SubComp/IconButton";
// import ProfileDisplay from "../Profile/ProfileDisplay";

// const COLORS = {
//   like: "#00eda6",
//   nope: "#ff006f",
//   star: "#07A6FF",
// };
// const DynymicUserProfile = ({ route }) => {
//   const [loading, setLoading] = useState(false);
//   const { item } = route.params;
//   if (!item) setLoading(true);
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <IconButton
//             name="arrow-left"
//             size={24}
//             color={COLORS.star}
//             bgColor={"transparent"}
//             style={{
//               elevation: 0,
//               height: 50,
//               width: 50,
//               borderWidth: 0,
//             }}
//           />

//           <Text
//             style={{
//               fontSize: 18,
//               alignItems: "center",
//               fontWeight: "bold",
//               fontStyle: "",
//               color: "#ff006f",
//               letterSpacing: 2,
//             }}
//           >
//             MY PROFILE
//           </Text>
//           <Text style={{ height: 50, width: 50 }}></Text>
//         </View>
//       </View>
//       <View style={styles.flatListContainer}>
//         {loading ? (
//           <View
//             style={{
//               marginTop: 100,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <ActivityIndicator size="large" color="#00eda6" />
//             <Text
//               style={{
//                 fontSize: 18,
//                 marginTop: 50,
//                 alignItems: "center",
//                 fontWeight: "bold",
//                 color: "#ff006f",
//                 letterSpacing: 5,
//               }}
//             >
//               Loading Profile...
//             </Text>
//           </View>
//         ) : (
//           <ProfileDisplay item={item} />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f2f2f2",
//   },
//   header: {
//     justifyContent: "flex-start",
//     padding: 2,
//     borderBottomWidth: 0.5,
//     borderColor: "#ccc",
//     backgroundColor: "#fff",
//   },
//   flatListContainer: {
//     flex: 1,
//     margin: 5,
//     overflow: "hidden",
//   },
// });

// export default DynymicUserProfile;
