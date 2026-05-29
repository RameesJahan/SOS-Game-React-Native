import { View, Text, Pressable, Linking, ScrollView } from "react-native";
import React, { useState } from "react";
import SOSHowToModal from "@/components/SOSHowToModal";
import SOSHomeLogo from "@/components/SOSHomeLogo";
import AboutLink from "@/components/AboutLink";
import { router } from "expo-router";
import Credits from "@/components/AboutCredits";
import * as Application from 'expo-application';

const AboutScreen = () => {
  const [isShowHowTo, setIsShowHowTo] = useState(false);
  return (
    <View className="flex-1 bg-sos-bg px-6 pt-12">
      <Pressable onPress={() => router.back()} className="mb-6 flex-row items-center">
        <Text className="text-sos-ink text-lg" style={{ fontFamily: "Tempus-Sans" }}>← Back</Text>
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-10 items-center">
        <SOSHomeLogo />

        <Text className="text-lg text-sos-ink mt-2" style={{ fontFamily: "Tempus-Sans" }}>Version {Application.nativeApplicationVersion}</Text>
        <Text className="text-base text-gray-600 mb-8" style={{ fontFamily: "Tempus-Sans" }}>
          Developed by{" "}
          <Text
            className="text-blue-600"
            onPress={() => Linking.openURL("https://rameesjahan.github.io")}
          >
            Ramees Jahan
          </Text>
        </Text>

        <View className="w-full bg-white rounded-2xl p-2 sos-border shadow-card mb-6">
          <AboutLink
            title="How to play?"
            icon="gamepad-variant-outline"
            onPress={() => setIsShowHowTo(true)}
          />
          <AboutLink
            title="Privacy Policy"
            icon="shield-account-outline"
            onPress={() => Linking.openURL("https://kaakkatech.github.io/sos-game-privacy-policy/")}
          />
          <AboutLink
            title="Terms of Use"
            icon="file-document-outline"
            onPress={() => router.push("/about/termsofuse")}
            isLast
          />
        </View>

        <View className="w-full bg-white rounded-2xl p-6 sos-border shadow-card">
          <Credits />
        </View>

        <SOSHowToModal
          visible={isShowHowTo}
          onClose={() => setIsShowHowTo(false)}
        />
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
