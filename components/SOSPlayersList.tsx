import { View, Text, Pressable } from "react-native";
import React from "react";
import { Player } from "@/types/types";
import SOSPlayersListCard from "./SOSPlayersListCard";

interface SOSPlayerListProps {
  players: Array<Player>;
  currentTurn: number;
}

const SOSPlayersList = ({ players, currentTurn }: SOSPlayerListProps) => {
  return (
      <View className="flex flex-row flex-wrap p-1">
        {players.map((player, index) => (
          <View key={index} className="w-1/2 p-1">
            <SOSPlayersListCard selected={index === currentTurn} player={player} />
          </View>
        ))}
      </View>
  );
};

export default SOSPlayersList;
