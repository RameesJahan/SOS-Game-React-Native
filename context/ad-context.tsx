import React, { createContext, useContext, useEffect, useState } from "react";
import { useSavedState } from "@/hooks/useSavedState";

interface AdContextType {
  isAdFree: boolean;
  watchedAdsCount: number;
  adFreeUntil: number | null;
  recordAdWatched: () => void;
  isLoading: boolean;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export const AdProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
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

  const [isAdFree, setIsAdFree] = useState(false);

  useEffect(() => {
    if (adFreeUntil !== null) {
      setIsAdFree(Date.now() < adFreeUntil);
    } else {
      setIsAdFree(false);
    }
  }, [adFreeUntil]);

  const recordAdWatched = () => {
    const now = Date.now();
    const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
    const SIX_DAYS_MS = 6 * 24 * 60 * 60 * 1000;

    if (adFreeUntil && now < adFreeUntil) {
      // Feature already activated, extend by 2 days
      setAdFreeUntil(adFreeUntil + TWO_DAYS_MS);
    } else {
      // Not activated yet
      if (watchedAdsCount + 1 >= 3) {
        // Activate for 6 days
        setAdFreeUntil(now + SIX_DAYS_MS);
        setWatchedAdsCount(0); // Reset for future
      } else {
        // Just increment
        setWatchedAdsCount(watchedAdsCount + 1);
      }
    }
  };

  const isLoading = isLoadingAdFree || isLoadingWatchedAds;

  return (
    <AdContext.Provider
      value={{
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
