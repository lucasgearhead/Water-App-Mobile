import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Switch } from "react-native";
import { colors } from "../../Constants/constants";
import GenericButton from "../buttons/GenericButton";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AlertModal = ({ closeModal, title, onConfirm }) => {
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");

  const inputHoraRef = useRef(null);
  const inputMinutoRef = useRef(null);

  const handleHourChange = (text) => {
    // Verifica se o texto contém apenas números e está no formato de hora
    if (/^[0-9]*$/.test(text) && parseInt(text, 10) <= 23) {
      setSelectedHour(text);
      // Se tiver dois dígitos, move o foco para o campo de minutos
      if (text.length === 2) {
        inputMinutoRef.current.focus();
      }
    } else {
      setSelectedHour(""); // Limpa o campo se não for um valor válido
    }
  };

  const handleMinuteChange = (text) => {
    // Verifica se o texto contém apenas números e está no formato de minutos
    if (/^[0-5]?[0-9]?$/.test(text)) {
      setSelectedMinute(text);
      if (text === "") {
        inputHoraRef.current.focus();
      }
    } else {
      setSelectedMinute("");
    }
  };

  const handleConfirm = async () => {
    // Save the selected hour to AsyncStorage
    const selectedTime = `${selectedHour}:${selectedMinute}`;
    try {
      // Fetch the existing array from AsyncStorage
      const existingTimesString = await AsyncStorage.getItem("selectedTimes");
      const existingTimes = existingTimesString
        ? JSON.parse(existingTimesString)
        : [];

      // Add the new time to the array
      existingTimes.push(selectedTime);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem(
        "selectedTimes",
        JSON.stringify(existingTimes)
      );

      // Close the modal
      closeModal();
      onConfirm();
    } catch (error) {
      console.error("Error saving time to AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={selectedHour}
          placeholder="00"
          keyboardType="numeric"
          maxLength={2}
          onChangeText={handleHourChange}
          returnKeyType="next"
          ref={inputHoraRef}
        />
        <Text style={styles.colon}>:</Text>
        <TextInput
          style={styles.input}
          value={selectedMinute}
          placeholder="00"
          keyboardType="numeric"
          maxLength={2}
          onChangeText={handleMinuteChange}
          ref={inputMinutoRef}
        />
      </View>

      <View style={styles.buttonRow}>
        <GenericButton
          onPress={closeModal}
          title={"CANCELAR"}
          type={"cancel"}
        />
        <GenericButton
          onPress={handleConfirm}
          title={"SALVAR"}
          type={"confirm"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 330,
    elevation: 10,
    width: 340,
    backgroundColor: colors.text,
    alignSelf: "center",
    position: "absolute",
    borderRadius: 15,
    justifyContent: "space-around",
    paddingBottom: 90,
  },
  title: {
    alignSelf: "center",
    top: 20,
    fontSize: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
  },
  input: {
    fontSize: 70,
    fontWeight: "500",
    width: 100,
    textAlign: "center",
  },
  colon: {
    fontSize: 40,
    marginHorizontal: 5,
  },
  buttonRow: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    gap: 15,
  },
});

export default AlertModal;
