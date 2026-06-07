import SOSBoard from "@/components/SOSBoard";
import SOSPauseMenu, { PauseCloseType } from "@/components/SOSPauseMenu";
import SOSPlayersList from "@/components/SOSPlayersList";
import SOSSelector from "@/components/SOSSelector";
import SOSSoundButton from "@/components/SOSSoundButton";
import SOSStyledButton from "@/components/SOSStyledButton";
import SOSWinnerDialog, { WinnerCloseType } from "@/components/SOSWinnerDialog";
import CustomModal from "@/components/CustomModal";
import { useAdContext } from "@/context/ad-context";
import { useSavedState } from "@/hooks/useSavedState";
import {
  cell,
  GameState,
  Player,
  PlayerData,
  SlotDirection,
  SOSSlot,
} from "@/types/types";
import { BANNER_AD_UNIT_ID, SHOW_ADS } from "@/utils/AdHelpers";
import { AIDifficulty, getAIMove } from "@/utils/AILogic";
import {
  changeTurn,
  checkIsGameOver,
  checkSOS,
  createGameState,
  createPlayersArray,
  getDirection,
  getWinners,
} from "@/utils/GameLogic";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { SafeAreaView } from "react-native-safe-area-context";

const getJsonData = <T,>(x: string): T => {
  return JSON.parse(x);
};

