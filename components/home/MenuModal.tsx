import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface MenuModalProps {
  visible: boolean;
  onClose: () => void;
  onRemoveAds?: () => void;
  onShare?: () => void;
  onInfo?: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({
  visible,
  onClose,
  onRemoveAds,
  onShare,
  onInfo,
}) => {
  if (!visible) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-center items-center px-6"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View className="bg-white w-full rounded-2xl p-6 sos-border shadow-card">
          <Text
            className="text-xl text-sos-ink mb-6 text-center"
            style={{ fontFamily: "Tempus-Sans" }}
          >
            Menu
          </Text>

          <View className="flex-col gap-3">
            <Pressable
              onPress={onRemoveAds}
              className="w-full rounded-xl py-3 items-center justify-center bg-sos-green sos-border"
            >
              <Text
                className="text-lg uppercase text-sos-ink"
                style={{ fontFamily: "Tempus-Sans" }}
              >
                Remove Ads
              </Text>
            </Pressable>

            <Pressable
              onPress={onShare}
              className="w-full rounded-xl py-3 items-center justify-center bg-sos-green sos-border"
            >
              <Text
                className="text-lg uppercase text-sos-ink"
                style={{ fontFamily: "Tempus-Sans" }}
              >
                Share
              </Text>
            </Pressable>

            <Pressable
              onPress={onInfo}
              className="w-full rounded-xl py-3 items-center justify-center bg-sos-green sos-border"
            >
              <Text
                className="text-lg uppercase text-sos-ink"
                style={{ fontFamily: "Tempus-Sans" }}
              >
                Info
              </Text>
            </Pressable>

            <Pressable
              onPress={onClose}
              className="w-full rounded-xl py-3 items-center justify-center bg-gray-200 mt-2"
            >
              <Text
                className="text-lg uppercase text-gray-600"
                style={{ fontFamily: "Tempus-Sans" }}
              >
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MenuModal;
