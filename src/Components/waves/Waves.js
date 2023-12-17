import React, { useEffect } from "react";
import { Button, Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { colors } from "../../Constants/constants";

const { width } = Dimensions.get("screen");
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function Waves() {
  useEffect(() => {
    function handleDrink() {
      waveAnimated.value = 5;
      waveAnimated.value = withRepeat(
        withTiming(20, {
          duration: 2200,
          easing: Easing.linear,
        }),
        -1,
        true
      );
    }
    handleDrink();
  }, []);

  const heightAnimated = useSharedValue(150);
  const waveAnimated = useSharedValue(5);

  const svgContainerProps = useAnimatedProps(() => {
    return {
      width,
      height: heightAnimated.value,
      viewBox: `0 0 ${width} ${heightAnimated.value}`,
    };
  });

  const firstWaveProps = useAnimatedProps(() => {
    return {
      d: `
    M 0 0
    Q ${waveAnimated.value} 20 70 0
    T 180 0
    T 420 0
    V ${heightAnimated.value}
    H 0
    Z
    `,
    };
  });

  const secondWaveProps = useAnimatedProps(() => {
    return {
      d: `
    M 0 0
    Q ${waveAnimated.value + 20} 15 120 0
    T 280 0
    T 420 0
    V ${heightAnimated.value}
    H 0
    Z
    `,
    };
  });

  function handleHeight() {
    heightAnimated.value = withTiming(heightAnimated.value + 100, {
      duration: 1000,
      easing: Easing.ease,
    });
  }

  return (
    <>
      <AnimatedSvg
        animatedProps={svgContainerProps}
        style={{ position: "absolute", bottom: 0, zIndex: -1 }}
      >
        <AnimatedPath
          animatedProps={firstWaveProps}
          fill={colors.secondary}
          transform="translate(0, 10)"
        />
        <AnimatedPath
          animatedProps={secondWaveProps}
          fill={colors.primary}
          transform="translate(0, 25)"
        />
      </AnimatedSvg>
    </>
  );
}
