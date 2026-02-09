import {
  getTrackingPermissionsAsync,
  PermissionStatus,
  requestTrackingPermissionsAsync,
} from "expo-tracking-transparency";
import { TestIds } from "react-native-google-mobile-ads";

export { PermissionStatus };

export const requestAuthorization = async () => {
  const { status } = await getTrackingPermissionsAsync();
  if (status === PermissionStatus.UNDETERMINED) {
    await requestTrackingPermissionsAsync();
  }
  return status;
};

export const BANNER_AD_UNIT_ID = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-2941930161933702/6564311130";
