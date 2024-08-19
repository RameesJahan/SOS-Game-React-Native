import { View, Text, TextInput, Platform, LayoutAnimation, UIManager } from 'react-native'
import React, { useEffect } from 'react'
import { PlayerData } from '@/types/types'
import Animated, { FadeOut, LinearTransition } from 'react-native-reanimated'



type Props = {
  players: PlayerData[],
  onChangeText: (value: string, index: number) => void
}



const SOSHomePlayers = ({ players, onChangeText }: Props) => {

  return (
    <View
      className="flex flex-row flex-wrap items-center justify-center mt-8"
      >
      {
        players.map((player, index) => (
          <Animated.View 
            key={index}
            // entering={FadeInUp.duration(400)}
            layout={LinearTransition}
            exiting={FadeOut}
            className="w-1/2 p-1"
            >
            <View className="flex flex-row items-center justify-between rounded-md border p-2">

              <TextInput
                className="text-xl grow" 
                style={{ fontFamily: "Tempus-Sans" }}
                value={player.name}
                onChangeText={(text) => onChangeText(text, index)}
                selectTextOnFocus
                autoCapitalize={'sentences'}
              />
              <View className="h-6 aspect-video rounded-md" style={{ backgroundColor: player.color }} />
            </View>
          </Animated.View>
        ))
      }
    </View>
  )
}

export default SOSHomePlayers