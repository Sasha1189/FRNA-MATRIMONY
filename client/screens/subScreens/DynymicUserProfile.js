import { StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileDisplay from "../../components/SubComp/ProfileDisplay";

const DynymicUserProfile = ({ route }) => {
  const { user } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ProfileDisplay user={user} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default DynymicUserProfile;
