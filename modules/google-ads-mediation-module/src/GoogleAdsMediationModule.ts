import { NativeModule, requireNativeModule } from 'expo';

declare class GoogleAdsMediationModule extends NativeModule<{}> {
  setInMobiIsAgeRestricted(isAgeRestricted: boolean): void;
}

export default requireNativeModule<GoogleAdsMediationModule>('GoogleAdsMediationModule');
