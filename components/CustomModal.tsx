import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

interface CustomModalProps {
  visible: boolean;
  title: string;
  message: string;
  buttons?: {
    text: string;
    style?: "default" | "cancel" | "destructive";
    onPress?: () => void;
  }[];
  onClose?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  message,
  buttons,
  onClose,
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
            className="text-xl text-sos-ink mb-3 text-center"
            style={{ fontFamily: "Tempus-Sans" }}
          >
            {title}
          </Text>
          <Text
            className="text-base text-gray-600 mb-6 text-center"
            style={{ fontFamily: "Tempus-Sans" }}
          >
            {message}
          </Text>

          <View className="flex-col gap-3">
            {buttons && buttons.length > 0 ? (
              buttons.map((btn, index) => (
                <Pressable
                  key={index}
                  onPress={btn.onPress}
                  className={`w-full rounded-xl py-3 items-center justify-center ${
                    btn.style === "cancel"
                      ? "bg-gray-200"
                      : "bg-sos-green sos-border"
                  }`}
                >
                  <Text
                    className={`text-lg uppercase ${
                      btn.style === "cancel" ? "text-gray-600" : "text-sos-ink"
                    }`}
                    style={{ fontFamily: "Tempus-Sans" }}
                  >
                    {btn.text}
                  </Text>
                </Pressable>
              ))
            ) : (
              <Pressable
                onPress={onClose}
                className="w-full bg-sos-green sos-border rounded-xl py-3 items-center justify-center"
              >
                <Text
                  className="text-lg text-sos-ink uppercase"
                  style={{ fontFamily: "Tempus-Sans" }}
                >
                  OK
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
