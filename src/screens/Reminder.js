import React, { useState } from "react";
import { View, ScrollView, Modal } from "react-native";

import AlertBox from "../Components/alerts/AlertBox";
import AddAlertButton from "../Components/alerts/AddAlertButton";

import { colors } from "../Constants/constants";
import AlertModal from "../Components/modal/AlertModal";

const ReminderScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <>
      <ScrollView
        style={{ backgroundColor: colors.white, paddingVertical: 10 }}
      >
        <AlertBox time={"10:00"} />

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
