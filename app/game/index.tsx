import {
  BackHandler,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SOSBoard from "@/components/SOSBoard";
import { cell, GameState, Player, SlotDirection, SOSSlot } from "@/types/types";
import SOSSelector from "@/components/SOSSelector";
import SOSPlayersList from "@/components/SOSPlayersList";
import {
  changeTurn,
  checkIsGameOver,
  checkSOS,
  createGameState,
  createPlayersArray,
  getDirection,
  getWinners,
} from "@/utils/GameLogic";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SOSPauseMenu, { PauseCloseType } from "@/components/SOSPauseMenu";
import SOSWinnerDialog, { WinnerCloseType } from "@/components/SOSWinnerDialog";

const _row = 10; //TODO: Make it dynamic

const getJsonData = (x: string) => {
  return JSON.parse(x);
};

const Game = () => {
  const { data } = useLocalSearchParams();
  const { noRow, playersList } = getJsonData(data as string);
  const [gameState, setGameState] = useState<GameState>(
    createGameState(Number(noRow))
  );
  const [selected, setSelected] = useState<SOSSlot>(SOSSlot.E);
  const [isGameOver, setIsGameOver] = useState(false);

  const [players, setPlayers] = useState<Array<Player>>(createPlayersArray(playersList));
  const [currentTurn, setCurrentTurn] = useState<number>(0);

  const [crossedState, setCrossedState] = useState<Array<{
    cell: cell;
    dirs: SlotDirection[];
  }> | null>(null);

  const [showPause, setShowPause] = useState(false);

  
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      setShowPause(true)
      return true;
    })
    return () => backHandler.remove();

  }, [])
  

  useEffect(() => {
    //check if game is over
    if (checkIsGameOver(gameState)) {
      setIsGameOver(true); 
    }
  }, [gameState]);

  const updateCrossedState = (cell: cell, dir: SlotDirection) => {
    // updating the state of strikes
    setCrossedState((prev) => {
      if (prev) {
        const exist = prev.find(
          (item) => item.cell.x == cell.x && item.cell.y == cell.y
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

  const handleCellPress = (rowIndex: number, itemIndex: number) => {
    if (gameState[rowIndex][itemIndex] === SOSSlot.E) {
      //if it's a empty cell
      if (selected == SOSSlot.E) {
        //if it's not selected
        alert("Please select S or O");
        return;
      }

      //check if it's SOS
      const { points, pos } = checkSOS(
        selected,
        rowIndex,
        itemIndex,
        gameState
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
        newGameState[rowIndex][itemIndex] = selected;
        return newGameState;
      });

      setSelected(SOSSlot.E);
    }
  };

  const handlePauseClose = (type: PauseCloseType) => {
    switch (type) {
      case PauseCloseType.RESUME:
        setShowPause(false);
        break;
      case PauseCloseType.RESTART:
        router.replace({
          pathname: "/game",
          params: {
            data
          }
        });
        break;
      case PauseCloseType.QUIT:
        router.dismissAll();
        break;
      default:
        break;
    }
  }

  const handleWinnerClose = (type: WinnerCloseType) => {
    switch (type) {
      case WinnerCloseType.QUIT:
        router.dismissAll();
        break;
      case WinnerCloseType.RESTART:
        router.replace({
          pathname: "/game",
          params: {
            data
          }
        })
      default:
        break;
    }
  }

  

  return (
    <ImageBackground
      className="flex-1"
      source={require("@/assets/images/paper-bg.jpg")}
    >
      <SafeAreaView className="flex-1">
        <View className="flex flex-row justify-end p-4">
          <Pressable onPress={() => setShowPause(true)}>
            <MaterialCommunityIcons
              name="pause-circle"
              size={48}
              color="black"
            />
          </Pressable>
        </View>
        <SOSPlayersList players={players} currentTurn={currentTurn} />
        <SOSBoard
          gameState={gameState}
          onCellPress={handleCellPress}
          crossed={crossedState}
          currentPlayer={players[currentTurn]}
        />
        <SOSSelector selected={selected} onSelect={setSelected} />
      </SafeAreaView>
      <SOSPauseMenu visible={showPause} onClose={handlePauseClose} />
      <SOSWinnerDialog visible={isGameOver} onClose={handleWinnerClose} winner={getWinners(players).map((player) => player.name)} />
    </ImageBackground>
  );
};

export default Game;

const styles = StyleSheet.create({});
