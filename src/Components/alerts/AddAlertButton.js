import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../Constants/constants";

import { Ionicons } from "@expo/vector-icons";

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
        margin: 0,
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Ionicons
        name="add"
        style={{
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
        size={55}
        color={colors.backgorundBox}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
