import { View, Text, Pressable, TextInput } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  noRow: number;
  maxNoRow: number;
  setNoRow: (x: RowSelectorType) => void;
};

export enum RowSelectorType {
  ADD,
  LESS
}

const SOSHomeRowSelector = ({ noRow, setNoRow, maxNoRow }: Props) => {
  return (
    <View className="w-full flex flex-row items-center justify-between mt-8 px-1">
      <Text className="text-2xl " style={{ fontFamily: "Tempus-Sans" }}>
        Number of rows:
      </Text>
      <View className="flex flex-row items-center justify-center">
        <Pressable
          disabled={noRow <= 5}
          onPress={() =>
            setNoRow(RowSelectorType.LESS)
          }
        >
          <MaterialCommunityIcons
            name="minus-circle"
            size={32}
            color={noRow <= 5 ? "gray" : "black"}
          />
        </Pressable>
        <Text
          className="py-1 px-2 text-3xl text-center text-black"
          style={{ fontFamily: "Tempus-Sans" }}
        >{noRow}</Text>
        <Pressable
          disabled={noRow >= maxNoRow}
          onPress={() => setNoRow(RowSelectorType.ADD)}
        >
          <MaterialCommunityIcons
            name="plus-circle"
            size={32}
            color={noRow >= maxNoRow ? "gray" : "black"}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default SOSHomeRowSelector;
