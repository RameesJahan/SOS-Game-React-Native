import { useSavedState } from "@/hooks/useSavedState";
import { useAudioPlayer } from "expo-audio";
import { createContext, useContext, useEffect, useState } from "react";

interface SoundContextProps {
  isSoundOn: boolean;
  isLoading: boolean;
  setIsSoundOn: (on: boolean) => void;
}

const SoundContext = createContext<SoundContextProps>({
  isSoundOn: true,
  isLoading: true,
  setIsSoundOn: (on: boolean) => {},
});

const soundSource = require("@/assets/audios/bg-music-2.mp3");
export const SoundContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSoundOn, setIsSoundOn, isLoading] = useSavedState<boolean>(
    "IS_SOUND",
    true
  );
  const sound = useAudioPlayer(soundSource);
  useEffect(() => {
    if (isSoundOn && !isLoading) {
      sound.loop = true;
      sound.play();
    } else {
      sound.pause();
    }
  }, [isSoundOn, isLoading]);

  return (
    <SoundContext.Provider value={{ isSoundOn, setIsSoundOn, isLoading }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => useContext(SoundContext);
