/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  
  themes: {
    slate: '#0f172a',
    gray: '#111827',
    zinc: '#18181b',
    neutral: '#171717',
    stone: '#1c1917',
    red: '#b91c1c',
    orange: '#7c2d12',
    amber: '#78350f',
    yellow: '#7c2d12',
    lime: '#365314',
    green: '#14532d',
    emerald: '#064e3b',
    teal: '#134e4a',
    cyan: '#164e63',
    sky: '#0c4a6e',
    blue: '#1e3a8a',
    indigo: '#312e81',
    violet: '#4c1d95',
    purple: '#581c87',
    fuchsia: '#701a75',
    pink: '#831843',
    rose: '#881337',
  }
};
