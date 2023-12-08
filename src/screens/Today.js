import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../Constants/constants";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodayScreen = () => {
  const [goalValue, setGoalValue] = useState("");
  const [cupValue, setCupValue] = useState("");
  const [litersValue, setLitersValue] = useState([]);
  const [litersToday, setLitersToday] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const getStoredValue = async () => {
        try {
          const storedCupValue = await AsyncStorage.getItem("cupValue");
          const storedGoalValue = await AsyncStorage.getItem("goalValue");
          const storedLitersValue = await AsyncStorage.getItem("litersValue");

          if (storedCupValue !== null) {
            setCupValue(storedCupValue);
          }
          if (storedGoalValue !== null) {
            setGoalValue(storedGoalValue);
          }
          if (storedLitersValue !== null) {
            setLitersValue(storedLitersValue);
          }
        } catch (error) {
          console.error("Error getting stored values:", error);
        }
      };

      getStoredValue();
    }, [])
  );

  const handleCupValue = async () => {
    await AsyncStorage.setItem("cupValue", cupValue);
  };

  const handleLitersValue = async () => {
    const newValue = parseInt(cupValue, 10);
    setLitersValue(() => [...litersValue, newValue]);
    await AsyncStorage.setItem("litersValue", JSON.stringify(litersValue));
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.white,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 80,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 56 }}>{litersToday}</Text>
          <Text style={{ paddingBottom: 10 }}>ml</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14 }}>Próximo lembrete 13:00</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, color: colors.grey }}>
            Faltam {goalValue - litersToday} ml para atingir sua meta!
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <View
          style={{
            position: "absolute",
            height: 300,
            width: "100%",
            backgroundColor: colors.primary,
            bottom: -160,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 5,
              alignSelf: "center",
            }}
          >
            <TextInput
              style={{
                width: 50,
                color: colors.text,
                textAlign: "center",
                fontWeight: "500",
                borderWidth: 0,
                borderColor: "#00000000",
                borderWidth: 0,
              }}
              onEndEditing={handleCupValue}
              keyboardType="numeric"
              maxLength={4}
              value={cupValue}
              onChangeText={(value) => setCupValue(value)}
            />
            <Text
              style={{
                color: colors.text,
                fontWeight: "500",
                marginTop: 4,
              }}
            >
              ml
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleLitersValue}
            style={{
              elevation: 10,
              marginBottom: 40,
              width: 180,
              alignSelf: "center",
              backgroundColor: colors.buttonColor,
              padding: 10,
              paddingHorizontal: 30,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>BEBER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TodayScreen;
