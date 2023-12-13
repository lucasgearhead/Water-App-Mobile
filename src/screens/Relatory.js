import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import { colors } from "../Constants/constants";

const RelatoryScreen = () => {
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateWaves = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave1, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(wave1, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ]),
        { iterations: -1 }
      ).start();
      
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave2, {
            toValue: 1,
            duration: 1200,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(wave2, {
            toValue: 0,
            duration: 1200,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ]),
        { iterations: -1 }
      ).start();
    };

    animateWaves();
  }, [wave1, wave2]);
  return (
    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
      <Animated.View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "blue",
          opacity: wave1,
        }}
      />
      <Animated.View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "blue",
          opacity: wave2,
        }}
      />
    </View>
  );
};

export default RelatoryScreen;
