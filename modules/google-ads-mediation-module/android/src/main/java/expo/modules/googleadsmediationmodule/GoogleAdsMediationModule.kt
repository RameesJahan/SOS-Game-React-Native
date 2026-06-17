package expo.modules.googleadsmediationmodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.inmobi.sdk.InMobiSdk

class GoogleAdsMediationModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("GoogleAdsMediationModule")

    Function("setInMobiIsAgeRestricted") { hasUserConsent: Boolean ->
      InMobiSdk.setIsAgeRestricted(hasUserConsent)
    }
  }
}
