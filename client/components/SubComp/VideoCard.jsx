import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import IconButton from "./IconButton";
import ImageCarousal from "./ImageCarousal";

const { width, height } = Dimensions.get("window");
const ITEMSIZE = width * 0.95;

const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

const VideoCard = ({ item }) => {
  // console.log("Item from videocard :=>", item.id);
  // console.log("Item from videocard :=>", item.images);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.videoCard}>
        <ImageCarousal id={item.id} images={item.images} />
      </View>
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
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: width,
    height: height * 0.9,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
  },
  videoCard: {
    width: width,
    height: height * 0.9, // Occupy most of the screen
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  userContainer: {
    position: "absolute",
    bottom: 80,
    left: 20,
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
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "30%",
    bottom: 20,
    right: 20,
  },
});
