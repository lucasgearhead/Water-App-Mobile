import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Switch } from "react-native";
import { colors } from "../../Constants/constants";
import GenericButton from "../buttons/GenericButton";

const GenericModal = ({ closeModal, title, type }) => {
  const [isAlert, setTypeAlert] = useState(false);
  const [isGoal, setTypeGoal] = useState(false);
  const [isSound, setTypeSound] = useState(false);

  useEffect(() => {
    if (type == "alert") {
      setTypeGoal(false);
      setTypeSound(false);
      setTypeAlert(true);
    } else if (type == "goal") {
      setTypeAlert(false);
      setTypeSound(false);
      setTypeGoal(true);
    } else if (type == "sound") {
      setTypeAlert(false);
      setTypeGoal(false);
      setTypeSound(true);
    } else {
      setTypeAlert(false);
      setTypeGoal(false);
      setTypeSound(false);
    }
  }, []);

  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");

  const handleHourChange = (text) => {
    setSelectedHour(text);
  };

  const handleMinuteChange = (text) => {
    setSelectedMinute(text);
  };

  const handleConfirm = () => {
    if (selectedHour !== "" || selectedMinute !== "") {
      const isValidTime =
        !isNaN(parseInt(selectedHour, 10)) &&
        !isNaN(parseInt(selectedMinute, 10));

      if (isValidTime) {
        const selectedTime = new Date();
        selectedTime.setHours(parseInt(selectedHour, 10));
        selectedTime.setMinutes(parseInt(selectedMinute, 10));
        alert(selectedTime);
        closeModal();
      } else {
        alert("Por favor, insira valores de hora e minuto válidos.");
      }
    } else {
      closeModal();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
        {isAlert && (
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
        )}
        {isGoal && (
          <View
            style={{
              marginTop: 35,
              flexDirection: "row",
              gap: 3,
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{
                alignSelf: "center",
                fontSize: 50,
              }}
              placeholder="2000"
              keyboardType="numeric"
              maxLength={4}
              selectionColor={"black"}
            />
            <Text
              style={{
                marginTop: 20,
                fontSize: 30,
              }}
            >
              ml
            </Text>
          </View>
        )}
        {isSound && (
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>Icone-1</Text>
              <Text style={{ width: 130, textAlign: "left" }}>Sons</Text>
              <Switch />
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 5,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>Icone-2</Text>
              <Text style={{ width: 130, textAlign: "left" }}>Vibrações</Text>
              <Switch />
            </View>
          </View>
        )}
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

export default GenericModal;