const Game = () => {
  const { isAdFree } = useAdContext();
  const { data } = useLocalSearchParams();
  const { noRow, playersList, difficulty } = getJsonData<{
    noRow: string;
    playersList: PlayerData[];
    difficulty: AIDifficulty;
  }>(data as string);
  console.log(noRow, 'noRow', playersList, 'playersList', difficulty, 'difficulty');
  const [gameState, setGameState] = useState<GameState>(
    createGameState(Number(noRow)),
  );
  const [selected, setSelected] = useState<SOSSlot>(SOSSlot.E);
  const [isGameOver, setIsGameOver] = useState(false);

  const [players, setPlayers] = useState<Array<Player>>(
    createPlayersArray(playersList),
  );
  const [currentTurn, setCurrentTurn] = useState<number>(0);

  const [crossedState, setCrossedState] = useState<Array<{
    cell: cell;
    dirs: SlotDirection[];
  }> | null>(null);

  const [showPause, setShowPause] = useState(false);
  const [rating, setRating] = useSavedState<string>("RATING", "asked");
  const [showPressEffect, setShowPressEffect] = useState<cell | null>(null);

  const [modalConfig, setModalConfig] = useState<{
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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setShowPause(true);
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    console.log("gameState");
    //check if game is over
    if (checkIsGameOver(gameState)) {
      setIsGameOver(true);
      if (rating === "asked") {
        setRating("should");
      }
    }
  }, [gameState]);

  console.log("Players:", playersList);

  const updateCrossedState = (cell: cell, dir: SlotDirection) => {
    // updating the state of strikes
    setCrossedState((prev) => {
      if (prev) {
        const exist = prev.find(
          (item) => item.cell.x == cell.x && item.cell.y == cell.y,
        );
        if (exist) {
          const newData: SlotDirection[] = [...exist.dirs, dir];
          return [...prev, { cell, dirs: newData }];
        } else {
          return [...prev, { cell, dirs: [dir] }];
        }
      }
      return [{ cell, dirs: [dir] }];
    });
  };

  const handleCellPress = (
    rowIndex: number,
    itemIndex: number,
    slot?: SOSSlot,
  ) => {
    if (gameState[rowIndex][itemIndex] === SOSSlot.E) {
      //if it's a empty cell
      console.log("Selected:", selected);
      if (!slot && selected == SOSSlot.E) {
        //if it's not selected
        setModalConfig({
          visible: true,
          title: "Action Required",
          message: "Please select S or O before placing your move.",
          buttons: [{ text: "OK", onPress: hideModal }],
        });
        return;
      }

      setShowPressEffect({ x: rowIndex, y: itemIndex });

      //check if it's SOS
      const { points, pos } = checkSOS(
        slot || selected,
        rowIndex,
        itemIndex,
        gameState,
      );

      //update score and current turn
      if (points > 0) {
        players[currentTurn].score += points;
        pos.forEach((p) => {
          updateCrossedState(p[1], getDirection(p));
        });
      } else {
        setCurrentTurn((prev) => changeTurn(players, prev));
      }

      //update game state
      setGameState((prevGameState) => {
        const newGameState = [...prevGameState];
        newGameState[rowIndex][itemIndex] = slot || selected;
        return newGameState;
      });

      setSelected(SOSSlot.E);
    }
  };

  const moveAi = () => {
    if (playersList[currentTurn].isAi) {
      console.log("ai turn");
      const aiMove = getAIMove(gameState, currentTurn, players, difficulty);
      if (aiMove) {
        console.log("ai move", aiMove);
        setSelected(aiMove.slot);
        setTimeout(() => {
          handleCellPress(aiMove.row, aiMove.col, aiMove.slot);
        }, 500);
      }
    }
  };

  useEffect(() => {
    if (!isGameOver) {
      setTimeout(() => {
        moveAi();
      }, 500);
    }
  }, [gameState]);

  useEffect(() => {
    if (showPressEffect) {
      setTimeout(() => {
        console.log("showPressEffect", showPressEffect);
        setShowPressEffect(null);
      }, 500);
    }
  }, [showPressEffect]);

  const handlePauseClose = (type: PauseCloseType) => {
    switch (type) {
      case PauseCloseType.RESUME:
        setShowPause(false);
        break;
      case PauseCloseType.RESTART:
        router.replace({
          pathname: "/game",
          params: {
            data,
          },
        });
        break;
      case PauseCloseType.QUIT:
        router.dismissAll();
        break;
      default:
        break;
    }
  };

  const handleWinnerClose = (type: WinnerCloseType) => {
    switch (type) {
      case WinnerCloseType.QUIT:
        router.dismissAll();
        break;
      case WinnerCloseType.RESTART:
        router.replace({
          pathname: "/game",
          params: {
            data,
          },
        });
      default:
        break;
    }
  };

  return (
    <ImageBackground
      className="flex-1"
      source={require("@/assets/images/paper-bg.jpg")}
    >
      <CustomModal
        visible={modalConfig.visible}
        title={modalConfig.title}
        message={modalConfig.message}
        buttons={modalConfig.buttons}
        onClose={hideModal}
      />
      <View
        className="flex-1"
      // style={{ backgroundColor: `${players[currentTurn].color}1d` }}
      >
        <SafeAreaView className="flex-1">
          <ScrollView className="flex-1">
            {SHOW_ADS && !isAdFree && (
              <BannerAd
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                unitId={BANNER_AD_UNIT_ID}
              />
            )}
            <View className="flex flex-row items-center justify-end gap-x-[12px] p-4">
              <SOSSoundButton size={28} />
              <SOSStyledButton
                onPress={() => setShowPause(true)}
              >
                <Ionicons name="pause" size={28} color="black" />
              </SOSStyledButton>
            </View>
            <SOSPlayersList players={players} currentTurn={currentTurn} />
            <SOSBoard
              gameState={gameState}
              onCellPress={handleCellPress}
              crossed={crossedState}
              currentPlayer={players[currentTurn]}
              showPressEffect={showPressEffect}
            />
            <SOSSelector selected={selected} onSelect={setSelected} />
            {/* {SHOW_ADS && !isAdFree && (
              <View className="justify-center items-center">
                <BannerAd
                  size={BannerAdSize.MEDIUM_RECTANGLE}
                  unitId={BANNER_AD_UNIT_ID}
                />
              </View>
            )} */}
          </ScrollView>
        </SafeAreaView>
      </View>
      <SOSPauseMenu visible={showPause} onClose={handlePauseClose} />
      <SOSWinnerDialog
        visible={isGameOver}
        onClose={handleWinnerClose}
        winner={getWinners(players).map((player) => player.name)}
      />
    </ImageBackground>
  );
};

export default Game;

const styles = StyleSheet.create({});
