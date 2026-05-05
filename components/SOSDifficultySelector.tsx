import { AIDifficulty } from "@/utils/AILogic";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

type SOSDifficultySelectorProps = {
  disabled: boolean;
  difficulty: AIDifficulty;
  setDifficulty: (difficulty: AIDifficulty) => void;
};

const SOSDifficultySelector = ({
  disabled,
  difficulty,
  setDifficulty,
}: SOSDifficultySelectorProps) => {
  return (
    <Animated.View
      className={`w-full ${disabled ? "opacity-50" : ""}`}
      entering={FadeInDown}
      exiting={FadeInUp}
    >
      <View className="flex-row rounded-md border-2 border-gray-200 overflow-hidden bg-gray-200 gap-2">
        <Pressable
          disabled={disabled}
          onPress={() => setDifficulty(AIDifficulty.EASY)}
          className={
            "flex-1 items-center justify-center py-3 rounded-md " +
            (difficulty === AIDifficulty.EASY ? "bg-sos-green" : "")
          }
        >
          <Text
            className={
              "text-lg " +
              (difficulty === AIDifficulty.EASY
                ? "text-sos-ink"
                : "text-gray-500")
            }
            style={{ fontFamily: "Tempus-Sans" }}
          >
            Easy
          </Text>
        </Pressable>
        <Pressable
          disabled={disabled}
          onPress={() => setDifficulty(AIDifficulty.MEDIUM)}
          className={
            "flex-1 items-center justify-center py-3 rounded-md " +
            (difficulty === AIDifficulty.MEDIUM ? "bg-sos-green" : "")
          }
        >
          <Text
            className={
              "text-lg " +
              (difficulty === AIDifficulty.MEDIUM
                ? "text-sos-ink"
                : "text-gray-500")
            }
            style={{ fontFamily: "Tempus-Sans" }}
          >
            Medium
          </Text>
        </Pressable>
        <Pressable
          disabled={disabled}
          onPress={() => setDifficulty(AIDifficulty.HARD)}
          className={
            "flex-1 items-center justify-center py-3 rounded-md " +
            (difficulty === AIDifficulty.HARD ? "bg-sos-green" : "")
          }
        >
          <Text
            className={
              "text-lg " +
              (difficulty === AIDifficulty.HARD
                ? "text-sos-ink"
                : "text-gray-500")
            }
            style={{ fontFamily: "Tempus-Sans" }}
          >
            Hard
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default SOSDifficultySelector;

const styles = StyleSheet.create({});
