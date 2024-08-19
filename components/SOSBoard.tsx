import { Pressable, Text, View } from "react-native";
import React, { PropsWithChildren, useState } from "react";
import { cell, GameState, Player, SlotDirection, SOSSlot } from "@/types/types";
import { useSavedColor } from "@/hooks/useSavedColor";
import SOSStrike from "./SOSStrike";

type Props = {
  gameState: GameState
  crossed: Array<{cell: cell, dirs: SlotDirection[]}> | null
  currentPlayer : Player
  onCellPress: (x: number, y: number) => void;
}





const SOSBoard = ({gameState, crossed, currentPlayer, onCellPress}: PropsWithChildren<Props>) => { 


  const getSlotText = (slot: SOSSlot) => {
    switch (slot) {
      case SOSSlot.S:
        return "S";
      case SOSSlot.O:
        return "O";
      default:
        return "";
    }
  }

  const getVariant = (dir: SlotDirection) => {
    switch (dir) {
      case SlotDirection.DIAGX:
        return "diagonalX"
      case SlotDirection.DIAGY:
        return "diagonalY"
      case SlotDirection.VER:
        return "vertical"
      case SlotDirection.HOR:
        return "horizontal"
      default:
        return undefined
    }
  }

  return (
    
    <View className="items-center">
      <View className="aspect-square p-2">
        {gameState.map((row, rowIndex) => (
          <View key={rowIndex} className="flex flex-row">
            {row.map((item, itemIndex) => (
              <View  key={itemIndex} className="flex-1 relative">
                <Pressable
                onPress={() => onCellPress(rowIndex, itemIndex)}
                className={`aspect-square border items-center justify-center`}
                style={{ borderColor : currentPlayer.color, width : 40 }}
              >
                <Text
                  className={`text-2xl`}
                  style={{ fontFamily: "Tempus-Sans" }}
                >
                  {getSlotText(item)}
                </Text>
              </Pressable>
              {
                crossed?.map((cell, index) => {
                  if(cell.cell.x == rowIndex && cell.cell.y == itemIndex){
                    return (
                      <View
                        key={index}
                        className="flex-1 absolute"
                        style={{ width : 40, height : 40 }}
                        >
                          {
                            cell.dirs.map((dir, i) => <SOSStrike key={i} variant={getVariant(dir)} />)
                          }
                      </View>  
                    )
                  }
                })
              }
              
              {/* {((itemIndex >= 1 && rowIndex >= 1) && (itemIndex < gameState.length-1 && rowIndex < gameState.length-1)) && <SOSStrike variant='horizontal' />}
              {((itemIndex >= 1 && rowIndex >= 1) && (itemIndex < gameState.length-1 && rowIndex < gameState.length-1)) && <SOSStrike variant='vertical' />}
              {((itemIndex >= 1 && rowIndex >= 1) && (itemIndex < gameState.length-1 && rowIndex < gameState.length-1)) && <SOSStrike variant='diagonalX' />}
              {((itemIndex >= 1 && rowIndex >= 1) && (itemIndex < gameState.length-1 && rowIndex < gameState.length-1)) && <SOSStrike variant='diagonalY' />}
              {((itemIndex == 0 || itemIndex == gameState.length-1) && (rowIndex >= 1 && rowIndex < gameState.length-1)) && <SOSStrike variant='vertical' />}
              {((rowIndex == 0 || rowIndex == gameState.length-1) && (itemIndex >= 1 && itemIndex < gameState.length-1)) && <SOSStrike variant='horizontal' />} */}

              </View>
              
            ))}
          </View>
        ))}

      </View>
    </View>
  );
};

export default SOSBoard;
