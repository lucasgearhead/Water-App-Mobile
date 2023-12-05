import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Switch } from "react-native";
import { colors } from "../../Constants/constants";
import GenericButton from "../buttons/GenericButton";

const SoundModal = ({ closeModal, title }) => {
  const handleConfirm = () => {
    closeModal();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
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
    justifyContent: "space-around",
    paddingBottom: 80,
    paddingHorizontal: 20,
    height: 230,
    elevation: 10,
    width: "100%",
    backgroundColor: colors.text,
    alignSelf: "center",
    borderRadius: 20,
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    gap: 15,
  },
});

export default SoundModal;
