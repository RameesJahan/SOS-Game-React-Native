import { View, Text, Modal, ImageBackground, Pressable } from "react-native";
import React from "react";
import TransparentModal from "./TransparentModal";
import SOSMenu from "./SOSMenu";
import SOSMenuButton from "./SOSMenuButton";

type Props = {
  visible: boolean;
  onClose: (X: PauseCloseType) => void;
};

export enum PauseCloseType {
  RESUME,
  RESTART,
  QUIT,
}

const SOSPauseMenu = ({ visible, onClose }: Props) => {
  return (
    <TransparentModal
      onRequestClose={() => onClose(PauseCloseType.RESUME)}
      visible={visible}
      presentationStyle="overFullScreen"
      animationType="fade"
    >
      <SOSMenu title="Pause">
          <SOSMenuButton title="Resume" onPress={() => onClose(PauseCloseType.RESUME)} />
          <SOSMenuButton title="Restart" onPress={() => onClose(PauseCloseType.RESTART)} />
          <SOSMenuButton title="Quit" onPress={() => onClose(PauseCloseType.QUIT)} color="red" />
      </SOSMenu>
    </TransparentModal>
  );
};

export default SOSPauseMenu;
