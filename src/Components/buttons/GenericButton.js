import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { colors } from "../../Constants/constants";

export default function GenericButton({ title, onPress, type }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 60,
        width: 140,
        backgroundColor:
          type === "default"
            ? "white"
            : type === "confirm"
            ? colors.primary
            : type === "cancel"
            ? "white"
            : "red",
        borderRadius: 30,
        borderWidth: type == "cancel" ? 0.8 : 0,
        borderColor: "#000",
        borderStyle: "solid",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color:
            type === "cancel"
              ? "black"
              : type === "confirm"
              ? "white"
              : "black",
          alignSelf: "center",
          fontSize: 18,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
