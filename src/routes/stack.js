import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { Switch, TouchableOpacity } from "react-native";
import ReminderScreen from "../screens/Reminder";
import TabRoutes from "./tab";
import { colors } from "../Constants/constants";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
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
        }}
      />
    </Stack.Navigator>
  );
}
