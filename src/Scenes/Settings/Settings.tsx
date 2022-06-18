import { Webview } from "@helpers/components/WebView/WebView"
import { HeaderBackButton } from "@react-navigation/elements"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator, StackScreenProps, TransitionPresets } from "@react-navigation/stack"
import { MainAuthenticatedStackProps } from "@routes/AuthenticatedNavigationStacks"
import React, { useRef } from "react"
import { SettingsScreen } from "./Settings/Settings"
import { SettingsAboutScreen } from "./SettingsAbout/SettingsAbout"
import { SettingsPresenterModeScreen } from "./SettingsPresenterMode/SettingsPresenterMode"
import { SettingsPrivacyDataRequestScreen } from "./SettingsPrivacyDataRequest/SettingsPrivacyDataRequest"

export type SettingsScreenStack = {
  Settings: undefined
  SettingsPrivacyDataRequest: undefined
  SettingsAbout: undefined
  Webview: { url: string; title: string }
  SettingsPresenterMode: undefined
}

interface SettingsScreenStackNavigatorProps extends StackScreenProps<MainAuthenticatedStackProps, "Settings"> {}

export const SettingsScreenStackNavigator = createStackNavigator<SettingsScreenStack>()

export const SettingsScreenStack: React.FC<SettingsScreenStackNavigatorProps> = ({ navigation }) => {
  const navContainerRef = useRef<NavigationContainerRef<SettingsScreenStack>>(null)

  const onHeaderBackButtonPress = () => {
    const currentRoute = navContainerRef.current?.getCurrentRoute()
    const isFirstScreen = currentRoute?.name === "Settings"
    console.log("called")

    if (isFirstScreen) {
      navigation?.goBack()
      return
    }

    navContainerRef.current?.goBack()
  }

  return (
    <NavigationContainer independent ref={navContainerRef}>
      <SettingsScreenStackNavigator.Navigator
        screenOptions={{
          headerLeft: (props) => <HeaderBackButton {...props} onPress={() => onHeaderBackButtonPress()} />,
        }}
      >
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
          <SettingsScreenStackNavigator.Screen
            name="SettingsPresenterMode"
            options={{ title: "Presenter Mode" }}
            component={SettingsPresenterModeScreen}
          />
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
