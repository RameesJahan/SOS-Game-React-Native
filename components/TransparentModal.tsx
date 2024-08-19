import { View, Text, Modal, ModalProps } from "react-native";
import React from "react";

interface Props extends ModalProps {
  children?: React.ReactNode;
}

const TransparentModal = ({ children, ...props }: Props) => {
  return (
    <Modal transparent statusBarTranslucent {...props}>
      <View className="flex-1 flex justify-center items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
        {children}
      </View>
    </Modal>
  );
};

export default TransparentModal;
