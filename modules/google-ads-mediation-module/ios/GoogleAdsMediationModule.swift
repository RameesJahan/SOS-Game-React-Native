import ExpoModulesCore

public class GoogleAdsMediationModule: Module {
  public func definition() -> ModuleDefinition {
    Name("GoogleAdsMediationModule")

    Function("hello") {
      return "Hello world! 👋"
    }
  }
}
