import "../global.css";
import { PermissionStatus, requestAuthorization } from "@/utils/AdHelpers";
import { SoundContextProvider } from "@/context/sound-context";
import { AdProvider } from "@/context/ad-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { use, useEffect, useState } from "react";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";
import * as SplashScreen from "expo-splash-screen";
import { AgeContext, AgeContextBridge, AgeProvider, useAgeContext } from "@/context/age-context";
import AgeGateModal from "@/components/AgeGateModal";
import { registerDevMenuItems } from 'expo-dev-menu';
import GoogleAdsMediationModule from "@/modules/google-ads-mediation-module/src/GoogleAdsMediationModule";

SplashScreen.preventAutoHideAsync();

const devMenuItems = [
  {
    name: 'Open Ad Inspector',
    callback: () => mobileAds().openAdInspector(),
  },
  {
    name: 'Set Age to 10',
    callback: () => {
      AgeContextBridge.updateBirthDate(new Date(Date.now() - 10 * 365 * 24 * 60 * 60 * 1000).toISOString());
    }
  },
  {
    name: 'Set Age to 16',
    callback: () => {
      AgeContextBridge.updateBirthDate(new Date(Date.now() - 16 * 365 * 24 * 60 * 60 * 1000).toISOString());
    }
  },
  {
    name: 'Set Age to 20',
    callback: () => {
      AgeContextBridge.updateBirthDate(new Date(Date.now() - 20 * 365 * 24 * 60 * 60 * 1000).toISOString());
    }
  },
];

registerDevMenuItems(devMenuItems);


const AppContent = () => {
  const { isAgeGateComplete, birthDate } = useAgeContext();
  const [isAdReady, setIsAdReady] = useState<boolean>(false);

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

      console.log("set mobile ads config");
      if (isUnder13) {
        GoogleAdsMediationModule.setInMobiIsAgeRestricted(true);
      } else {
        GoogleAdsMediationModule.setInMobiIsAgeRestricted(false);
      }
      // Apply Child Directed Treatment based on age calculation
      await mobileAds().setRequestConfiguration({
        maxAdContentRating: isUnder13 ? MaxAdContentRating.G : isUnder18 ? MaxAdContentRating.T : MaxAdContentRating.MA,

        // This explicitly handles the US (Under 13)
        tagForChildDirectedTreatment: isUnder13,

        // By setting this to true, Google checks the user's IP. 
        // If they are in Europe and under 16, Google automatically restricts the ads.
        tagForUnderAgeOfConsent: isUnder18,
      });

      const AdapterStatuses = await mobileAds().initialize();

      setIsAdReady(true);

      AdapterStatuses.forEach((adapterStatus) => {
        console.log("[Adapter status]", adapterStatus.name, adapterStatus.state, adapterStatus.description);
      });
    }

    initAds();
  }, [isAgeGateComplete, birthDate]);

  return (
    <>
      <AdProvider isAdReady={isAdReady}>
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
