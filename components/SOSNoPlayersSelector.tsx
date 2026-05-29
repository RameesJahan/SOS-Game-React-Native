import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";

type Props = {
  selected: number;
  onSelect: (value: number) => void;
};

const SOSNoPlayersSelector = ({ selected, onSelect }: Props) => {
  const arr = new Array(6).fill(0); // 2P, 3P, 4P, 5P
  return (
    <View>
      <View className="flex flex-row flex-wrap justify-center items-center gap-2 w-full">
        {arr.map((_, index) => (
          <Pressable
            key={index}
            className={
              "flex-1 basis-1/3 rounded-xl items-center justify-center py-3 px-7 " +
              (selected === index
                ? "bg-[#d3f5e4] sos-border-selected"
                : "bg-white sos-border")
            }
            onPress={() => onSelect(index)}
          >
            <Text
              className="text-lg text-sos-ink"
              style={{ fontFamily: "Tempus-Sans" }}
            >
              {index + 2}P
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default SOSNoPlayersSelector;
