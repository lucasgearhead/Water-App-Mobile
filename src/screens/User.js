import React, { useEffect, useState } from "react";
import { View, Text, Modal, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";

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
          const storedGoalMetValue = await AsyncStorage.getItem("goalMet");
          const storedWaterConsumptionValue = await AsyncStorage.getItem(
            "waterConsumption"
          );
          if (storedNameValue !== null) {
            setUserName(storedNameValue);
          }
          if (storedGoalMetValue !== null) {
            setDaysGoalMet(storedGoalMetValue);
          }
          if (storedWaterConsumptionValue !== null) {
            setWaterConsumption(storedWaterConsumptionValue);
          }
        } catch (error) {
          console.error("Error getting stored goal value:", error);
        }
      };

      getStoredValue();
    }, [])
  );

  const handleName = () => {
    try {
      AsyncStorage.setItem("userName", username);
      console.log("Username sucessfull saved - ", username);
      alert(`Nome salvo com sucesso, bem-vindo ${username}`);
    } catch (error) {
      console.error("Error saving user name:", error);
      alert(`Erro ao salvar o nome de usuário`, error);
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
