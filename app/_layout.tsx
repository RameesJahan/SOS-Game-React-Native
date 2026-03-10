import "../global.css";
import { PermissionStatus, requestAuthorization } from "@/utils/AdHelpers";
import { SoundContextProvider } from "@/context/sound-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import mobileAds from "react-native-google-mobile-ads";

const AppLayout = () => {
  useEffect(() => {
    const loadAds = async () => {
      const status = await requestAuthorization();
      console.log("Tracking authorization status:", status);
      if (status === PermissionStatus.UNDETERMINED) {
        await mobileAds().initialize();
      }
    };
    loadAds();
  }, []);

  return (
    <SoundContextProvider>
      <StatusBar hidden />
      <Stack screenOptions={{ headerShown: false, animation: "simple_push" }} />
    </SoundContextProvider>
  );
};

export default AppLayout;
