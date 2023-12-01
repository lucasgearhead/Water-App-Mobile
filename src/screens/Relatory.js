import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Importe os ícones necessários (você pode usar outros pacotes de ícones)

const CustomHeader = () => {
  const [selectedButton, setSelectedButton] = React.useState("Dia");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [daysOfWeek, setDaysOfWeek] = React.useState([
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ]);
  const [months, setMonths] = React.useState([
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]);

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
    if (buttonName === "Dia") {
      setDaysOfWeek([
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ]);
    } else if (buttonName === "Semana") {
      // Lógica para definir a semana
      // ...
    } else if (buttonName === "Mês") {
      setMonths([
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ]);
    }
  };

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    if (selectedButton === "Dia") {
      newDate.setDate(selectedDate.getDate() - 1);
    } else if (selectedButton === "Mês") {
      newDate.setMonth(selectedDate.getMonth() - 1);
    }
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    if (selectedButton === "Dia") {
      newDate.setDate(selectedDate.getDate() + 1);
    } else if (selectedButton === "Mês") {
      newDate.setMonth(selectedDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Dia")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === "Dia" && styles.selectedButtonText,
            ]}
          >
            Dia
          </Text>
          {selectedButton === "Dia" && <View style={styles.bottomLine} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Semana")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === "Semana" && styles.selectedButtonText,
            ]}
          >
            Semana
          </Text>
          {selectedButton === "Semana" && <View style={styles.bottomLine} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Mês")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === "Mês" && styles.selectedButtonText,
            ]}
          >
            Mês
          </Text>
          {selectedButton === "Mês" && <View style={styles.bottomLine} />}
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handlePrevDay}
          disabled={selectedButton !== "Dia" && selectedButton !== "Mês"}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.dayText}>
          {selectedButton === "Dia"
            ? daysOfWeek[selectedDate.getDay()]
            : selectedButton === "Mês"
            ? months[selectedDate.getMonth()]
            : "Texto para outras seleções"}
        </Text>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handleNextDay}
          disabled={selectedButton !== "Dia" && selectedButton !== "Mês"}
        >
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RelatoryScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />
      <View
        style={{
          backgroundColor: "#0A46CA",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white" }}>Relatory Screen</Text>
      </View>
    </View>
  );
};

export default RelatoryScreen;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 65,
    backgroundColor: "#0A46CA",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 55,
    backgroundColor: "#0C3DAE",
  },
  dayText: {
    color: "white",
    fontSize: 25,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  arrowButton: {
    padding: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  selectedButtonText: {
    fontWeight: "bold",
  },
  bottomLine: {
    paddingTop: 8,
    width: "100%",
    borderBottomWidth: 3,
    borderBottomColor: "white",
  },
});
