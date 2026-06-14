import {
  getTrackingPermissionsAsync,
  PermissionStatus,
  requestTrackingPermissionsAsync,
} from "expo-tracking-transparency";
import { TestIds } from "react-native-google-mobile-ads";

export { PermissionStatus };

export const SHOW_ADS = true;
const isDev = __DEV__;

export const requestAuthorization = async () => {
  const { status } = await getTrackingPermissionsAsync();
  if (status === PermissionStatus.UNDETERMINED) {
    await requestTrackingPermissionsAsync();
  }
  return status;
};

export const BANNER_AD_UNIT_ID = isDev
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-2941930161933702/6564311130";

export const REWARDED_AD_UNIT_ID = isDev
  ? TestIds.REWARDED
  : "ca-app-pub-2941930161933702/2773341876"; // fallback to Test ID for now if not provided

