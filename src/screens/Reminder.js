import React, { useState } from "react";
import { View, ScrollView, Modal, Text } from "react-native";

import AlertBox from "../Components/alerts/AlertBox";
import AddAlertButton from "../Components/alerts/AddAlertButton";

import { colors } from "../Constants/constants";
import AlertModal from "../Components/modal/AlertModal";

const ReminderScreen = ({ horarios, onDelete, onToggleSwitch }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const dados = ["10:00", "12:00", "13:00", "12:25"];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const componentes = dados.map((time, index) => (
    <AlertBox key={index} time={time} />
  ));

  return (
    <>
      <ScrollView
        style={{ backgroundColor: colors.white, paddingVertical: 10 }}
      >
        {componentes}
        <View style={{ height: 150 }} />
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
        <AlertModal closeModal={toggleModal} title={"Defina um lembrete"} />
      </Modal>
    </>
  );
};

export default ReminderScreen;
