import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { StyleSheet } from "react-native";

import { colors } from "../Constants/constants";

import TodayScreen from "../screens/Today";
import RelatoryScreen from "../screens/Relatory";
import UserScreen from "../screens/User";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: { color: "white", fontWeight: "700", fontSize: 16 },
        tabBarStyle: styles.tab,
      }}
    >
      <Tab.Screen
        name="Hoje"
        component={TodayScreen}
        options={{
          tabBarStyle: [styles.tab, { backgroundColor: colors.primary }],
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "water" : "water-outline"}
              color={"white"}
              size={35}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Relatório"
        component={RelatoryScreen}
        options={{
          tabBarStyle: [styles.tab, { backgroundColor: colors.terciary }],
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign
              name={focused ? "clockcircle" : "clockcircleo"}
              color={"white"}
              size={35}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Usuário"
        component={UserScreen}
        options={{
          tabBarStyle: [styles.tab, { backgroundColor: colors.terciary }],
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={"white"}
              size={35}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    height: 80,
    paddingBottom: 8,
    paddingTop: 5,
    borderTopColor: "#00000000",
    borderTopWidth: 0,
    elevation: 0,
  },
});
