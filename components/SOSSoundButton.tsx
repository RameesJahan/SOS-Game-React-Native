import { useSoundContext } from "@/context/sound-context";
import { Image } from "expo-image";
import React from "react";
import { Pressable } from "react-native";

const SOSSoundButton = ({ size = 48 }: { size?: number}) => {
  const { isSoundOn, setIsSoundOn } = useSoundContext();
  return (
    <Pressable onPress={() => setIsSoundOn(!isSoundOn)}>
      <Image
        style={{
          width: size,
          height:  size
        }}
        source={
          isSoundOn
            ? require("@/assets/images/sound-on.png")
            : require("@/assets/images/sound-off.png")
        }
      />
    </Pressable>
  );
};

export default SOSSoundButton;
