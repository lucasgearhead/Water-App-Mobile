import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { Switch, TouchableOpacity } from "react-native";
import ReminderScreen from "../screens/Reminder";
import TabRoutes from "./tab";
import { colors } from "../Constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  const [remindersSwitchValue, setRemindersSwitchValue] = useState(false);

  useEffect(() => {
    const getStoredValue = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("remindersSwitchValue");
        if (storedValue !== null) {
          setRemindersSwitchValue(storedValue === "true");
        }
      } catch (error) {
        console.error("Error getting stored goal value:", error);
      }
    };
    getStoredValue();
  }, []);

  useEffect(() => {
    try {
      AsyncStorage.setItem(
        "remindersSwitchValue",
        remindersSwitchValue.toString()
      );
    } catch (error) {
      console.error("Error saving user name:", error);
    }
    console.log("Reminder -", remindersSwitchValue);
  }, [remindersSwitchValue]);

  return (
    <Stack.Navigator initialRouteName="tabs">
      <Stack.Screen
        name="tabs"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="reminder"
        component={ReminderScreen}
        options={{
          headerTransparent: false,
          headerStyle: { backgroundColor: colors.white },
          headerShadowVisible: false,
          headerShown: true,
          title: "Lembretes",
          animation: "none",
          headerRight: () => (
            <Switch
              value={remindersSwitchValue}
              onValueChange={() =>
                setRemindersSwitchValue(!remindersSwitchValue)
              }
              trackColor={{ false: "#b2b2b2", true: colors.secondary }}
              thumbColor={remindersSwitchValue ? colors.primary : "#dcdcdc"}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
