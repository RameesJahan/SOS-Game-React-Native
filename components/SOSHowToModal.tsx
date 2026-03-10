import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Modal, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SOSHowTo from "./SOSHowTo";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const SOSHowToModal = ({ visible, onClose }: Props) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-white">
        <SafeAreaView style={{ flex: 1 }}>
          <View className="flex-1 px-4">
            <View className="w-full items-end justify-center">
              <Pressable onPress={onClose}>
                <MaterialCommunityIcons
                  name="window-close"
                  size={32}
                  color="black"
                />
              </Pressable>
            </View>
            <SOSHowTo />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default SOSHowToModal;
