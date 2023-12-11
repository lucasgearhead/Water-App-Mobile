import React, { useState } from "react";
import { View, ScrollView, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertBox from "../Components/alerts/AlertBox";
import AlertModal from "../Components/modal/AlertModal";
import AddAlertButton from "../Components/alerts/AddAlertButton";
import { colors } from "../Constants/constants";
import { useNavigation } from "@react-navigation/native";
import { useNotification } from "../utils/notifications";

const ReminderScreen = () => {
  const { schedulePushNotifications } = useNotification();

  const [isModalVisible, setModalVisible] = useState(false);
  const [storedTimes, setStoredTimes] = useState([]);
  const navigation = useNavigation();

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

  const refresh = () => {
    setTimeout(() => {
      navigation.replace("reminder");
    }, 0);
    schedulePushNotifications();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const deleteTime = async (index) => {
    const updatedTimes = [...storedTimes];
    updatedTimes.splice(index, 1);
    setStoredTimes(updatedTimes);
    await AsyncStorage.setItem("selectedTimes", JSON.stringify(updatedTimes));
    refresh();
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: colors.white,
        }}
      >
        {storedTimes.map((time, index) => (
          <AlertBox key={index} time={time} onPress={() => deleteTime(index)} />
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
    </>
  );
};

export default ReminderScreen;
