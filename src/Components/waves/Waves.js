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
  const heightAnimated = useSharedValue(200);
  const waveAnimated = useSharedValue(5);

  const svgContainerProps = useAnimatedProps(() => {
    return {
      width,
      height: heightAnimated.value,
      viewBox: `0 -${width * 0.23} ${width} ${heightAnimated.value}`,
    };
  });

  const firstWaveProps = useAnimatedProps(() => {
    return {
      d: `
        M 0 ${-width * 0.0476}
        C ${width * 0.24}
          ${width * 0.2}
          ${width * 0.667}
          ${-width * 0.215}
          ${width}
          ${-width * 0.0476} 
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
        C ${width / 2.5}
          ${-width * 0.2}
          ${width / 2}
          ${width * 0.095}
          ${width}
          ${-width * 0.028}
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
      <AnimatedSvg animatedProps={svgContainerProps}>
        <AnimatedPath animatedProps={firstWaveProps} fill={colors.secondary} />
        <AnimatedPath animatedProps={secondWaveProps} fill={colors.primary} />
      </AnimatedSvg>
    </>
  );
}
