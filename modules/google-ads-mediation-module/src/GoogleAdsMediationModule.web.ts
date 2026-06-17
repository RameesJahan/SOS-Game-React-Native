import { registerWebModule, NativeModule } from 'expo';

class GoogleAdsMediationModule extends NativeModule<{}> {
  setInMobiIsAgeRestricted(isAgeRestricted: boolean): void {
    console.log('setInMobiIsAgeRestricted called on web, no-op');
  }
}

export default registerWebModule(GoogleAdsMediationModule, 'GoogleAdsMediationModule');
