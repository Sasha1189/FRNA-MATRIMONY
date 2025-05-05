import React, { useContext, useMemo, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/SubComp/IconButton";
import { ThemeContext } from "../../context/ThemeContext";
import { LightTheme, DarkTheme } from "../../themes";
import { useAuth } from "../../context/authContext"; // <-- Import your auth context

const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

const Setting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme.dark ? LightTheme : DarkTheme);
    setIsEnabled((previousState) => !previousState);
  };

  // 2) create a dynamic style object
  const styles = useMemo(() => createStyles(theme), [theme]);

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <IconButton
            name="arrow-left"
            size={24}
            color={COLORS.star}
            bgColor={"transparent"}
            style={styles.iconBtn}
          />
          <Text style={styles.headerTitle}>SETTINGS</Text>
          <Text style={styles.iconPlaceholder} />
        </View>
      </View>
      {/* Content */}
      <View style={styles.flatListContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* Theme Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Theme</Text>
            <View style={styles.themeToggle}>
              <Text style={styles.themeButtonText}>LIGHT</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
                value={isEnabled}
              />
              <Text style={styles.themeButtonText}>DARK</Text>
            </View>
          </View>
          {/* Payment Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment account</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Manage pay account</Text>
            </TouchableOpacity>
          </View>

          {/* Contact / Legal Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact us</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Help & Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Legal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Privacy policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Term of service</Text>
            </TouchableOpacity>
          </View>

          {/* Danger Section */}
          <View style={styles.sectionDanger}>
            <TouchableOpacity style={styles.button} onPress={logout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              // onPress={handleDeleteAccount}
            >
              <Text style={styles.buttonText}>Delete account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

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
      borderColor: theme.colors.border,
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
      fontWeight: "bold",
      color: theme.colors.primary,
      letterSpacing: 2,
    },
    iconPlaceholder: {
      height: 50,
      width: 50,
    },
    flatListContainer: {
      flex: 1,
      margin: 5,
      overflow: "hidden",
    },
    scrollView: {
      paddingHorizontal: 16,
      marginVertical: 24,
    },
    section: {
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      marginBottom: 16,
      padding: 16,
      paddingBottom: 0,
      backgroundColor: theme.colors.secondaryBackground,
      borderRadius: 16,
    },
    sectionTitle: {
      marginBottom: 8,
      fontWeight: "600",
      color: theme.colors.text,
    },
    button: {
      height: 48,
      marginBottom: 16,
      paddingHorizontal: 16,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 0.5,
      borderRadius: 12,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    themeToggle: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    themeButtonText: {
      color: theme.colors.text,
      textAlign: "center",
      // borderWidth: 1,
      // borderColor: "red",
    },
    buttonText: {
      color: theme.colors.text,
      textAlign: "center",
    },
    sectionDanger: {
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      marginBottom: 100,
      padding: 16,
      paddingBottom: 0,
      backgroundColor: theme.colors.secondaryBackground,
      borderRadius: 16,
    },
  });
}
