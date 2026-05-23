import CustomModal from "@/components/CustomModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, SplashScreen, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  Share,
  Text,
  View
} from "react-native";

import IMGPaperBg from "@/assets/images/paper-bg.jpg";
import SOSNoPlayersSelector from "@/components/SOSNoPlayersSelector";
import { PlayerData } from "@/types/types";

// import { Audio } from "expo-av";
import MenuModal from "@/components/home/MenuModal";
import PlayerListModal from "@/components/home/PlayerListModal";
import SOSHomeLogo from "@/components/SOSHomeLogo";
import SOSSoundButton from "@/components/SOSSoundButton";
import SOSStyledButton from "@/components/SOSStyledButton";
import { Colors } from "@/constants/Colors";
import { useSoundContext } from "@/context/sound-context";
import { useSavedState } from "@/hooks/useSavedState";
import { BANNER_AD_UNIT_ID, SHOW_ADS } from "@/utils/AdHelpers";
import { AIDifficulty } from "@/utils/AILogic";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import InAppReview from "react-native-in-app-review";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

type Props = {};

const PlayerDataColors = [
  "#000000", // black
  "#2563eb", // blue
  "#dc2626", // red
  "#9333ea", // purple
  "#00a63e", // green
  "#ffdf20", // yellow
  "#f6339a", // pink
];

const createPlayersData = (x: number) => {
  const arr: PlayerData[] = new Array(x).fill(0).map((_, index) => ({
    name: index === 0 ? "Sam" : `Player ${index + 1}`,
    color: PlayerDataColors[index % PlayerDataColors.length],
  }));

  return arr;
};

const getJsonData = (x: Object) => {
  return JSON.stringify(x);
};

const getMaxRow = () => {
  const D_Width = Dimensions.get("window").width;
  const B_Width = D_Width - 16;
  return Math.floor(B_Width / 40);
};

const MAX_ROW = getMaxRow();
const MAX_COL = getMaxRow(); // Same logic for columns

