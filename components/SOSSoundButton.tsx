import { useSoundContext } from "@/context/sound-context";
import { Image } from "expo-image";
import React from "react";
import { Pressable } from "react-native";
import SOSStyledButton from "./SOSStyledButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/Colors";

const SOSSoundButton = ({ size = 38 }: { size?: number }) => {
  const { isSoundOn, setIsSoundOn } = useSoundContext();
  return (
    <SOSStyledButton
      key={`sound-button-${isSoundOn}`}
      onPress={() => setIsSoundOn(!isSoundOn)}
      selected={isSoundOn}
    >
      <MaterialCommunityIcons
        name="volume-high"
        size={size}
        color={isSoundOn ? Colors.light.sosGreen : Colors.light.sosInk}
      />
    </SOSStyledButton>
  );
};

export default SOSSoundButton;
