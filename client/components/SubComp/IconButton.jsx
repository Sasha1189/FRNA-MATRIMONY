import { style, TouchableWithoutFeedback, Animated } from "react-native";
import React, { useRef, useCallback } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const IconButton = ({ name, size, color, handlePress }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const animateScale = useCallback(
    (newValue) => {
      Animated.spring(scale, {
        toValue: newValue,
        triction: 4,
        useNativeDriver: true,
      }).start();
    },
    [scale]
  );

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      onPressIn={() => animateScale(0.6)}
      onPressOut={() => {
        animateScale(1);
      }}
      delayPressIn={0}
      delayPressOut={100}
    >
      <Animated.View
        style={{
          height: 50,
          width: 50,
          backgroundColor: "#1E1E2D",
          elevation: 5,
          borderRadius: 40,
          justifyContent: "center",
          alignItems: "center",
          borderColor: color,
          borderWidth: 0.2,
          transform: [{ scale }],
          ...style,
        }}
      >
        <FontAwesome name={name} size={size} color={color} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default IconButton;
