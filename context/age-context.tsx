import React, { createContext, useContext } from "react";
import { useSavedState } from "@/hooks/useSavedState";

interface AgeContextType {
  birthDate: string | null;
  setBirthDate: (dateStr: string) => void;
  isAgeGateComplete: boolean;
  isLoading: boolean;
}

const AgeContext = createContext<AgeContextType | undefined>(undefined);

export const AgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [birthDate, setBirthDateState, isLoading] = useSavedState<string | null>("userBirthDate", null);

  const isAgeGateComplete = birthDate !== null;

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
