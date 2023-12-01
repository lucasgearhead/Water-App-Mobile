import { React, useState } from "react";
import { View, Text, Modal } from "react-native";

import { colors } from "../Constants/constants";
import UserBox from "../Components/user/boxes/UserBox";
import SettingsButton from "../Components/user/buttons/SettingsButton";

import GenericModal from "../Components/modal/GenericModal";

const UserScreen = ({ navigation }) => {
  const [isSoundVisible, setSoundVisible] = useState(false);
  const [isGoalVisible, setGoalVisible] = useState(false);

  const handleNavigation = () => {
    navigation.navigate("reminder");
  };

  const handleGoal = () => {
    setGoalVisible(!isGoalVisible);
  };

  const handleSound = () => {
    setSoundVisible(!isSoundVisible);
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
      <Text
        style={{
          color: "white",
          alignSelf: "center",
          fontSize: 30,
          fontWeight: "300",
          marginBottom: 30,
        }}
      >
        Lucas Dias C. Silva
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <UserBox mililiters={9} days={""} />
        <UserBox mililiters={""} days={5} />
      </View>
      <View
        style={{
          marginTop: 40,
          alignSelf: "center",
          backgroundColor: colors.backgorundBox,
          borderRadius: 20,
        }}
      >
        <SettingsButton type={"reminder"} onPress={handleNavigation} />
        <SettingsButton type={"goal"} onPress={handleGoal} />
        <SettingsButton type={"sound"} onPress={handleSound} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isGoalVisible}
        onRequestClose={() => {
          setGoalVisible(!isGoalVisible);
        }}
      >
        <GenericModal
          closeModal={handleGoal}
          type={"goal"}
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
        <GenericModal
          closeModal={handleSound}
          type={"sound"}
          title={"Sons e vibrações"}
        />
      </Modal>
    </View>
  );
};

export default UserScreen;
