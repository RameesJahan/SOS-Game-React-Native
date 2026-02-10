import { router, SplashScreen, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  Share,
  Text,
  TextInput,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import IMGPaperBg from "@/assets/images/paper-bg.jpg";
import SOSHomePlayers from "@/components/SOSHomePlayers";
import SOSNoPlayersSelector from "@/components/SOSNoPlayersSelector";
import { PlayerData } from "@/types/types";

// import { Audio } from "expo-av";
import SOSDifficultySelector from "@/components/SOSDifficultySelector";
import SOSSoundButton from "@/components/SOSSoundButton";
import { useSoundContext } from "@/context/sound-context";
import { useSavedState } from "@/hooks/useSavedState";
import { AIDifficulty } from "@/utils/AILogic";
import InAppReview from "react-native-in-app-review";
import { SafeAreaView } from "react-native-safe-area-context";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { BANNER_AD_UNIT_ID, SHOW_ADS } from "@/utils/AdHelpers";
import SOSStyledButton from "@/components/SOSStyledButton";
import { Colors } from "@/constants/Colors";
import SOSHomeLogo from "@/components/SOSHomeLogo";

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
  const [noRow, setNoRow] = useSavedState<number>("NO_OF_ROW", 8);
  const [noCol, setNoCol] = useSavedState<number>("NO_OF_COL", 10);
  const [playersList, setPlayersList] = useSavedState<PlayerData[]>(
    "PLAYERS_LIST",
    createPlayersData(2)
  );
  const [rating, setRating] = useSavedState<string>("RATING", "asked");
  const [difficulty, setDifficulty] = useSavedState<AIDifficulty>(
    "DIFFICULTY",
    AIDifficulty.EASY
  );
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
    arr[index].isAi = !arr[index].isAi;
    setPlayersList(arr);
  };

  const showRatingDialog = () => {
    if (InAppReview.isAvailable()) {
      console.log("Rating", rating);
      Alert.alert(
        "Rate SOS Game",
        "If you have any feedback, please rate it on Play Store. It helps us a lot. \nThanks for your support! 🙏🏻",
        [
          {
            text: "Rate Now",
            onPress: () => {
              InAppReview.RequestInAppReview();
            },
          },
          {
            text: "Later",
            style: "cancel",
            onPress: () => {
              setRating("done");
            },
          },
          {
            text: "No, Thanks",
            style: "cancel",
            onPress: () => {
              setRating("done");
            },
          },
        ]
      );
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
    }, [rating, showRatingDialog])
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
        Alert.alert("Thanks for sharing!");
        if (result.activityType) {
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

  return (
    <View className="flex-1 bg-white">
      <ImageBackground className="flex-1" source={IMGPaperBg}>
        <SafeAreaView className="flex-1">
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
              <View className="items-center py-2">
                <SOSHomeLogo />
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

              <View className="w-full mb-6">
                <SOSDifficultySelector
                  disabled={!playersList.some((player) => player.isAi)}
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                />
              </View>

              {/* Player Cards */}
              <View className="w-full mb-6">
                {playersList.map((player, index) => (
                  <View
                    key={index}
                    className="w-full rounded-2xl sos-border bg-white p-3 mb-3 shadow-card relative"
                  >
                    <View className="flex-row items-center justify-between">
                      {/* Player label */}
                      <Text
                        className="text-xs uppercase text-gray-400 mb-1"
                        style={{ fontFamily: "Tempus-Sans" }}
                      >
                        PLAYER {String(index + 1).padStart(2, "0")}
                      </Text>
                      {/* Human/AI selector top-right (replaces star) */}
                      <View>
                        <View className="flex-row rounded-md border-2 border-gray-200 overflow-hidden bg-gray-200">
                          <Pressable
                            onPress={() => handlePlayerTypeToggle(index)}
                            className={`px-3 py-2 rounded-md items-center justify-center ${
                              !player.isAi ? "bg-sos-green" : ""
                            }`}
                          >
                            <Text
                              className={`text-xs ${
                                !player.isAi ? "text-sos-ink" : "text-gray-400"
                              }`}
                              style={{ fontFamily: "Tempus-Sans" }}
                            >
                              HUMAN
                            </Text>
                          </Pressable>
                          <Pressable
                            onPress={() => handlePlayerTypeToggle(index)}
                            className={`px-3 py-1 rounded-md items-center justify-center ${
                              player.isAi ? "bg-sos-green" : ""
                            }`}
                          >
                            <Text
                              className={`text-xs ${
                                player.isAi ? "text-sos-ink" : "text-gray-400"
                              }`}
                              style={{ fontFamily: "Tempus-Sans" }}
                            >
                              AI
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>

                    {/* Name input with dotted underline */}
                    <View className="mb-2 relative">
                      <TextInput
                        className="text-base text-sos-ink pb-1.5"
                        style={{
                          fontFamily: "Tempus-Sans",
                        }}
                        value={player.name}
                        onChangeText={(text) =>
                          handleOnPlayersNameChange(text, index)
                        }
                        placeholder="Enter name"
                        placeholderTextColor="#9ca3af"
                      />
                      <View
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#d1d5db",
                          borderStyle: "dashed",
                        }}
                      />
                      {player.name && (
                        <View className="absolute right-0 top-0.5">
                          <MaterialCommunityIcons
                            name="pencil-outline"
                            size={14}
                            color="#9ca3af"
                          />
                        </View>
                      )}
                    </View>

                    {/* Signature Ink Color Picker */}
                    <View className="flex-row items-center">
                      <Text
                        className="text-sm text-sos-ink mr-2"
                        style={{ fontFamily: "Tempus-Sans" }}
                      >
                        Ink:
                      </Text>
                      <View className="flex-row gap-1.5">
                        {PlayerDataColors.map((color) => (
                          <Pressable
                            key={color}
                            onPress={() =>
                              handlePlayerColorChange(index, color)
                            }
                            className={`w-7 h-7 rounded-full border-2 ${
                              player.color === color
                                ? "border-sos-green"
                                : "border-sos-ink"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              {SHOW_ADS && (
                <BannerAd
                  size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                  unitId={BANNER_AD_UNIT_ID}
                />
              )}
            </View>
          </ScrollView>
          {/* Board configuration */}
          <View className="w-ful border-t bg-white border-sos-green px-4 py-4 shadow-card">
            <View className="flex-row items-center justify-between mb-5">
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="grid" size={22} color="#6cee2b" />
                <Text
                  className="text-xs text-sos-ink uppercase tracking-wider ml-2.5"
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
          <View className="px-4">
            {/* Start Game CTA */}
            <Pressable
              onPress={() => {
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
              }}
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
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default App;
