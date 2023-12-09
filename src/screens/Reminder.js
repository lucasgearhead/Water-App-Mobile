import React, { useState, useEffect } from "react";
import { View, ScrollView, Modal, Text, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertBox from "../Components/alerts/AlertBox";
import AlertModal from "../Components/modal/AlertModal";
import AddAlertButton from "../Components/alerts/AddAlertButton";
import { colors } from "../Constants/constants";

const ReminderScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [storedTimes, setStoredTimes] = useState([]);

  // Use useFocusEffect instead of useEffect
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const storedTimesString = await AsyncStorage.getItem("selectedTimes");
          let storedTimesArray = storedTimesString
            ? JSON.parse(storedTimesString)
            : [];
          storedTimesArray = storedTimesArray.sort((a, b) => {
            const [aHour, aMinute] = a.split(":").map(Number);
            const [bHour, bMinute] = b.split(":").map(Number);

            const totalMinutesA = aHour * 60 + aMinute;
            const totalMinutesB = bHour * 60 + bMinute;

            return totalMinutesA - totalMinutesB;
          });

          setStoredTimes(storedTimesArray);
        } catch (error) {
          console.error("Error fetching data from AsyncStorage:", error);
        }
      };

      fetchData();
    }, [])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedTimesString = await AsyncStorage.getItem("selectedTimes");
        const storedTimesArray = storedTimesString
          ? JSON.parse(storedTimesString)
          : [];
        setStoredTimes(JSON.parse(storedTimesArray));
        console.log(storedTimes);
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };
    fetchData();
  }, [isModalVisible]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const bin = async () => {
    await AsyncStorage.setItem("selectedTimes", "");
  };

  const deleteItemAtIndex = async (index) => {
    try {
      const data = await AsyncStorage.getItem("sua_chave_de_armazenamento");
      const dataArray = data ? JSON.parse(data) : [];
      const filteredArray = dataArray.filter((item, i) => i !== index);
      await AsyncStorage.setItem(
        "sua_chave_de_armazenamento",
        JSON.stringify(filteredArray)
      );
      console.log("Item deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: colors.white,
        }}
      >
        {storedTimes.map((time, index) => (
          <AlertBox
            key={index}
            time={time}
            onPress={deleteItemAtIndex(index)}
          />
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
          <AlertModal closeModal={toggleModal} title={"Defina um lembrete"} />
        </View>
      </Modal>
      <Button title="limpar" onPress={bin} />
    </>
  );
};

export default ReminderScreen;
