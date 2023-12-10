import {
  StyleSheet,
  View,
  Switch,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { React, useState } from "react";

import { colors } from "../../Constants/constants";

import { Ionicons } from "@expo/vector-icons";

export default function AlertBox({ time, onPress }) {
  const [timeValue, setTimeValue] = useState(time);

  return (
    <View
      style={{
        height: 100,
        width: "95%",
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
      <TextInput
        style={{
          color: colors.white,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 50,
        }}
        value={timeValue}
        onChangeText={(newValue) => setTimeValue(newValue)}
        keyboardType="numeric"
      />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="trash" size={20} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
