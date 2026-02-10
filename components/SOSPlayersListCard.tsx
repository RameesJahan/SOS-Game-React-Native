import { View, Text } from "react-native";
import React from "react";
import { Player } from "@/types/types";

type Props = {
  player: Player;
  selected: boolean;
};

const SOSPlayersListCard = ({ player, selected }: Props) => {
  return (
    <View
      className={`flex flex-row items-center overflow-hidden rounded-md px-2 gap-x-2 bg-white ${
        selected ? "sos-border-selected" : "sos-border"
      }`}
    >
      <View
        className="flex w-5 h-5 rounded-full"
        style={{ backgroundColor: player.color }}
      />
      <Text
        className="text-lg grow"
        style={{
          fontFamily: "Tempus-Sans",
        }}
      >
        {player.name}
      </Text>
      <Text
        className={`text-lg border-l px-2 ${selected ? "border-sos-green" : "border-sos-ink"}`}
        style={{
          fontFamily: "Tempus-Sans",
        }}
      >
        {player.score}
      </Text>
    </View>
  );
};

export default SOSPlayersListCard;
