import React, { createContext, useContext, useEffect } from "react";
import { useSavedState } from "@/hooks/useSavedState";

interface AgeContextType {
  birthDate: string | null;
  setBirthDate: (dateStr: string) => void;
  isAgeGateComplete: boolean;
  isLoading: boolean;
}

export const AgeContext = createContext<AgeContextType | undefined>(undefined);

export const AgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [birthDate, setBirthDateState, isLoading] = useSavedState<string | null>("userBirthDate", null);

  const isAgeGateComplete = birthDate !== null;

  useEffect(() => {
    const subscription = AgeContextBridge.subscribe((newBirthDate) => {
      // 1. Save the new value to storage immediately
      setBirthDateState(newBirthDate);
    });

    // 3. Optional: Clean up subscription on unmount
    return () => {
      subscription();
    };
  }, [setBirthDateState]); // 👈 Ensure setBirthDateState is included

  return (
    <AgeContext.Provider
      value={{
        birthDate,
        setBirthDate: setBirthDateState,
        isAgeGateComplete,
        isLoading,
      }}
    >
      {children}
    </AgeContext.Provider>
  );
};

export const useAgeContext = () => {
  const context = useContext(AgeContext);
  if (context === undefined) {
    throw new Error("useAgeContext must be used within an AgeProvider");
  }
  return context;
};

const listeners = new Set<(birthDate: string) => void>();

export const AgeContextBridge = {
  // Call this from OUTSIDE React components to update data
  updateBirthDate(birthDate: string) {
    listeners.forEach((listener: (birthDate: string) => void) => listener(birthDate));
  },
  // Used internally by the Provider to listen for updates
  subscribe(listener: (birthDate: string) => void) {
    listeners.add(listener);
    return () => listeners.delete(listener); // Cleanup function
  }
};
