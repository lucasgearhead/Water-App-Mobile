import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function useNotification() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  async function checkNotificationPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Permissões de notificação não foram concedidas");
    }
  }

  useEffect(() => {
    checkNotificationPermissions();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const schedulePushNotifications = async () => {
    try {
      const storedTimes = await AsyncStorage.getItem("selectedTimes");
      if (storedTimes) {
        const hours = JSON.parse(storedTimes);
        console.log(hours);
        for (const hour of hours) {
          const trigger = {
            hour: parseInt(hour.split(":")[0], 10),
            minute: parseInt(hour.split(":")[1], 10),
            repeats: true,
          };

          await schedulePushNotification(trigger);
        }
      }
    } catch (error) {
      console.error("Erro ao agendar notificações:", error);
    }
  };

  return {
    schedulePushNotifications,
  };
}

export async function schedulePushNotification(liter) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `litros: ${liter}`,
    },
    trigger: null,
  });
}
