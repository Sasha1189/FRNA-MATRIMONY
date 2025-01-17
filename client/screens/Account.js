import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import Footer from "../components/Menus/Footer";
const Account = () => {
  //global state
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  //local state
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);

  //handle update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-user", {
        name,
        password,
        email,
      });
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD?.updatedUser });
      alert(data && data.message);
    } catch (error) {
      alert(error.responce.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw9-MeiIyc5v6GnRUyZxqT-GMLqOs3KViTHg&s",
            }}
            style={{ height: 180, width: 180, borderRadius: 90 }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Name:</Text>
          <TextInput
            value={name}
            style={styles.inputBox}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email:</Text>
          <TextInput value={email} style={styles.inputBox} editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Password:</Text>
          <TextInput
            value={password}
            style={styles.inputBox}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Role:</Text>
          <TextInput
            value={state?.user?.role}
            style={styles.inputBox}
            editable={false}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={handleUpdate} style={styles.updateBtn}>
            <Text style={styles.updatedBtnText}>
              {loading ? "Please wait" : "Update Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.header}>
        <Footer />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputTitle: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 15,
    borderRadius: 5,
  },
  updateBtn: {
    backgroundColor: "gray",
    color: "white",
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updatedBtnText: {
    color: "#ffffff",
    fontSize: 16,
  },
  header: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
export default Account;
