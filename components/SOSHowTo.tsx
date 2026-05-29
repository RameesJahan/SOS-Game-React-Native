import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import Image from "./ResizedImage";

type Props = {};

const SOSHowTo = (props: Props) => {
  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-10 pt-2"
    >
      <View className="w-full">
        <Text
          className="text-3xl text-sos-ink mb-6 text-center font-bold"
          style={{ fontFamily: "Tempus-Sans" }}
        >
          How to Play SOS?
        </Text>

        {/* Main Header Image */}
        <View className="w-full bg-gray-200 rounded-xl items-center justify-center sos-border overflow-hidden mb-8">
          <Image source={require("@/assets/images/eg-1.jpg")} />
        </View>

        {/* SETUP SECTION */}
        <Text
          className="text-2xl text-sos-ink mb-4 font-bold"
          style={{ fontFamily: "Tempus-Sans" }}
        >
          Setup
        </Text>

        {/* Step 1 */}
        <View className="mb-6">
          <View className="flex-row items-start mb-3">
            <MaterialCommunityIcons name="numeric-1-circle" size={28} color="black" className="mt-0.5" />
            <Text className="text-lg text-sos-ink ml-3 flex-1 font-bold" style={{ fontFamily: "Tempus-Sans" }}>
              Select number of players (2-6).
            </Text>
          </View>
          <View className="w-full bg-gray-200 rounded-xl items-center justify-center sos-border overflow-hidden">
            <Image source={require("@/assets/images/eg-no-players.jpeg")} />
          </View>
        </View>

        {/* Step 2 */}
        <View className="mb-6">
          <View className="flex-row items-start mb-3">
            <MaterialCommunityIcons name="numeric-2-circle" size={28} color="black" className="mt-0.5" />
            <Text className="text-lg text-sos-ink ml-3 flex-1 font-bold" style={{ fontFamily: "Tempus-Sans" }}>
              Tap on "START GAME!" to open the player configuration.
            </Text>
          </View>
          <View className="w-full bg-gray-200 rounded-xl items-center justify-center sos-border overflow-hidden">
            <Image source={require("@/assets/images/eg-start-game.jpeg")} />
          </View>
        </View>

        {/* Step 3 */}
        <View className="mb-6">
          <View className="flex-row items-start mb-3">
            <MaterialCommunityIcons name="numeric-3-circle" size={28} color="black" className="mt-0.5" />
            <View className="ml-3 flex-1">
              <Text className="text-lg text-sos-ink font-bold" style={{ fontFamily: "Tempus-Sans" }}>
                Configure player details:
              </Text>
              <Text className="text-base text-sos-ink mt-1" style={{ fontFamily: "Tempus-Sans" }}>
                • Name{'\n'}
                • Color{'\n'}
                • Human/AI
              </Text>
            </View>
          </View>
          <View className="w-full bg-gray-200 rounded-xl items-center justify-center sos-border overflow-hidden">
            <Image source={require("@/assets/images/eg-player-config.jpeg")} />
          </View>
        </View>

        {/* Step 4 */}
        <View className="mb-8">
          <View className="flex-row items-start mb-3">
            <MaterialCommunityIcons name="numeric-4-circle" size={28} color="black" className="mt-0.5" />
            <Text className="text-lg text-sos-ink ml-3 flex-1 font-bold" style={{ fontFamily: "Tempus-Sans" }}>
              Choose a Row size.
            </Text>
          </View>
          <View className="w-full bg-gray-200 rounded-xl items-center justify-center sos-border overflow-hidden">
            <Image source={require("@/assets/images/eg-sel-row.jpeg")} />
          </View>
        </View>

        {/* GAMEPLAY SECTION */}
        <Text
          className="text-2xl text-sos-ink mb-4 font-bold"
          style={{ fontFamily: "Tempus-Sans" }}
        >
          Gameplay
        </Text>

        {/* Gameplay 1 */}
        <View className="mb-6">
          <View className="flex-row items-start mb-3">
            <MaterialCommunityIcons name="check-circle" size={28} color="black" className="mt-0.5" />
            <Text className="text-lg text-sos-ink ml-3 flex-1 font-bold" style={{ fontFamily: "Tempus-Sans" }}>
              Players take turns placing 'S' or 'O' on empty squares.
            </Text>
          </View>
          <View className="w-full bg-gray-200 rounded-xl items-center justify-center sos-border overflow-hidden">
            <Image source={require("@/assets/images/eg-sel-so.jpeg")} />
          </View>
        </View>

        {/* Gameplay 2 */}
        <View className="mb-6">
          <View className="flex-row items-start mb-3">
            <MaterialCommunityIcons name="check-circle" size={28} color="black" className="mt-0.5" />
            <Text className="text-lg text-sos-ink ml-3 flex-1 font-bold" style={{ fontFamily: "Tempus-Sans" }}>
              Form 'SOS' sequences horizontally, vertically, or diagonally to score.
            </Text>
          </View>
          <View className="w-full bg-gray-200 rounded-xl items-center justify-center sos-border overflow-hidden">
            <Image source={require("@/assets/images/eg-sos.jpg")} />
          </View>
        </View>

        {/* Gameplay 3 */}
        <View className="mb-8">
          <View className="flex-row items-start mb-3">
            <MaterialCommunityIcons name="check-circle" size={28} color="black" className="mt-0.5" />
            <Text className="text-lg text-sos-ink ml-3 flex-1 font-bold" style={{ fontFamily: "Tempus-Sans" }}>
              Creating an SOS earns a point and an extra turn.
            </Text>
          </View>
          <View className="w-full bg-gray-200 rounded-xl items-center justify-center sos-border overflow-hidden">
            <Image source={require("@/assets/images/eg-player-score.jpeg")} />
          </View>
        </View>

        {/* WINNING SECTION */}
        <View className="bg-sos-green/20 p-5 rounded-2xl sos-border mb-6">
          <Text
            className="text-xl text-sos-ink mb-4 font-bold"
            style={{ fontFamily: "Tempus-Sans" }}
          >
            Winning
          </Text>
          <View className="flex-row items-start mb-3">
            <MaterialCommunityIcons name="trophy" size={24} color="black" className="mt-0.5" />
            <Text className="text-base text-sos-ink ml-3 flex-1" style={{ fontFamily: "Tempus-Sans" }}>
              Game ends when the grid is full.
            </Text>
          </View>
          <View className="flex-row items-start">
            <MaterialCommunityIcons name="trophy-award" size={24} color="black" className="mt-0.5" />
            <Text className="text-base text-sos-ink ml-3 flex-1" style={{ fontFamily: "Tempus-Sans" }}>
              Player with the most SOS sequences wins!
            </Text>
          </View>
        </View>

        {/* TIPS SECTION */}
        <View className="bg-sos-green/20 p-5 rounded-2xl sos-border mb-6">
          <Text
            className="text-xl text-sos-ink mb-4 font-bold"
            style={{ fontFamily: "Tempus-Sans" }}
          >
            Tips & Strategy
          </Text>
          <View className="flex-row items-start mb-3">
            <MaterialCommunityIcons name="star-circle" size={24} color="black" className="mt-0.5" />
            <Text className="text-base text-sos-ink ml-3 flex-1" style={{ fontFamily: "Tempus-Sans" }}>
              Look for opportunities to form multiple SOS in one move.
            </Text>
          </View>
          <View className="flex-row items-start mb-3">
            <MaterialCommunityIcons name="star-circle" size={24} color="black" className="mt-0.5" />
            <Text className="text-base text-sos-ink ml-3 flex-1" style={{ fontFamily: "Tempus-Sans" }}>
              Block opponents by disrupting their potential SOS formations.
            </Text>
          </View>
          <View className="flex-row items-start">
            <MaterialCommunityIcons name="controller-classic" size={24} color="black" className="mt-0.5" />
            <Text className="text-base text-sos-ink ml-3 flex-1 font-bold" style={{ fontFamily: "Tempus-Sans" }}>
              Enjoy the strategic challenge of SOS!
            </Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
};

export default SOSHowTo;