const App = (props: Props) => {
  const insets = useSafeAreaInsets();
  const [noRow, setNoRow] = useSavedState<number>("NO_OF_ROW", 8);
  const [noCol, setNoCol] = useSavedState<number>("NO_OF_COL", 10);
  const [playersList, setPlayersList] = useSavedState<PlayerData[]>(
    "PLAYERS_LIST",
    createPlayersData(2),
  );
  const [rating, setRating] = useSavedState<string>("RATING", "asked");
  const [difficulty, setDifficulty] = useSavedState<AIDifficulty>(
    "DIFFICULTY",
    AIDifficulty.EASY,
  );

  const [showPlayerListModal, setShowPlayerListModal] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);

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
  // const [isMusicOn, setIsMusicOn, isLoading] = useSavedState<boolean>("IS_MUSIC", true);
  const { isSoundOn, setIsSoundOn, isLoading } = useSoundContext();

  const handleSelectNoPlayers = (value: number) => {
    setPlayersList(createPlayersData(value + 2));
  };

  const handleOnPlayersNameChange = (value: string, index: number) => {
    const arr = [...playersList];
    arr[index].name = value;
    setPlayersList(arr);
  };

  const handleSelectRow = (type: "add" | "less") => {
    if (type === "add" && noRow < MAX_ROW) {
      setNoRow((prev) => prev + 1);
    } else if (type === "less" && noRow > 5) {
      setNoRow((prev) => prev - 1);
    }
  };

  const handleSelectCol = (type: "add" | "less") => {
    if (type === "add" && noCol < MAX_COL) {
      setNoCol((prev) => prev + 1);
    } else if (type === "less" && noCol > 5) {
      setNoCol((prev) => prev - 1);
    }
  };

  const handlePlayerColorChange = (index: number, color: string) => {
    const arr = [...playersList];
    arr[index].color = color;
    setPlayersList(arr);
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
    setPlayersList(arr);
  };

  const showRatingDialog = () => {
    if (InAppReview.isAvailable()) {
      console.log("Rating", rating);
      setModalConfig({
        visible: true,
        title: "Rate SOS Game",
        message:
          "If you have any feedback, please rate it on Play Store. It helps us a lot. \nThanks for your support! 🙏🏻",
        buttons: [
          {
            text: "Rate Now",
            onPress: () => {
              hideModal();
              InAppReview.RequestInAppReview();
            },
          },
          {
            text: "Later",
            style: "cancel",
            onPress: () => {
              setRating("done");
              hideModal();
            },
          },
          {
            text: "No, Thanks",
            style: "cancel",
            onPress: () => {
              setRating("done");
              hideModal();
            },
          },
        ],
      });
    }
  };

  // const [bgMusic, setBgMusic] = useState<Audio.Sound>()

  // const loadBgMusic = async () => {
  //   const { sound } = await Audio.Sound.createAsync()
  //   setBgMusic(sound)
  // }

  // useEffect(() => {
  //   loadBgMusic()
  //   return () => {
  //     bgMusic?.unloadAsync()
  //   }
  // }, [])

  useFocusEffect(
    useCallback(() => {
      if (rating === "should") {
        showRatingDialog();
      }
    }, [rating, showRatingDialog]),
  );

  useEffect(() => {
    if (!isLoading) SplashScreen.hideAsync();
  }, [isLoading]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "SOS Game",
        message: `Check out the SOS game on the Google Play Store! 🎮
          \nI’ve been playing this awesome game and thought you might enjoy it too. It’s free and fun—perfect for a quick game session. 
          \nhttps://play.google.com/store/apps/details?id=com.kaakkagames.SOSGame`,
      });
      if (result.action === Share.sharedAction) {
        setModalConfig({
          visible: true,
          title: "Thanks for sharing!",
          message: "We appreciate your support.",
          buttons: [{ text: "OK", onPress: hideModal }],
        });
        if (result.activityType) {
          console.log(result.activityType);
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onRemoveAds = () => {
    // presentPaywallIfNeeded();
  };

  const handleStartGame = () => {
    setShowPlayerListModal(false);
    router.push({
      pathname: "/game",
      params: {
        data: getJsonData({
          playersList: playersList,
          noRow,
          noCol,
          difficulty,
        }),
      },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <CustomModal
        visible={modalConfig.visible}
        title={modalConfig.title}
        message={modalConfig.message}
        buttons={modalConfig.buttons}
        onClose={hideModal}
      />
      <ImageBackground className="flex-1" source={IMGPaperBg}>
        <SafeAreaView edges={["top"]} className="flex-1">
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex flex-col px-4 pb-6">
              {SHOW_ADS && (
                <BannerAd
                  size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                  unitId={BANNER_AD_UNIT_ID}
                />
              )}
              <View className="items-center py-2 flex flex-row justify-between gap-x-2">
                <SOSHomeLogo />
                <View className="flex flex-row gap-x-2">
                  {/* <SOSStyledButton
                    containerClassName="bg-white w-16 h-16 items-center justify-center"
                    onPress={() => router.push("/about")}
                  >
                    <FontAwesome5 name="menu" size={24} color="black" />
                  </SOSStyledButton> */}
                  <SOSStyledButton
                    containerClassName="bg-white w-16 h-16 items-center justify-center"
                    onPress={() => setMenuVisible(true)}
                  >
                    <MaterialCommunityIcons
                      name="menu"
                      size={24}
                      color="black"
                    />
                  </SOSStyledButton>
                </View>
              </View>
              {/* How many players */}
              <View className="w-full mb-6">
                <View className="flex-row items-center mb-3">
                  <MaterialCommunityIcons
                    name="account-group"
                    size={20}
                    color="#0a0a0a"
                  />
                  <Text
                    className="text-lg text-sos-ink ml-2"
                    style={{ fontFamily: "Tempus-Sans" }}
                  >
                    How many players?
                  </Text>
                </View>
                <SOSNoPlayersSelector
                  selected={
                    playersList.some((player) => player.isAi)
                      ? -1
                      : playersList.length - 2
                  }
                  onSelect={handleSelectNoPlayers}
                />
              </View>
              <View className="flex-row items-center justify-between mb-5">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name="grid"
                    size={22}
                    color="#0a0a0a"
                  />
                  <Text
                    className="text-lg text-sos-ink uppercase tracking-wider ml-2.5"
                    style={{ fontFamily: "Tempus-Sans" }}
                  >
                    BOARD CONFIGURATION
                  </Text>
                </View>
                <View className="flex-row gap-2"></View>
              </View>

              <View className="flex-row items-end mb-5 gap-5">
                {/* ROWS */}
                <View className="flex-1 items-center justify-between">
                  <Text
                    className="text-xs text-sos-ink uppercase tracking-wide"
                    style={{ fontFamily: "Tempus-Sans" }}
                  >
                    ROWS
                  </Text>
                  <View className="flex-row w-full items-center gap-2.5 rounded-xl border-2 border-dashed border-gray-400 px-3 py-2.5">
                    <SOSStyledButton
                      disabled={noRow <= 5}
                      onPress={() => handleSelectRow("less")}
                    >
                      <MaterialCommunityIcons
                        name="minus"
                        size={20}
                        color={noRow <= 5 ? "#9ca3af" : "#0a0a0a"}
                      />
                    </SOSStyledButton>
                    <Text
                      className="flex-1 text-3xl text-sos-ink min-w-[40px] text-center"
                      style={{ fontFamily: "Tempus-Sans" }}
                    >
                      {noRow}
                    </Text>
                    <SOSStyledButton
                      disabled={noRow >= MAX_ROW}
                      onPress={() => handleSelectRow("add")}
                    >
                      <MaterialCommunityIcons
                        name="plus"
                        size={20}
                        color={
                          noRow >= MAX_ROW ? "#9ca3af" : Colors.light.sosGreen
                        }
                      />
                    </SOSStyledButton>
                  </View>
                </View>
                <View className="items-center">
                  <Text
                    className="text-xs text-sos-ink uppercase tracking-wide"
                    style={{ fontFamily: "Tempus-Sans" }}
                  >
                    SOUND
                  </Text>
                  <SOSSoundButton />
                </View>
                {/* COLUMNS */}
                {/* <View className="flex-1 items-center justify-between">
                    <Text
                      className="text-xs text-sos-ink uppercase tracking-wide"
                      style={{ fontFamily: "Tempus-Sans" }}
                    >
                      COLUMNS
                    </Text>
                    <View className="flex-row items-center gap-2.5 rounded-xl border-2 border-dashed border-gray-400 px-3 py-2.5">
                      <Pressable
                        disabled={noCol <= 5}
                        onPress={() => handleSelectCol("less")}
                        className="rounded-lg border-3 border-sos-ink p-2 bg-white min-w-[36px] items-center justify-center"
                      >
                        <MaterialCommunityIcons
                          name="minus"
                          size={20}
                          color={noCol <= 5 ? "#9ca3af" : "#0a0a0a"}
                        />
                      </Pressable>
                      <Text
                        className="text-3xl text-sos-ink min-w-[40px] text-center"
                        style={{ fontFamily: "Tempus-Sans" }}
                      >
                        {noCol}
                      </Text>
                      <Pressable
                        disabled={noCol >= MAX_COL}
                        onPress={() => handleSelectCol("add")}
                        className={`rounded-lg border-3 border-sos-ink p-2 min-w-[36px] items-center justify-center ${
                          noCol >= MAX_COL ? "bg-white" : "bg-sos-green"
                        }`}
                      >
                        <MaterialCommunityIcons
                          name="plus"
                          size={20}
                          color={noCol >= MAX_COL ? "#9ca3af" : "#0a0a0a"}
                        />
                      </Pressable>
                    </View>
                  </View> */}
              </View>
            </View>
          </ScrollView>
          <View
            style={{ paddingBottom: insets.bottom + 16 }}
            className="w-ful border-t bg-white border-sos-green px-4 pt-4 shadow-card"
          >
            <View>
              {/* Start Game CTA */}
              <Pressable
                onPress={() => setShowPlayerListModal(true)}
                className="w-full sos-border rounded-xl bg-sos-green py-4 px-8 items-center justify-center shadow-card active:opacity-90 mb-8"
              >
                <Text
                  className="text-3xl text-sos-ink uppercase tracking-wide"
                  style={{ fontFamily: "Tempus-Sans" }}
                >
                  START GAME!
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <PlayerListModal
        visible={showPlayerListModal}
        onClose={() => setShowPlayerListModal(false)}
        playersList={playersList}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        onPlayersUpdate={setPlayersList}
        onPressStartGame={handleStartGame}
      />
      <MenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onRemoveAds={() => {
          onRemoveAds();
          setMenuVisible(false);
        }}
        onShare={() => {
          onShare();
          setMenuVisible(false);
        }}
        onInfo={() => {
          router.push("/about");
          setMenuVisible(false);
        }}
      />
    </View>
  );
};

export default App;
