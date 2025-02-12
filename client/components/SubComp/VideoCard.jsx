import { View, Text, Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("DynymicUserProfile", { item: item });
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.videoCard}>
        <ImageCarousal id={item._id} images={item?.image} />
      </View>
      <View style={styles.cardInfoBackground}>
        <View style={styles.userContainer}>
          <Text style={styles.nav}>
            {item?.profile?.fullname || "Not Provided"}
          </Text>
          <Text style={styles.location}>
            {item?.profile?.work || "Not Provided"}
          </Text>
          <Text style={styles.distance}>
            {item?.profile?.livesin || "Not Provided"}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <IconButton
            name="thumbs-up"
            size={24}
            color={COLORS.nope}
            bgColor={"transparent"}
            style={{
              elevation: 0,
              borderWidth: 1,
              height: 40,
              width: 40,
              margin: 4,
            }}
          />
          <IconButton
            name="commenting-o"
            size={24}
            color={COLORS.star}
            bgColor={"transparent"}
            style={{
              elevation: 0,
              borderWidth: 1,
              height: 40,
              width: 40,
              margin: 4,
            }}
          />
          <IconButton
            name="info"
            size={24}
            color={COLORS.like}
            bgColor={"transparent"}
            style={{
              elevation: 0,
              borderWidth: 1,
              height: 40,
              width: 40,
              margin: 4,
            }}
            handlePress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: width,
    height: height * 0.8,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
  },
  videoCard: {
    width: width,
    height: height * 0.8, // Occupy most of the screen
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardInfoBackground: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: "5%",
    paddingHorizontal: 15,
  },
  userContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  nav: {
    fontSize: 25,
    color: "white",
    fontWeight: "900",
    paddingBottom: 4,
  },
  location: {
    fontSize: 15,
    color: "white",
    fontWeight: "300",
    // padding: 4,
  },
  distance: {
    fontSize: 15,
    color: "white",
    fontWeight: "300",
    paddingBottom: 4,
  },
  iconContainer: {
    // position: "absolute",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    // borderWidth: 1,
  },
});
