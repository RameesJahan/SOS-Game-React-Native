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
    <View className="w-full flex flex-row items-center justify-between">
      <Text
        className="text-lg text-sos-ink uppercase tracking-wide"
        style={{ fontFamily: "Tempus-Sans" }}
      >
        Rows
      </Text>
      <View className="flex flex-row items-center gap-2 rounded-xl border-2 border-dashed border-gray-400 px-2 py-1">
        <Pressable
          disabled={noRow <= 5}
          onPress={() => setNoRow(RowSelectorType.LESS)}
          className="rounded-lg border-2 border-sos-ink p-1 bg-white min-w-[36px] items-center justify-center"
        >
          <MaterialCommunityIcons
            name="minus"
            size={22}
            color={noRow <= 5 ? "#9ca3af" : "#0a0a0a"}
          />
        </Pressable>
        <Text
          className="text-2xl text-sos-ink min-w-[40px] text-center"
          style={{ fontFamily: "Tempus-Sans" }}
        >
          {noRow}
        </Text>
        <Pressable
          disabled={noRow >= maxNoRow}
          onPress={() => setNoRow(RowSelectorType.ADD)}
          className={
            "rounded-lg border-2 border-sos-ink p-1 min-w-[36px] items-center justify-center " +
            (noRow >= maxNoRow ? "bg-white" : "bg-sos-green")
          }
        >
          <MaterialCommunityIcons
            name="plus"
            size={22}
            color={noRow >= maxNoRow ? "#9ca3af" : "#0a0a0a"}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default SOSHomeRowSelector;
