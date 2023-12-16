import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../Constants/constants";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Waves from "../Components/waves/Waves";

const TodayScreen = () => {
  const [goalValue, setGoalValue] = useState("");
  const [cupValue, setCupValue] = useState("200");
  const [cupsValue, setCupsValue] = useState([]);
  const [litersToday, setLitersToday] = useState(0);
  const [nextReminder, setNextReminder] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      getStoredValue();
      calculateNextReminder();
    }, [])
  );

  useEffect(() => {
    const setDefaultGoalValue = async () => {
      const storedGoalValue = await AsyncStorage.getItem("goalValue");
      if (storedGoalValue == null) {
        setGoalValue("2000");
      }
    };
    setDefaultGoalValue();
  }, []);

  const getStoredValue = async () => {
    try {
      const storedCupValue = await AsyncStorage.getItem("cupValue");
      const storedGoalValue = await AsyncStorage.getItem("goalValue");
      const storedCupsValue = await AsyncStorage.getItem("cupsValue");

      if (storedCupValue !== null) {
        setCupValue(storedCupValue);
      }
      if (storedGoalValue !== null) {
        setGoalValue(storedGoalValue);
      }
      if (storedCupsValue !== null) {
        const parsedCupsValue = JSON.parse(storedCupsValue);
        setCupsValue(parsedCupsValue);
        handleLitersToday(parsedCupsValue);
      }
    } catch (error) {
      console.error("Error getting stored values:", error);
    }
  };

  const calculateNextReminder = async () => {
    try {
      const storedReminderTimes = await AsyncStorage.getItem("selectedTimes");
      const reminderTimes = storedReminderTimes
        ? JSON.parse(storedReminderTimes)
        : [];

      const now = new Date();

      // Converter os horários em objetos Date para comparação correta
      const upcomingReminders = reminderTimes
        .map((time) => {
          const [hours, minutes] = time.split(":");
          const reminderDate = new Date(now);
          reminderDate.setHours(
            parseInt(hours, 10),
            parseInt(minutes, 10),
            0,
            0
          );
          return reminderDate;
        })
        .filter((reminderDate) => reminderDate > now);

      if (upcomingReminders.length > 0) {
        // Ordenar os lembretes por data e pegar o próximo
        upcomingReminders.sort((a, b) => a - b);
        const nextReminderDate = upcomingReminders[0];

        // Formatar a mensagem do próximo lembrete
        const nextReminderTime = `${nextReminderDate.getHours()}:${nextReminderDate.getMinutes()}`;
        setNextReminder(`Próximo lembrete às ${nextReminderTime}`);
      } else {
        setNextReminder("Não há lembretes hoje.");
      }
    } catch (error) {
      console.error("Error calculating next reminder:", error);
    }
  };

  const handleLitersToday = (values) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const litersTodayValues = values
      .filter((cup) => cup.timestamp >= today.getTime())
      .map((cup) => cup.value);

    const soma = litersTodayValues.reduce((acumulador, valorAtual) => {
      return acumulador + valorAtual;
    }, 0);

    setLitersToday(soma);

    if (soma >= parseInt(goalValue, 10)) {
      markDailyGoalAchieved();
    }
  };

  const handleCupValue = async () => {
    await AsyncStorage.setItem("cupValue", cupValue);
  };

  const handleCupsValue = async () => {
    const newValue = {
      timestamp: new Date().getTime(),
      value: parseInt(cupValue, 10),
    };

    const updatedCupsValue = [...cupsValue, newValue];
    await AsyncStorage.setItem("cupsValue", JSON.stringify(updatedCupsValue));
    setCupsValue(updatedCupsValue);
    handleLitersToday(updatedCupsValue);
  };

  const markDailyGoalAchieved = async () => {
    try {
      const daysGoalAchieved = await AsyncStorage.getItem("daysGoalAchieved");

      let parsedDaysGoalAchieved = daysGoalAchieved
        ? JSON.parse(daysGoalAchieved)
        : [];

      // Adicionar o dia atual à lista
      const today = new Date().toISOString().split("T")[0];
      if (!parsedDaysGoalAchieved.includes(today)) {
        parsedDaysGoalAchieved.push(today);
        // Armazenar a lista atualizada no AsyncStorage
        await AsyncStorage.setItem(
          "daysGoalAchieved",
          JSON.stringify(parsedDaysGoalAchieved)
        );

        // Você pode adicionar qualquer outra lógica ou notificação aqui, se necessário
      }
    } catch (error) {
      console.error("Error marking daily goal achieved:", error);
    }
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
          marginTop: 50,
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
          <Text style={{ fontSize: 14 }}>{nextReminder}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, color: colors.grey }}>
            {goalValue - litersToday <= 0
              ? "Você atingiu a sua meta hoje!"
              : `Faltam ${goalValue - litersToday} ml para atingir sua meta!`}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 10,
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
          onPress={handleCupsValue}
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
      <Waves />
    </View>
  );
};

export default TodayScreen;
