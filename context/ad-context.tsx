import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSavedState } from "@/hooks/useSavedState";

interface AdContextType {
  isAdReady: boolean;
  isAdFree: boolean;
  watchedAdsCount: number;
  adFreeUntil: number | null;
  recordAdWatched: () => void;
  isLoading: boolean;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export const AdProvider: React.FC<{ children: React.ReactNode, isAdReady: boolean }> = ({
  children,
  isAdReady,
}) => {
  // We store the timestamp when the ad-free period expires
  const [adFreeUntil, setAdFreeUntil, isLoadingAdFree] = useSavedState<number | null>(
    "adFreeUntil",
    null
  );

  // We store the number of ads watched towards the goal of 3
  const [watchedAdsCount, setWatchedAdsCount, isLoadingWatchedAds] = useSavedState<number>(
    "watchedAdsCount",
    0
  );

  const [isAdReadyState, setIsAdReadyState] = useState(false);
  const [isAdFree, setIsAdFree] = useState(false);

  // Keep track of latest state for the event listeners without causing re-renders
  const stateRef = useRef({ isAdFree, watchedAdsCount, adFreeUntil });

  useEffect(() => {
    setIsAdReadyState(isAdReady);
  }, [isAdReady]);

  useEffect(() => {
    console.log(isAdFree, 'isAdFree');
    console.log(adFreeUntil, 'adFreeUntil');
    if (adFreeUntil !== null) {
      setIsAdFree(Date.now() < adFreeUntil);
    } else {
      setIsAdFree(false);
    }
  }, [adFreeUntil]);

  useEffect(() => {
    stateRef.current = { isAdFree, watchedAdsCount, adFreeUntil };
  }, [isAdFree, watchedAdsCount, adFreeUntil]);

  const recordAdWatched = useCallback(() => {
    const now = Date.now();
    const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
    const SIX_DAYS_MS = 6 * 24 * 60 * 60 * 1000;

    const { watchedAdsCount: currentCount, adFreeUntil: currentAdFreeUntil } = stateRef.current;


    if (currentAdFreeUntil && now < currentAdFreeUntil) {
      console.log("Ad free is active , extending by 2 days");
      // Feature already activated, extend by 2 days
      setAdFreeUntil(currentAdFreeUntil + TWO_DAYS_MS);
    } else {
      console.log('[recordadwatched]watchedAdsCount', currentCount);
      // Not activated yet
      if (currentCount + 1 >= 3) {
        console.log("Ad free is not active , activating for 6 days");
        // Activate for 6 days'
        setIsAdFree(true);
        setAdFreeUntil(now + SIX_DAYS_MS);
        setWatchedAdsCount(0); // Reset for future
      } else {
        console.log("Ad free is not active , incrementing watched ads count");
        // Just increment
        setWatchedAdsCount((prev) => prev + 1);
      }
    }
  }, []);

  const isLoading = isLoadingAdFree || isLoadingWatchedAds;

  return (
    <AdContext.Provider
      value={{
        isAdReady: isAdReadyState,
        isAdFree,
        watchedAdsCount,
        adFreeUntil,
        recordAdWatched,
        isLoading,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};

export const useAdContext = () => {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error("useAdContext must be used within an AdProvider");
  }
  return context;
};
