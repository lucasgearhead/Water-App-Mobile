import React, { useState, useEffect } from "react";
import { View, ScrollView, Modal, Text, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertBox from "../Components/alerts/AlertBox";
import AlertModal from "../Components/modal/AlertModal";
import AddAlertButton from "../Components/alerts/AddAlertButton";
import { colors } from "../Constants/constants";
import { useNavigation } from "@react-navigation/native";

const ReminderScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [storedTimes, setStoredTimes] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const callTimes = async () => {
        try {
          const horasSalvas = await AsyncStorage.getItem("selectedTimes");
          if (horasSalvas) {
            setStoredTimes(JSON.parse(horasSalvas).sort());
          }
        } catch (error) {
          console.error("Erro ao carregar horas do AsyncStorage:", error);
        }
      };
      callTimes();
    }, [])
  );

  const navigation = useNavigation();

  const refresh = () => {
    navigation.replace("reminder", { Animation: false });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const bin = async () => {
    await AsyncStorage.setItem("selectedTimes", "");
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: colors.white,
        }}
      >
        {storedTimes.map((time, index) => (
          <AlertBox key={index} time={time} />
        ))}
        <View style={{ height: 130, backgroundColor: "#00000000" }} />
      </ScrollView>
      <AddAlertButton onPress={toggleModal} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AlertModal
            closeModal={toggleModal}
            title={"Defina um lembrete"}
            onConfirm={refresh}
          />
        </View>
      </Modal>
      <Button title="limpar" onPress={bin} />
    </>
  );
};

export default ReminderScreen;
