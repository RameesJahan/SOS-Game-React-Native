import { PlayerData } from "@/types/types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type PlayerCardProps = {
  player: PlayerData;
  playersList: PlayerData[];
  index: number;
  onPlayerTypeToggle: (index: number) => void;
  onPlayersNameChange: (text: string, index: number) => void;
  onPlayerColorChange: (index: number, color: string) => void;
};

const PlayerDataColors = [
  "#000000", // black
  "#2563eb", // blue
  "#dc2626", // red
  "#9333ea", // purple
  "#00a63e", // green
  "#ffdf20", // yellow
  "#f6339a", // pink
];

const PlayerCard = ({
  player,
  playersList,
  index,
  onPlayerTypeToggle,
  onPlayersNameChange,
  onPlayerColorChange,
}: PlayerCardProps) => {
  return (
    <View className="w-full rounded-2xl sos-border bg-white p-3 mb-3 shadow-card relative">
      <View className="flex-row items-center justify-between">
        {/* Player label */}
        <Text
          className="text-xs uppercase text-gray-400 mb-1"
          style={{ fontFamily: "Tempus-Sans" }}
        >
          PLAYER {String(index + 1).padStart(2, "0")}
        </Text>
        {/* Human/AI selector top-right (replaces star) */}
        <View>
          <View className="flex-row rounded-md border-2 border-gray-200 overflow-hidden bg-gray-200">
            <Pressable
              onPress={() => onPlayerTypeToggle(index)}
              className={`px-3 py-2 rounded-md items-center justify-center ${
                !player.isAi ? "bg-sos-green" : ""
              }`}
            >
              <Text
                className={`text-xs ${
                  !player.isAi ? "text-sos-ink" : "text-gray-400"
                }`}
                style={{ fontFamily: "Tempus-Sans" }}
              >
                HUMAN
              </Text>
            </Pressable>
            <Pressable
              onPress={() => onPlayerTypeToggle(index)}
              className={`px-3 py-1 rounded-md items-center justify-center ${
                player.isAi ? "bg-sos-green" : ""
              }`}
            >
              <Text
                className={`text-xs ${
                  player.isAi ? "text-sos-ink" : "text-gray-400"
                }`}
                style={{ fontFamily: "Tempus-Sans" }}
              >
                AI
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Name input with dotted underline */}
      <View className="mb-2 relative">
        <TextInput
          className="text-base text-sos-ink pb-1.5"
          style={{
            fontFamily: "Tempus-Sans",
          }}
          value={player.name}
          onChangeText={(text) => onPlayersNameChange(text, index)}
          placeholder="Enter name"
          placeholderTextColor="#9ca3af"
        />
        <View
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#d1d5db",
            borderStyle: "dashed",
          }}
        />
        {player.name && (
          <View className="absolute right-0 top-0.5">
            <MaterialCommunityIcons
              name="pencil-outline"
              size={14}
              color="#9ca3af"
            />
          </View>
        )}
      </View>

      {/* Signature Ink Color Picker */}
      <View className="flex-row items-center">
        <Text
          className="text-sm text-sos-ink mr-2"
          style={{ fontFamily: "Tempus-Sans" }}
        >
          Ink:
        </Text>
        <View className="flex-row gap-1.5">
          {PlayerDataColors.map((color) => {
            const isColorSelectedByOther = playersList.some(
              (p, i) => i !== index && p.color === color,
            );

            return (
              <Pressable
                key={color}
                disabled={isColorSelectedByOther}
                onPress={() => onPlayerColorChange(index, color)}
                className={`w-7 h-7 rounded-full border-2 ${
                  player.color === color ? "border-sos-green" : "border-sos-ink"
                }`}
                style={{
                  backgroundColor: color,
                  opacity: isColorSelectedByOther ? 0.3 : 1,
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default PlayerCard;
