import { View, Text, Pressable, Linking } from "react-native";
import React from "react";

type Props = {
  innerClassName?: string;
  title: string;
  onPress?: () => void;
};

const AboutLink = ({ title, onPress, innerClassName }: Props) => {
  return (
    <Pressable
      className={`p-2 w-full justify-center border-y border-neutral-400 ${innerClassName}`}
      onPress={onPress}
    >
      <Text className="text-xl font-medium">{title}</Text>
    </Pressable>
  );
};

export default AboutLink;
