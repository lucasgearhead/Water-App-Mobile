import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../../Constants/constants";

export default function UserBox({ days, mililiters }) {
  return (
    <View
      style={{
        height: 135,
        width: 160,
        backgroundColor: colors.backgorundBox,
        borderRadius: 20,
        padding: 12,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white", fontSize: 15 }}>
          {days !== "" ? "Total realizado" : "Total ingerido"}
        </Text>
        <Text
          style={{
            display: "flex",
            color: "white",
          }}
        >
          {days !== "" ? (
            <Ionicons name="calendar-outline" size={25} />
          ) : (
            <Ionicons name="water-outline" size={25} />
          )}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.text, { fontSize: 40, fontWeight: 600 }]}>
          {days !== "" ? days : mililiters}
        </Text>
        <Text
          style={[
            styles.text,
            { fontSize: 30, fontWeight: 400, marginTop: 10, marginLeft: 5 },
          ]}
        >
          {days !== "" ? "Dias" : "ml"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});
