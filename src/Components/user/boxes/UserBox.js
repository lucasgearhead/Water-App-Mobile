import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { colors } from "../../../Constants/constants";

export default function UserBox({ days, mililiters }) {
  return (
    <View
      style={{
        height: 135,
        width: 160,
        backgroundColor: colors.backgorundBox,
        borderRadius: 20,
        padding: 8,
        paddingLeft: 15,
        justifyContent: "center",
      }}
    >
      <View>
        <Text style={styles.text}>{days !== "" ? "Icon-1" : "Icon-2"}</Text>
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
      <Text style={[styles.text, { fontSize: 17 }]}>
        {days !== "" ? "Total realizado" : "Total ingerido"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});
