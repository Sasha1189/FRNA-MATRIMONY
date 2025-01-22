import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import ProfileDisplay from "../../components/SubComp/ProfileDisplay";

const MyProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileDisplay />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
export default MyProfile;
