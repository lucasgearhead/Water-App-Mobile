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
import { LineChart, YAxis, XAxis } from "react-native-svg-charts";
import { Circle } from "react-native-svg";
import * as shape from "d3-shape";
import RegistersBox from "../Components/registers/registersBox";

const colors = {
  background: "#ffffff",
  primary: "#007bff",
  card: "#f0f0f0",
  text: "#333333",
  delete: "#ff0000",
  white: "#ffffff",
};

const Decorator = ({ x, y, data }) => {
  return data.map((value, index) => (
    <View key={index}>
      <Circle
        cx={x(index)}
        cy={y(value)}
        r={3}
        stroke={colors.primary}
        fill={colors.primary}
      />
    </View>
  ));
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

      {todayCups.length === 0 ? (
        <View style={styles.noRecordsContainer}>
          <Text style={styles.noRecordsText}>
            Seu histórico de consumo será exibido aqui
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.chartContainer}>
            <LineChart
              style={styles.chart}
              data={todayCups.map((cup) => cup.value)}
              svg={{ stroke: colors.primary }}
              contentInset={{ top: 20, bottom: 20, right: 20, left: 20 }}
              curve={shape.curveNatural}
            >
              <Decorator />
            </LineChart>
            <YAxis
              data={todayCups.map((cup) => cup.value)}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{ fill: "grey", fontSize: 10 }}
            />
            <XAxis
              data={todayCups.map((_, index) => index)}
              formatLabel={(value, index) => index}
              contentInset={{ left: 30, right: 30 }}
              svg={{ fontSize: 10, fill: "black" }}
            />
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "blue",
              width: "100%",
              marginVertical: 10,
            }}
          />
          {todayCups.map((cup) => (
            <RegistersBox
              time={`${cup.value} ml`}
              value={`${new Date(cup.timestamp).toLocaleTimeString()}`}
              onPress={() => handleDeleteCup(cup.timestamp)}
              key={cup.timestamp}
            />
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
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
  chartContainer: {
    height: 300,
    flexDirection: "row",
  },
  chart: {
    flex: 1,
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
  noRecordsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  noRecordsText: {
    fontSize: 18,
    color: colors.text,
  },
});

export default RelatoryScreen;
