import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// Defina ou importe seu objeto colors
const colors = {
  background: "#ffffff",
  primary: "#007bff",
  card: "#f0f0f0",
  text: "#333333",
  delete: "#ff0000",
  white: "#ffffff",
};

const RelatoryScreen = () => {
  const [todayCups, setTodayCups] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchTodayCups = async () => {
        try {
          const storedCups = await AsyncStorage.getItem("cupsValue");
          if (storedCups !== null) {
            const cupsArray = JSON.parse(storedCups);
            const todayCups = cupsArray.filter((cup) => {
              const cupDate = new Date(cup.timestamp);
              const today = new Date();
              return (
                cupDate.getDate() === today.getDate() &&
                cupDate.getMonth() === today.getMonth() &&
                cupDate.getFullYear() === today.getFullYear()
              );
            });
            setTodayCups(todayCups);
          }
        } catch (error) {
          console.error("Error fetching today cups:", error);
        }
      };

      fetchTodayCups();
    }, [])
  );

  const handleDeleteCup = async (cupTimestamp) => {
    try {
      const storedCups = await AsyncStorage.getItem("cupsValue");
      if (storedCups !== null) {
        const cupsArray = JSON.parse(storedCups);
        const updatedCups = cupsArray.filter(
          (cup) => cup.timestamp !== cupTimestamp
        );
        await AsyncStorage.setItem("cupsValue", JSON.stringify(updatedCups));
        setTodayCups(updatedCups);
      }
    } catch (error) {
      console.error("Error deleting cup:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Relatório Diário</Text>
      {todayCups.map((cup) => (
        <View key={cup.timestamp} style={styles.cupContainer}>
          <Text style={styles.cupText}>{`Volume: ${cup.value} ml`}</Text>
          <Text style={styles.cupText}>{`Hora: ${new Date(
            cup.timestamp
          ).toLocaleTimeString()}`}</Text>
          <TouchableOpacity
            onPress={() => handleDeleteCup(cup.timestamp)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Deletar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.primary,
  },
  cupContainer: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cupText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: colors.delete,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default RelatoryScreen;
