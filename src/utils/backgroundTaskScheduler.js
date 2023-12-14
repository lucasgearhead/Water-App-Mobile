import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundTask from "react-native-background-task";

const scheduleTask = async (time) => {
  BackgroundTask.define(async () => {
    console.log("Chamou");
    BackgroundTask.finish();
  });

  const [hours, minutes] = time.split(":");
  const scheduledMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

  BackgroundTask.schedule({
    taskId: `myTaskId-${time}`,
    forceAlarmManager: true,
    period: 60 * 60 * 24,
    allowExecutionInForeground: true,
    exact: true,
    delay: scheduledMinutes * 60,
  });
};

const scheduleBackgroundTasks = async () => {
  try {
    const selectedTimesString = await AsyncStorage.getItem("selectedTimes");
    console.log(selectedTimesString);
    if (selectedTimesString) {
      const scheduleTimes = JSON.parse(selectedTimesString);

      scheduleTimes.forEach((time) => {
        scheduleTask(time);
      });
    }
  } catch (error) {
    console.error("Erro ao recuperar os horários do AsyncStorage:", error);
  }
};

export { scheduleBackgroundTasks };
