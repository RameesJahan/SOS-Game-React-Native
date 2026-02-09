import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";

type Props = {
  selected: number;
  onSelect: (value: number) => void;
};

const SOSNoPlayersSelector = ({ selected, onSelect }: Props) => {
  const arr = new Array(6).fill(0); // 2P, 3P, 4P, 5P
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex flex-row justify-center items-center gap-2 w-full">
        {arr.map((_, index) => (
          <Pressable
            key={index}
            className={
              "rounded-xl items-center justify-center py-3 px-7 " +
              (selected === index
                ? "bg-sos-green/20 sos-border-selected"
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
    </ScrollView>
  );
};

export default SOSNoPlayersSelector;
