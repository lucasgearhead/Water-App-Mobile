import * as React from "react";
import { View, Text } from "react-native";
import { colors } from "../Constants/constants";

const RelatoryScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.terciary,
      }}
    >
      <Text>Relatory Screen</Text>
    </View>
  );
};

export default RelatoryScreen;
