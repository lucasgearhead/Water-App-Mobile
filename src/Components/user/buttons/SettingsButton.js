import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { colors } from "../../../Constants/constants";

export default function SettingsButton({ type, onPress }) {
  return (
    <TouchableOpacity
      style={{
        width: 350,
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        alignContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View>
        <Text style={styles.text}>
          {type === "reminder" ? (
            <Ionicons name="alarm-outline" size={34} />
          ) : type === "goal" ? (
            <Ionicons name="water-outline" size={34} />
          ) : (
            <Ionicons name="settings-outline" size={34} />
          )}
        </Text>
      </View>
      <Text
        style={[
          styles.text,
          {
            width: "50%",
            fontSize: 20,
          },
        ]}
      >
        {type === "reminder"
          ? "Lembretes"
          : type === "goal"
          ? "Meta diária"
          : "Sons e vibrações"}
      </Text>
      <Text style={[styles.text, { fontSize: 25 }]}>{">"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "left",
  },
});
