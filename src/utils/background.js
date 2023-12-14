import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Background() {
  const programarExecucao = async () => {
    try {
      const horariosArmazenados = await AsyncStorage.getItem("selectedTimes");
      console.log(horariosArmazenados);
      if (horariosArmazenados !== null) {
        const horarios = JSON.parse(horariosArmazenados);

        const agora = new Date();
        const agoraString = `${agora.getHours()}:${agora.getMinutes()}`;
        console.log(agoraString);

        horarios.forEach((horario) => {
          const horarioAlvo = horario;
          console.log(horarioAlvo);

          // Converter horárioAlvo para um objeto Date
          const partesHorarioAlvo = horarioAlvo.split(":");
          const horarioAlvoData = new Date(
            agora.getFullYear(),
            agora.getMonth(),
            agora.getDate(),
            parseInt(partesHorarioAlvo[0]),
            parseInt(partesHorarioAlvo[1])
          );

          const diferencaTempo = horarioAlvoData - agora;
          console.log(diferencaTempo);

          if (diferencaTempo > 0) {
            setTimeout(() => {
              console.log("deu, la ele");
            }, diferencaTempo);
          }
        });
      }
    } catch (error) {
      console.error("Erro ao carregar horários do AsyncStorage:", error);
    }
  };

  return {
    programarExecucao,
  };
}
