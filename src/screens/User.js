import React, { useEffect, useState } from "react";
import { View, Text, Modal, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { colors } from "../Constants/constants";
import UserBox from "../Components/user/boxes/UserBox";
import SettingsButton from "../Components/user/buttons/SettingsButton";
import GoalModal from "../Components/modal/GoalModal";
import SoundModal from "../Components/modal/SoundModal";

import AsyncStorage from "@react-native-async-storage/async-storage";

const UserScreen = ({ navigation }) => {
  const [username, setUserName] = useState("Seu Nome");
  const [isSoundVisible, setSoundVisible] = useState(false);
  const [isGoalVisible, setGoalVisible] = useState(false);

  const [daysGoalMet, setDaysGoalMet] = useState(0);
  const [waterConsumption, setWaterConsumption] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const getStoredValue = async () => {
        try {
          const storedNameValue = await AsyncStorage.getItem("userName");
          const storedGoalMetValue = await AsyncStorage.getItem(
            "daysGoalAchieved"
          );

          if (storedNameValue !== null) {
            setUserName(storedNameValue);
          }
          if (storedGoalMetValue !== null) {
            const parsedGoalMetValue = JSON.parse(storedGoalMetValue);
            setDaysGoalMet(parsedGoalMetValue.length);
          }

          await loadTotalLiters();
        } catch (error) {
          console.error("Error getting stored values:", error);
        }
      };

      getStoredValue();
    }, [])
  );

  const loadTotalLiters = async () => {
    try {
      const storedWaterConsumptionValue = await AsyncStorage.getItem(
        "cupsValue"
      );

      if (storedWaterConsumptionValue !== null) {
        const parsedWaterConsumptionValue = JSON.parse(
          storedWaterConsumptionValue
        );

        // Extrair apenas os valores da propriedade "value" dos objetos
        const allValues = parsedWaterConsumptionValue.map((cup) => cup.value);

        // Calcular a soma de todos os valores
        const soma = allValues.reduce((acumulador, valorAtual) => {
          return acumulador + valorAtual;
        }, 0);

        setWaterConsumption(soma);
      }
    } catch (error) {
      console.error("Error loading total liters:", error);
    }
  };

  const handleName = () => {
    try {
      AsyncStorage.setItem("userName", username);
      alert(`Nome salvo com sucesso, bem-vindo ${username}`);
    } catch (error) {
      console.error("Error saving user name:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.terciary }}>
      <Text
        style={{
          color: "white",
          alignSelf: "center",
          fontSize: 40,
          marginTop: 50,
          fontWeight: "700",
        }}
      >
        Olá,
      </Text>
      <TextInput
        value={username}
        onChangeText={(name) => setUserName(name)}
        onEndEditing={handleName}
        maxLength={20}
        style={{
          color: "white",
          alignSelf: "center",
          fontSize: 30,
          fontWeight: "300",
          marginBottom: 30,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <UserBox mililiters={waterConsumption} days={""} />
        <UserBox mililiters={""} days={daysGoalMet} />
      </View>
      <View
        style={{
          marginTop: 40,
          alignSelf: "center",
          backgroundColor: colors.backgorundBox,
          borderRadius: 20,
        }}
      >
        <SettingsButton
          type={"reminder"}
          onPress={() => navigation.navigate("reminder")}
        />
        <SettingsButton
          type={"goal"}
          onPress={() => setGoalVisible(!isGoalVisible)}
        />
        <SettingsButton
          type={"sound"}
          onPress={() => setSoundVisible(!isSoundVisible)}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isGoalVisible}
        onRequestClose={() => {
          setGoalVisible(!isGoalVisible);
        }}
      >
        <GoalModal
          closeModal={() => setGoalVisible(!isGoalVisible)}
          title={"Defina uma meta diária"}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSoundVisible}
        onRequestClose={() => {
          setSoundVisible(!isSoundVisible);
        }}
      >
        <View
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "flex-end",
          }}
        >
          <SoundModal
            closeModal={() => setSoundVisible(!isSoundVisible)}
            title={"Sons e vibrações"}
          />
        </View>
      </Modal>
    </View>
  );
};

export default UserScreen;
