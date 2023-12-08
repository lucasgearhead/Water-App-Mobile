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
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Ionicons name="add" size={52} color={colors.backgorundBox} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
