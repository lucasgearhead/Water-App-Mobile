import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../Constants/constants";

export default function AddAlertButton({ onPress }) {
  return (
    <TouchableOpacity
      style={{
        height: 70,
        width: 70,
        borderRadius: 100,
        backgroundColor: colors.secondary,
        position: "absolute",
        bottom: 35,
        right: 35,
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: colors.backgorundBox,
          fontSize: 50,
          textAlign: "center",
        }}
      >
        +
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
