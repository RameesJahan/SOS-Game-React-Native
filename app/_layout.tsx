import "../global.css";
import { PermissionStatus, requestAuthorization } from "@/utils/AdHelpers";
import { SoundContextProvider } from "@/context/sound-context";
import { AdProvider } from "@/context/ad-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";
import * as SplashScreen from "expo-splash-screen";
import { AgeProvider, useAgeContext } from "@/context/age-context";
import AgeGateModal from "@/components/AgeGateModal";

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const { isAgeGateComplete, birthDate } = useAgeContext();

  useEffect(() => {
    if (!isAgeGateComplete || !birthDate) return;

    const initAds = async () => {
      // Calculate age
      const dob = new Date(birthDate);
      const ageDifMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      const isUnder13 = age < 13;
      const isUnder18 = age < 18;

      console.log("Age:", age);
      console.log("Is Under 13:", isUnder13);
      console.log("Is Under 18:", isUnder18);

      // Request tracking authorization
      const status = await requestAuthorization();
      console.log("Tracking authorization status:", status);

      if (status === PermissionStatus.UNDETERMINED) {
        // Apply Child Directed Treatment based on age calculation
        await mobileAds().setRequestConfiguration({
          maxAdContentRating: isUnder13 ? MaxAdContentRating.G : isUnder18 ? MaxAdContentRating.T : MaxAdContentRating.MA,

          // This explicitly handles the US (Under 13)
          tagForChildDirectedTreatment: isUnder13,

          // By setting this to true, Google checks the user's IP. 
          // If they are in Europe and under 16, Google automatically restricts the ads.
          tagForUnderAgeOfConsent: isUnder18,
        });

        await mobileAds().initialize();
      }
    };

    initAds();
  }, [isAgeGateComplete, birthDate]);

  return (
    <>
      <AdProvider>
        <SoundContextProvider>
          <StatusBar hidden />
          <Stack screenOptions={{ headerShown: false, animation: "simple_push" }} />
        </SoundContextProvider>
      </AdProvider>
      <AgeGateModal />
    </>
  );
};

const AppLayout = () => {
  return (
    <AgeProvider>
      <AppContent />
    </AgeProvider>
  );
};


export default AppLayout;
