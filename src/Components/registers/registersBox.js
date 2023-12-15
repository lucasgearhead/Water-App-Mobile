import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { React, useState } from "react";

import { colors } from "../../Constants/constants";

import { Ionicons } from "@expo/vector-icons";

export default function RegistersBox({ time, value, onPress }) {
  return (
    <View
      style={{
        height: 100,
        width: "100%",
        alignSelf: "center",
        backgroundColor: colors.primary,
        borderRadius: 15,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 3,
        padding: 15,
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            color: colors.white,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 35,
          }}
        >
          {time}
        </Text>
        <Text
          style={{
            color: colors.white,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
          }}
        >
          {value}
        </Text>
      </View>

      <TouchableOpacity onPress={onPress}>
        <Ionicons name="trash" size={25} color={"white"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
