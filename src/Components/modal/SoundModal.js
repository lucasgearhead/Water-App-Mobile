import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Switch } from "react-native";

import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors } from "../../Constants/constants";
import GenericButton from "../buttons/GenericButton";

const SoundModal = ({ closeModal, title }) => {
  const [isSound, setIsSound] = useState(false);
  const [isVibe, setIsVibe] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const getStoredValue = async () => {
        try {
          const storedSoundValue = await AsyncStorage.getItem("isSound");
          const storedVibeValue = await AsyncStorage.getItem("isVibe");

          if (storedSoundValue !== null) {
            setIsSound(storedSoundValue === "true");
          }
          if (storedVibeValue !== null) {
            setIsVibe(storedVibeValue === "true");
          }
        } catch (error) {
          console.error("Error getting stored goal value:", error);
        }
      };

      getStoredValue();
    }, [])
  );

  const handleConfirm = () => {
    try {
      AsyncStorage.setItem("isSound", isSound.toString());
      AsyncStorage.setItem("isVibe", isVibe.toString());
      console.log("Sound - ", isSound, "Vibe - ", isVibe);
    } catch (error) {
      console.error("Error saving user name:", error);
    }

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
          <AntDesign name="sound" size={30} />

          <Text style={{ width: 130, textAlign: "left", fontSize: 20 }}>
            Sons
          </Text>
          <Switch
            value={isSound}
            onValueChange={() => setIsSound(!isSound)}
            trackColor={{ false: "#b2b2b2", true: colors.secondary }}
            thumbColor={isSound ? colors.primary : "#dcdcdc"}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 5,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="vibration" size={30} color="black" />
          <Text style={{ width: 130, textAlign: "left", fontSize: 20 }}>
            Vibrações
          </Text>
          <Switch
            value={isVibe}
            onValueChange={() => setIsVibe(!isVibe)}
            trackColor={{ false: "#b2b2b2", true: colors.secondary }}
            thumbColor={isVibe ? colors.primary : "#dcdcdc"}
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
    fontSize: 22,
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
