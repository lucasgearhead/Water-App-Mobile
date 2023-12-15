import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Switch } from "react-native";
import { colors } from "../../Constants/constants";
import GenericButton from "../buttons/GenericButton";

import AsyncStorage from "@react-native-async-storage/async-storage";

const GoalModal = ({ closeModal, title }) => {
  const [inputValue, setInputValue] = useState("2000");

  useEffect(() => {
    const getStoredValue = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("goalValue");

        if (storedValue !== null) {
          setInputValue(storedValue);
        }
      } catch (error) {
        console.error("Error getting stored goal value:", error);
      }
    };

    getStoredValue();
  }, []);

  const handleConfirm = async () => {
    try {
      await AsyncStorage.setItem("goalValue", inputValue);
    } catch (error) {
      console.log("Error saving goal value:", error);
    }

    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
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
            keyboardType="numeric"
            maxLength={4}
            selectionColor={"#00000030"}
            underlineColorAndroid={"#00000000"}
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
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

export default GoalModal;
