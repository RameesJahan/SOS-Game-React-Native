import { Colors } from "@/constants/Colors";
import { useSavedColor } from "@/hooks/useSavedColor";
import { SOSSlot } from "@/types/types";
import React from "react";
import { Pressable, Text, View } from "react-native";

type SOSSelectorProps = {
  selected: SOSSlot;
  onSelect: (x: SOSSlot) => void;
};

const SOSSelector = ({ selected, onSelect }: SOSSelectorProps) => {
  const colorScheme = useSavedColor();

  return (
    <View className="flex flex-row p-12 gap-3">
      <Pressable
        className={`flex-1 aspect-square rounded-tr-md rounded-bl-md items-center justify-center ${selected == SOSSlot.S ? "bg-white sos-border-selected" : "bg-white sos-border"} `}
        onPress={() => onSelect(SOSSlot.S)}
      >
        <Text
          className={`text-[64px]`}
          style={{
            color:
              selected == SOSSlot.S
                ? Colors.light.sosGreen
                : Colors.light.sosInk,
            fontFamily: "Tempus-Sans",
          }}
        >
          S
        </Text>
      </Pressable>
      <Pressable
        className={`flex-1 aspect-square rounded-tr-md rounded-bl-md items-center justify-center ${selected == SOSSlot.O ? "bg-[#d3f5e4] sos-border-selected" : "bg-white sos-border"} `}
        onPress={() => onSelect(SOSSlot.O)}
      >
        <Text
          className={`text-[64px]`}
          style={{
            color:
              selected == SOSSlot.O
                ? Colors.light.sosGreen
                : Colors.light.sosInk,
            fontFamily: "Tempus-Sans",
          }}
        >
          O
        </Text>
      </Pressable>
    </View>
  );
};

export default SOSSelector;
