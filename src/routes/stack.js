import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, View, Switch } from "react-native";

import ReminderScreen from "../screens/Reminder";
import TabRoutes from "./tab";

import { colors } from "../Constants/constants";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  const [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = () => {
    setSwitchValue((prevValue) => !prevValue);
  };

  return (
    <Stack.Navigator>
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
          headerShown: true,
          title: "Lembretes",
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Switch
                value={switchValue}
                onValueChange={toggleSwitch}
                trackColor={{ false: "#b2b2b2", true: colors.secondary }}
                thumbColor={switchValue ? colors.primary : "#dcdcdc"}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
