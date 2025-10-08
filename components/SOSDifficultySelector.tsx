import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AIDifficulty } from "@/utils/AILogic";
import Animated, {
  FadeInUp,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

type SOSDifficultySelectorProps = {
  difficulty: AIDifficulty;
  setDifficulty: (difficulty: AIDifficulty) => void;
};

const SOSDifficultySelector = ({
  difficulty,
  setDifficulty,
}: SOSDifficultySelectorProps) => {
  return (
    <Animated.View className="w-full" entering={FadeInUp} exiting={FadeOut}>
      <View className="flex-row border rounded-md mt-[12px]">
        <Pressable
          onPress={() => setDifficulty(AIDifficulty.EASY)}
          className={
            "flex-1 flex-row items-center justify-center py-[4px] " +
            (difficulty == AIDifficulty.EASY ? "bg-gray-700" : "")
          }
        >
          <Text
            className={
              "text-xl py-2 " +
              (difficulty == AIDifficulty.EASY ? "text-white" : "")
            }
            style={{ fontFamily: "Tempus-Sans" }}
          >
            Easy
          </Text>
        </Pressable>
        <View className="w-[1px] h-full bg-gray-700" />
        <Pressable
          onPress={() => setDifficulty(AIDifficulty.MEDIUM)}
          className={
            "flex-1 flex-row items-center justify-center py-[4px] " +
            (difficulty == AIDifficulty.MEDIUM ? "bg-gray-700" : "")
          }
        >
          <Text
            className={
              "text-xl py-2 " +
              (difficulty == AIDifficulty.MEDIUM ? "text-white" : "")
            }
            style={{ fontFamily: "Tempus-Sans" }}
          >
            Medium
          </Text>
        </Pressable>
        <View className="w-[1px] h-full bg-gray-700" />
        <Pressable
          onPress={() => setDifficulty(AIDifficulty.HARD)}
          className={
            "flex-1 flex-row items-center justify-center p-[4px] " +
            (difficulty == AIDifficulty.HARD ? "bg-gray-700" : "")
          }
        >
          <Text
            className={
              "text-xl py-2 " +
              (difficulty == AIDifficulty.HARD ? "text-white" : "")
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
