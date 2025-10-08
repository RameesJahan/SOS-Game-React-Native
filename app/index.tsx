import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Pressable,
  Share,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, SplashScreen, useFocusEffect } from "expo-router";

import IMGPaperBg from "@/assets/images/paper-bg.jpg";
import SOSHomeLogo from "@/components/SOSHomeLogo";
import SOSNoPlayersSelector from "@/components/SOSNoPlayersSelector";
import { PlayerData } from "@/types/types";
import SOSHomePlayers from "@/components/SOSHomePlayers";
import SOSHomeRowSelector, {
  RowSelectorType,
} from "@/components/SOSHomeRowSelector";

import AnimatedText from "@/components/AnimatedText";
// import { Audio } from "expo-av";
import { useAudioPlayer } from "expo-audio";
import SOSMusicToggle from "@/components/SOSMusicToggle";
import { useSavedState } from "@/hooks/useSavedState";
import { useSoundContext } from "@/context/sound-context";
import SOSSoundButton from "@/components/SOSSoundButton";
import InAppReview from "react-native-in-app-review";
import { AIDifficulty } from "@/utils/AILogic";
import SOSDifficultySelector from "@/components/SOSDifficultySelector";

SplashScreen.preventAutoHideAsync();

type Props = {};

const PlayerDataColors = [
  "#dc2626",
  "#d97706",
  "#16a34a",
  "#2563eb",
  "#9333ea",
  "#db2777",
];

const createPlayersData = (x: number) => {
  const arr: PlayerData[] = new Array(x).fill(0).map((_, index) => ({
    name: `Player ${index + 1}`,
    color: PlayerDataColors[index],
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

const App = (props: Props) => {
  const [noRow, setNoRow] = useSavedState<number>("NO_OF_ROW", 5);
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

  const handleAiPlayer = () => {
    setPlayersList(() => [
      { name: "You", color: "#dc2626" },
      { name: "AI", color: "#000000", isAi: true },
    ]);
  };

  const handleOnPlayersNameChange = (value: string, index: number) => {
    const arr = [...playersList];
    arr[index].name = value;
    setPlayersList(arr);
  };

  const handleSelectRow = (type: RowSelectorType) => {
    switch (type) {
      case RowSelectorType.ADD:
        if (noRow < MAX_ROW) {
          setNoRow((prev) => prev + 1);
        }
        break;
      case RowSelectorType.LESS:
        if (noRow > 5) {
          setNoRow((prev) => prev - 1);
        }
        break;
    }
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
      <ImageBackground
        className="flex flex-col flex-1 items-center pt-12 px-4"
        source={IMGPaperBg}
      >
        <View className="p-12">
          <SOSHomeLogo />
        </View>
        <SOSNoPlayersSelector
          selected={
            playersList.some((player) => player.isAi)
              ? -1
              : playersList.length - 2
          }
          onSelect={handleSelectNoPlayers}
          onSelectAi={handleAiPlayer}
        />
        {playersList.some((player) => player.isAi) && (
          <SOSDifficultySelector
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        )}
        <SOSHomePlayers
          players={playersList}
          onChangeText={handleOnPlayersNameChange}
        />
        <SOSHomeRowSelector
          maxNoRow={MAX_ROW}
          noRow={noRow}
          setNoRow={handleSelectRow}
        />
        <View className="w-full flex flex-row items-center justify-between mt-8 px-1">
          <Text className="text-2xl " style={{ fontFamily: "Tempus-Sans" }}>
            Music:
          </Text>
          <SOSSoundButton />
        </View>
        {/* <SOSMusicToggle value={isSoundOn} onValueChange={(value) => setIsSoundOn(value)} /> */}
        <View className="grow" />
        <View className=" items-center justify-center justify-self-end mb-20">
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/game",
                params: {
                  data: getJsonData({
                    playersList: playersList,
                    noRow,
                    difficulty,
                  }),
                },
              });
            }}
          >
            <Text
              className="text-5xl text-neutral-950"
              style={{ fontFamily: "Tempus-Sans" }}
            >
              Start Game
            </Text>
          </Pressable>
        </View>
        <View className="flex flex-row gap-4 w-full mb-4">
          <Pressable
            className="flex-1 items-center justify-center p-2 rounded-md border"
            onPress={() => router.push("/about")}
          >
            <Text
              className="text-2xl text-neutral-950"
              style={{ fontFamily: "Tempus-Sans" }}
            >
              About
            </Text>
          </Pressable>
          <Pressable
            className="flex-1 items-center justify-center p-2 rounded-md border"
            onPress={onShare}
          >
            <Text
              className="text-2xl text-neutral-950"
              style={{ fontFamily: "Tempus-Sans" }}
            >
              Share
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default App;
