import * as React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../Constants/constants";

const TodayScreen = () => {
  const [value, setValue] = React.useState("200");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.white,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 80,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 56 }}>0</Text>
          <Text style={{ paddingBottom: 10 }}>ml</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14 }}>Próximo lembrete 13:00</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, color: colors.grey }}>
            (Falta 2000 ml para atingir a meta)
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <View
          style={{
            position: "absolute",
            height: 300,
            width: 380,
            backgroundColor: colors.primary,
            bottom: -160,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 5,
              alignSelf: "center",
            }}
          >
            <TextInput
              style={{
                width: 50,
                color: colors.text,
                textAlign: "center",
                fontWeight: "500",
                borderWidth: 0,
                borderColor: "#00000000",
                borderWidth: 0,
              }}
              value={value}
              onChangeText={handleChange}
              keyboardType="numeric"
            />
            <Text
              style={{
                color: colors.text,
                fontWeight: "500",
                marginTop: 4,
              }}
            >
              ml
            </Text>
          </View>

          <TouchableOpacity
            style={{
              elevation: 10,
              marginBottom: 40,
              width: 180,
              alignSelf: "center",
              backgroundColor: colors.buttonColor,
              padding: 10,
              paddingHorizontal: 30,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>BEBER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TodayScreen;
