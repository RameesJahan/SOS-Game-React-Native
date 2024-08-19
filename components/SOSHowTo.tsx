import { View, Text, ScrollView, StyleProp, ImageStyle, TextStyle, StyleSheet } from 'react-native'
import React from 'react'
import Image from './ResizedImage'


type Props = {}

const SOSHowTo = (props: Props) => {

  const TitleTextStyle: StyleProp<TextStyle> = {
    fontSize: 24,
    marginTop: 16
  }

  const imgStyle: StyleProp<ImageStyle> = {
    width: '100%',
    height: 300
  }

  return (
    <ScrollView className="flex-1">
      <View className="w-full p-4" >
        <Text className="text-xl font-medium">How to Play SOS?</Text>
        <Image  source={require("@/assets/images/eg-1.jpg")} />
        <Text  style={TitleTextStyle}>Setup:</Text>
        <Text className='text-lg'>• Select number of players (2-6)</Text>
        <Image  source={require("@/assets/images/eg-no-players.jpg")} />
        <Text className='text-lg'>• Choose a Row size</Text>
        <Image source={require("@/assets/images/eg-sel-row.jpg")} />
        <Text style={TitleTextStyle}>Gameplay:</Text>
        <Text className='text-lg'>• Players take turns placing 'S' or 'O' on empty squares</Text>
        <Image source={require("@/assets/images/eg-sel-so.jpg")} />
        <Text className='text-lg'>• Form 'SOS' sequences horizontally, vertically, or diagonally to score</Text>
        <Image source={require("@/assets/images/eg-sos.jpg")} />
        <Text className='text-lg'>• Creating an SOS earns a point and an extra turn</Text>
        <Image source={require("@/assets/images/eg-player-score.jpg")} />
        <Text style={TitleTextStyle}>Winning:</Text>
        <Text className='text-lg'>• Game ends when the grid is full</Text>
        <Text className='text-lg'>• Player with the most SOS sequences wins</Text>
        <Text style={TitleTextStyle}>Tips:</Text>
        <Text className='text-lg'>• Look for opportunities to form multiple SOS in one move</Text>
        <Text className='text-lg'>• Block opponents by disrupting their potential SOS formations</Text>
        <Text className='text-lg'>Enjoy the strategic challenge of SOS!</Text>
      </View>
    </ScrollView>
  )
}

export default SOSHowTo

const styles = StyleSheet.create({
  img: {
    flex: 1,
    width: '100%',
  }
})



// How to Play SOS
// [Insert an image here showing a sample game board with some S and O letters placed, and a few SOS sequences highlighted]

// Setup:

// Choose a grid size (minimum 5x5, maximum based on phone width)
// Select number of players (2-6)


// Gameplay:

// Players take turns placing 'S' or 'O' on empty squares
// Form 'SOS' sequences horizontally, vertically, or diagonally to score
// Creating an SOS earns a point and an extra turn


// Winning:

// Game ends when the grid is full
// Player with the most SOS sequences wins



// Tips:

// Look for opportunities to form multiple SOS in one move
// Block opponents by disrupting their potential SOS formations

// Enjoy the strategic challenge of SOS!