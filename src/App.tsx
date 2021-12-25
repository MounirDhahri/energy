import { Theme } from "palette"
import React from "react"
import { LogBox } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { GlobalStoreProvider } from "./store/GlobalStore"
import { MainNavigationStack } from "./MainNavigationStack"

LogBox.ignoreLogs(["Expected style "])

export const App = () => {
  return (
    <GlobalStoreProvider>
      <SafeAreaProvider>
        <Theme>
          <MainNavigationStack />
        </Theme>
      </SafeAreaProvider>
    </GlobalStoreProvider>
  )
}
