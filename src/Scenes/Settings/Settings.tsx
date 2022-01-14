import { Webview } from "@helpers/components/WebView/WebView"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import React from "react"
import { SettingsScreen } from "./Settings/Settings"
import { SettingsAboutScreen } from "./SettingsAbout/SettingsAbout"
import { SettingsPrivacyDataRequestScreen } from "./SettingsPrivacyDataRequest/SettingsPrivacyDataRequest"

export type SettingsScreenStack = {
  Settings: undefined
  SettingsPrivacyDataRequest: undefined
  SettingsAbout: undefined
  Webview: { url: string; title: string }
}

export const SettingsScreenStackNavigator = createStackNavigator<SettingsScreenStack>()

export const SettingsScreenStack = () => {
  return (
    <NavigationContainer independent>
      <SettingsScreenStackNavigator.Navigator>
        <SettingsScreenStackNavigator.Group>
          <SettingsScreenStackNavigator.Screen
            name="Settings"
            component={SettingsScreen}
            // options={{ headerShown: false }}
          />
          <SettingsScreenStackNavigator.Screen
            name="SettingsPrivacyDataRequest"
            component={SettingsPrivacyDataRequestScreen}
          />
          <SettingsScreenStackNavigator.Screen name="SettingsAbout" component={SettingsAboutScreen} />
        </SettingsScreenStackNavigator.Group>

        <SettingsScreenStackNavigator.Group
          screenOptions={{
            ...TransitionPresets.ModalTransition,
            headerShown: false,
          }}
        >
          <SettingsScreenStackNavigator.Screen
            name="Webview"
            initialParams={{ url: "" }}
            component={Webview}
            options={{ headerShown: false }}
          />
        </SettingsScreenStackNavigator.Group>
      </SettingsScreenStackNavigator.Navigator>
    </NavigationContainer>
  )
}
