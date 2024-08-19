import { View, Text, Pressable, Linking } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SOSHowToModal from "@/components/SOSHowToModal";
import SOSHomeLogo from "@/components/SOSHomeLogo";
import AboutLink from "@/components/AboutLink";
import { router } from "expo-router";
import Credits from "@/components/AboutCredits";

type Props = {};

const AboutScreen = (props: Props) => {
  const [isShowHowTo, setIsShowHowTo] = useState(false);
  return (
    <View>
      <SafeAreaView className="flex items-center p-2 bg-white">
        <SOSHomeLogo />
        <Text className="text-center font-semibold">Version 1.0.0</Text>
        <Text className="text-center font-semibold">
          Developed by{" "}
          <Text
            className="text-blue-600"
            onPress={() => Linking.openURL("https://rameesjahan.github.io")}
          >
            Ramees Jahan
          </Text>
        </Text>
        <AboutLink title="How to play?" onPress={() => setIsShowHowTo(true)} innerClassName="mt-4"/>
        <AboutLink title="Privacy Policy" onPress={() => Linking.openURL("https://kaakka.tech/sos-game-privacy-policy/")} />
        <AboutLink title="Terms of Use" onPress={() => router.push("/about/termsofuse")} />
          <View>
            <Credits />
          </View>
        <SOSHowToModal
          visible={isShowHowTo}
          onClose={() => setIsShowHowTo(false)}
        />
      </SafeAreaView>
    </View>
  );
};

export default AboutScreen;
