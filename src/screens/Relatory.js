import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { LineChart, YAxis, XAxis } from "react-native-svg-charts";
import { Circle } from "react-native-svg";
import * as shape from "d3-shape";
import RegistersBox from "../Components/registers/registersBox";
import { colors } from "../Constants/constants";

const Decorator = ({ x, y, data }) => {
  return data.map((value, index) => (
    <View key={index}>
      <Circle
        cx={x(index)}
        cy={y(value)}
        r={3}
        stroke={colors.white}
        fill={colors.backgorundBox}
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
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Relatório Diário</Text>
      </View>
      <ScrollView style={styles.container}>
        {todayCups.length === 0 ? (
          <View style={styles.noRecordsContainer}>
            <Text style={styles.noRecordsText}>Não houve consumo hoje.</Text>
          </View>
        ) : (
          <>
            <View style={styles.chartContainer}>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <LineChart
                  style={styles.chart}
                  data={todayCups.map((cup) => cup.value)}
                  svg={{ stroke: colors.white }}
                  contentInset={{ top: 20, bottom: 20, right: 20, left: 20 }}
                  curve={shape.curveNatural}
                >
                  <Decorator />
                </LineChart>
                <YAxis
                  data={todayCups.map((cup) => cup.value)}
                  contentInset={{ top: 20, bottom: 20 }}
                  svg={{ fill: "white", fontSize: 12 }}
                />
              </View>
              <View>
                <XAxis
                  data={todayCups.map((cup) => cup.timestamp)}
                  formatLabel={(value, index) => {
                    const cupDate = new Date(todayCups[index].timestamp);
                    return cupDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  }}
                  contentInset={{ left: 45, right: 20 }}
                  svg={{ fontSize: 10, fill: "white" }}
                />
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: colors.backgorundBox,
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: colors.terciary,
  },
  header: {
    backgroundColor: colors.terciary,
    paddingTop: 35,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    alignSelf: "center",
  },
  chartContainer: {
    height: 350,
    width: "100%",
    flexDirection: "column",
    backgroundColor: colors.backgorundBox,
    borderRadius: 20,
    padding: 10,
  },
  chart: {
    flex: 1,
  },
  noRecordsContainer: {
    height: Dimensions.get("screen").height - 200,
    alignItems: "center",
    justifyContent: "center",
  },
  noRecordsText: {
    fontSize: 25,
    fontWeight: "500",
    color: colors.text,
  },
});

export default RelatoryScreen;
