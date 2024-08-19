import { View, Text } from 'react-native'
import React from 'react'
import { Player } from '@/types/types'

type Props = {
  player: Player
  selected: boolean
}

const SOSPlayersListCard = ({ player, selected }: Props) => {
  return (
    <View 
      className="flex flex-row items-center rounded-md border overflow-hidden space-x-1"
      style={{ borderColor: selected ?  player.color: "black"  }}
    >
      <View className="flex h-full w-3" style={{ backgroundColor: player.color }} />
      <Text 
        className="text-lg grow" 
        style={{ 
          fontFamily: "Tempus-Sans", 
        }}
        >
          {player.name}
      </Text>
      { selected && <View className="h-3 w-3 rounded-full" style={{ backgroundColor: player.color }} /> }
      <Text 
        className="text-lg border-l px-2" 
        style={{ 
          fontFamily: "Tempus-Sans",
          borderColor: selected? player.color: 'black' 
        }}
        >
          {player.score}
      </Text>
    </View>
  )
}

export default SOSPlayersListCard