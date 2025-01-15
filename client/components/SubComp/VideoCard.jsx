import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import IconButton from "./IconButton";

const { width, height } = Dimensions.get("window");
const ITEMSIZE = width * 0.95;

const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

const VideoCard = ({ imageUri }) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Image
        source={{ uri: imageUri }}
        style={{
          width: width,
          height: height,
          borderRadius: 20,
          zIndex: -999,
        }}
        resizeMode="cover"
      />
      <View style={styles.userContainer}>
        <Text style={styles.nav}>Ruchika 22</Text>
        <Text style={styles.location}>Accenture</Text>
        <Text style={styles.distance}>Pune</Text>
      </View>
      <View style={styles.iconContainer}>
        <IconButton name="thumbs-up" size={24} color={COLORS.nope} />
        <IconButton name="commenting-o" size={24} color={COLORS.star} />
        <IconButton name="info" size={24} color={COLORS.like} />
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  userContainer: {
    position: "absolute",
    bottom: 20,
    left: 24,
  },
  nav: {
    fontSize: 25,
    color: "white",
    fontWeight: "900",
  },
  location: {
    fontSize: 15,
    color: "white",
    fontWeight: "300",
  },
  distance: {
    fontSize: 15,
    color: "white",
    fontWeight: "300",
  },
  iconContainer: {
    position: "absolute",
    width: width,
    bottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    left: width - 70,
  },
});
