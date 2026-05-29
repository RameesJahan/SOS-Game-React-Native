import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useAdContext } from '@/context/ad-context';
import { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { REWARDED_AD_UNIT_ID } from '@/utils/AdHelpers';
import { useRouter } from 'expo-router';
import CustomModal from '@/components/CustomModal';

const RemoveAdsScreen = () => {
  const router = useRouter();
  const { isAdFree, watchedAdsCount, adFreeUntil, recordAdWatched, isLoading } = useAdContext();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const rewardedRef = useRef<RewardedAd | null>(null);

  // Keep track of latest state for the event listeners without causing re-renders
  const stateRef = useRef({ isAdFree, watchedAdsCount });

  const loadAd = () => {
    const rewarded = RewardedAd.createForAdRequest(REWARDED_AD_UNIT_ID);
    rewardedRef.current = rewarded;

    rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log("Rewarded ad loaded");
      setIsLoaded(true);
    });

    rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        console.log("Rewarded ad earned");
        const { isAdFree: currentIsAdFree, watchedAdsCount: currentCount } = stateRef.current;
        recordAdWatched();
        setIsLoaded(false);
        rewardedRef.current?.removeAllListeners();
        loadAd();

        // If it wasn't ad-free and they just watched the 3rd ad
        if (!currentIsAdFree && currentCount === 2) {
          setShowSuccessModal(true);
        }
      }
    );

    // const unsubscribeClosed = rewarded.addAdEventListener(RewardedAdEventType., () => {
    //   setIsLoaded(false);
    //   rewarded.load(); // Load the next ad immediately for a seamless experience
    // });

    rewarded.load();
  }

  useEffect(() => {
    stateRef.current = { isAdFree, watchedAdsCount };
  }, [isAdFree, watchedAdsCount]);

  useEffect(() => {
    loadAd();
    return () => {
      rewardedRef.current?.removeAllListeners();
    };
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 bg-sos-bg justify-center items-center">
        <ActivityIndicator size="large" color="#1A1A1A" />
      </View>
    );
  }

  const handleWatchAd = () => {
    console.log(rewardedRef.current?.loaded, 'rewardedRef.current.loaded');
    if (rewardedRef.current && rewardedRef.current.loaded) {
      rewardedRef.current.show();
    } else {
      Alert.alert('Ad Not Ready', 'Please wait a moment for the ad to load.');
    }
  };

  const remainingDays = adFreeUntil
    ? Math.max(0, Math.ceil((adFreeUntil - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <View className="flex-1 bg-sos-bg px-6 pt-12">
      <Pressable onPress={() => router.back()} className="mb-6">
        <Text className="text-sos-ink text-lg" style={{ fontFamily: "Tempus-Sans" }}>← Back</Text>
      </Pressable>

      <Text className="text-3xl text-sos-ink mb-6 text-center" style={{ fontFamily: "Tempus-Sans" }}>
        Remove Ads
      </Text>

      {!isAdFree ? (
        <View className="bg-white p-6 rounded-2xl sos-border shadow-card items-center">
          <Text className="text-lg text-sos-ink text-center mb-6" style={{ fontFamily: "Tempus-Sans" }}>
            Watch 3 ads to remove all banner and interstitial ads for 6 days!
          </Text>

          {/* Progress Bar Container */}
          <View className="w-full bg-gray-200 h-6 rounded-full overflow-hidden sos-border mb-2">
            <View
              className="bg-sos-green h-full"
              style={{ width: `${(watchedAdsCount / 3) * 100}%` }}
            />
          </View>
          <Text className="text-sm text-gray-600 mb-8" style={{ fontFamily: "Tempus-Sans" }}>
            Progress: {watchedAdsCount} / 3 Ads Watched
          </Text>

          <Pressable
            onPress={handleWatchAd}
            className={`w-full rounded-xl py-4 items-center justify-center sos-border ${isLoaded ? 'bg-sos-green' : 'bg-gray-300'}`}
            disabled={!isLoaded}
          >
            {isLoaded ? (
              <Text className="text-xl uppercase text-sos-ink" style={{ fontFamily: "Tempus-Sans" }}>
                Watch Ad
              </Text>
            ) : (
              <ActivityIndicator color="#1A1A1A" />
            )}
          </Pressable>
        </View>
      ) : (
        <View className="bg-white p-6 rounded-2xl sos-border shadow-card items-center">
          <Text className="text-xl text-sos-ink text-center mb-4" style={{ fontFamily: "Tempus-Sans" }}>
            🎉 You are Ad-Free!
          </Text>

          <Text className="text-base text-gray-600 text-center mb-8" style={{ fontFamily: "Tempus-Sans" }}>
            Your ad-free period will expire in about {remainingDays} days.
            You can watch another ad now to extend it by 2 days.
          </Text>

          <Pressable
            onPress={handleWatchAd}
            className={`w-full rounded-xl py-4 items-center justify-center sos-border ${isLoaded ? 'bg-sos-green' : 'bg-gray-300'}`}
            disabled={!isLoaded}
          >
            {isLoaded ? (
              <Text className="text-xl uppercase text-sos-ink" style={{ fontFamily: "Tempus-Sans" }}>
                Watch Ad (+2 Days)
              </Text>
            ) : (
              <ActivityIndicator color="#1A1A1A" />
            )}
          </Pressable>
        </View>
      )}

      <Text className="text-xs text-gray-500 text-center mt-6 px-4" style={{ fontFamily: "Tempus-Sans" }}>
        Note: Ad-free progress is saved locally. If you clear app data or uninstall the game, your progress and ad-free status will be lost.
      </Text>

      <CustomModal
        visible={showSuccessModal}
        title="Success!"
        message="You have successfully removed ads for 6 days. Enjoy an uninterrupted experience!"
        buttons={[
          {
            text: "Awesome", onPress: () => {
              setShowSuccessModal(false);
              router.back();
            }
          }
        ]}
        onClose={() => setShowSuccessModal(false)}
      />
    </View>
  );
};

export default RemoveAdsScreen;
