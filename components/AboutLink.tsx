import { View, Text, Pressable } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  title: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
  isLast?: boolean;
};

const AboutLink = ({ title, icon, onPress, isLast }: Props) => {
  return (
    <Pressable
      className={`flex-row items-center justify-between p-4 active:bg-gray-100 rounded-xl ${!isLast ? "border-b border-gray-200" : ""}`}
      onPress={onPress}
    >
      <View className="flex-row items-center">
        {icon && <MaterialCommunityIcons name={icon} size={24} color="#1A1A1A" style={{ marginRight: 12 }} />}
        <Text className="text-lg text-sos-ink" style={{ fontFamily: "Tempus-Sans" }}>{title}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
    </Pressable>
  );
};

export default AboutLink;
