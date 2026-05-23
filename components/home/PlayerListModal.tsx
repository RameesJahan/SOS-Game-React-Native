import { PlayerData } from "@/types/types";
import {
  Modal,
  ModalProps,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect } from "react";
import { AIDifficulty } from "@/utils/AILogic";
import SOSDifficultySelector from "../SOSDifficultySelector";
import PlayerCard from "./PlayerCard";
import { BANNER_AD_UNIT_ID, SHOW_ADS } from "@/utils/AdHelpers";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { Colors } from "@/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CustomModal from "../CustomModal";
import { ImageBackground } from "expo-image";
import IMGPaperBg from "@/assets/images/paper-bg.jpg";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAdContext } from "@/context/ad-context";
import Animated, {
  AnimatedStyle,
  FadeInDown,
  FadeInUp,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type PlayerListModalProps = {
  playersList: PlayerData[];
  onClose: () => void;
  difficulty: AIDifficulty;
  setDifficulty: (difficulty: AIDifficulty) => void;
  onPressStartGame: () => void;
  onPlayersUpdate: (playersList: PlayerData[]) => void;
} & ModalProps;

const PlayerListModal = ({
  playersList,
  visible,
  onClose,
  difficulty,
  setDifficulty,
  style,
  onPressStartGame,
  onPlayersUpdate,
  ...props
}: PlayerListModalProps) => {
  const { isAdFree } = useAdContext();
  const insets = useSafeAreaInsets();
  const [modalConfig, setModalConfig] = React.useState<{
    visible: boolean;
    title: string;
    message: string;
    buttons?: {
      text: string;
      style?: "default" | "cancel" | "destructive";
      onPress?: () => void;
    }[];
  }>({
    visible: false,
    title: "",
    message: "",
  });

  const hideModal = () => setModalConfig({ ...modalConfig, visible: false });

  const handlePlayerColorChange = (index: number, color: string) => {
    const arr = [...playersList];
    arr[index].color = color;
    onPlayersUpdate(arr);
  };

  const handlePlayerTypeToggle = (index: number) => {
    const arr = [...playersList];

    if (!arr[index].isAi) {
      const humanPlayers = arr.filter((p) => !p.isAi).length;
      if (humanPlayers <= 1) {
        setModalConfig({
          visible: true,
          title: "Invalid Action",
          message: "At least one player must be human.",
          buttons: [{ text: "OK", onPress: hideModal }],
        });
        return;
      }
    }

    arr[index].isAi = !arr[index].isAi;
    onPlayersUpdate(arr);
  };

  const handleOnPlayersNameChange = (value: string, index: number) => {
    const arr = [...playersList];
    arr[index].name = value;
    onPlayersUpdate(arr);
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      style={[style, styles.container]}
      {...props}
    >
      <CustomModal
        visible={modalConfig.visible}
        title={modalConfig.title}
        message={modalConfig.message}
        buttons={modalConfig.buttons}
        onClose={hideModal}
      />
      <ImageBackground style={{ flex: 1 }} source={IMGPaperBg}>
        {/* Player Cards */}
        <ScrollView
          style={{ marginTop: insets.top }}
          className="flex-1"
          contentContainerClassName="pt-2 pb-6"
        >
          {SHOW_ADS && !isAdFree && (
            <BannerAd
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              unitId={BANNER_AD_UNIT_ID}
            />
          )}
          <View className="flex-row items-center mt-4 mb-3 px-4">
            <MaterialCommunityIcons
              name="account-box-edit-outline"
              size={30}
              color="#0a0a0a"
            />
            <Text
              className="text-3xl text-sos-ink ml-2"
              style={{ fontFamily: "Tempus-Sans" }}
            >
              Customize Players
            </Text>
          </View>
          <View className="w-full mb-6 px-4">
            {playersList.map((player, index) => (
              <PlayerCard
                key={index}
                player={player}
                index={index}
                playersList={playersList}
                onPlayerTypeToggle={handlePlayerTypeToggle}
                onPlayersNameChange={handleOnPlayersNameChange}
                onPlayerColorChange={handlePlayerColorChange}
              />
            ))}
          </View>
          {SHOW_ADS && !isAdFree && (
            <BannerAd
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              unitId={BANNER_AD_UNIT_ID}
            />
          )}
        </ScrollView>
        <View className="w-ful border-t bg-white border-sos-green px-4 py-4 shadow-card">
          <View className="w-full mb-6">
            {playersList.some((player) => player.isAi) && (
              <SOSDifficultySelector
                disabled={!playersList.some((player) => player.isAi)}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
              />
            )}
          </View>
          <View>
            {/* Start Game CTA */}
            <Pressable
              onPress={onPressStartGame}
              className="w-full sos-border rounded-xl bg-sos-green py-4 px-8 items-center justify-center shadow-card active:opacity-90"
              style={{ marginBottom: insets.bottom + 16 }}
            >
              <Text
                className="text-3xl text-sos-ink uppercase tracking-wide"
                style={{ fontFamily: "Tempus-Sans" }}
              >
                {"START "}
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

function ExpandableView({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 300,
}: {
  isExpanded: SharedValue<boolean>;
  children: React.ReactNode;
  viewKey: string;
  style?: StyleProp<AnimatedStyle<ViewStyle>>;
  duration?: number;
}) {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    }),
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}
    >
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}
      >
        {children}
      </View>
    </Animated.View>
  );
}

export default PlayerListModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    width: "100%",
    position: "absolute",
    display: "flex",
  },
  animatedView: {
    width: "100%",
    overflow: "hidden",
  },
});
