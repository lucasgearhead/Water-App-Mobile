import { Text, StyleSheet, View, Switch } from "react-native";
import { React, useState } from "react";

import { colors } from "../../Constants/constants";

export default function AlertBox({ time }) {
  const [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = () => {
    setSwitchValue((prevValue) => !prevValue);
  };

  return (
    <View
      style={{
        height: 90,
        width: "95%",
        alignSelf: "center",
        backgroundColor: colors.backgorundBox,
        borderRadius: 30,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 3,
      }}
    >
      <Text
        style={{
          color: colors.text,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 50,
        }}
      >
        {time}
      </Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Switch
          value={switchValue}
          onValueChange={toggleSwitch}
          trackColor={{ false: "#b2b2b2", true: colors.secondary }}
          thumbColor={switchValue ? colors.primary : "#dcdcdc"}
        />
        <Switch
          value={switchValue}
          onValueChange={toggleSwitch}
          trackColor={{ false: "#b2b2b2", true: colors.secondary }}
          thumbColor={switchValue ? colors.primary : "#dcdcdc"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
