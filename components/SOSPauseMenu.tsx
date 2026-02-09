import { BANNER_AD_UNIT_ID, SHOW_ADS } from "@/utils/AdHelpers";
import React from "react";
import { View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import SOSMenu from "./SOSMenu";
import SOSMenuButton from "./SOSMenuButton";
import TransparentModal from "./TransparentModal";

type Props = {
  visible: boolean;
  onClose: (X: PauseCloseType) => void;
};

export enum PauseCloseType {
  RESUME,
  RESTART,
  QUIT,
}

const BannerContainer = () => {
  return SHOW_ADS ? (
    <View className="my-[12px]">
      <BannerAd
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        unitId={BANNER_AD_UNIT_ID}
      />
    </View>
  ) : null;
};

const SOSPauseMenu = ({ visible, onClose }: Props) => {
  return (
    <TransparentModal
      onRequestClose={() => onClose(PauseCloseType.RESUME)}
      visible={visible}
      presentationStyle="overFullScreen"
      animationType="fade"
    >
      <SOSMenu title="Pause">
        <BannerContainer />
        <SOSMenuButton
          title="Resume"
          onPress={() => onClose(PauseCloseType.RESUME)}
        />
        <SOSMenuButton
          title="Restart"
          onPress={() => onClose(PauseCloseType.RESTART)}
        />
        <SOSMenuButton
          title="Quit"
          onPress={() => onClose(PauseCloseType.QUIT)}
          color="red"
        />
        <BannerContainer />
      </SOSMenu>
    </TransparentModal>
  );
};

export default SOSPauseMenu;
