import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Switch } from "react-native";
import { colors } from "../../Constants/constants";
import GenericButton from "../buttons/GenericButton";

const AlertModal = ({ closeModal, title, type }) => {
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");

  const handleHourChange = (text) => {
    setSelectedHour(text);
  };

  const handleMinuteChange = (text) => {
    setSelectedMinute(text);
  };

  const handleConfirm = () => {
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="00"
            keyboardType="numeric"
            maxLength={2}
            value={selectedHour}
            onChangeText={handleHourChange}
            selectionColor={"black"}
          />

          <Text style={styles.colon}>:</Text>

          <TextInput
            style={styles.input}
            placeholder="00"
            keyboardType="numeric"
            maxLength={2}
            value={selectedMinute}
            onChangeText={handleMinuteChange}
            selectionColor={"black"}
          />
        </View>
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
    top: 170,
    borderRadius: 15,
  },
  title: {
    alignSelf: "center",
    top: 20,
    fontSize: 20,
  },
  inputContainer: {
    padding: 20,
    marginTop: 45,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  input: {
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 70,
    fontWeight: "500",
    height: 100,
    width: 100,
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
