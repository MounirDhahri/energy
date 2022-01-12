import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import React, { useEffect } from "react"
import { ArtistsScreen } from "@Scenes/Artists/Artists"
import { ShowsScreen } from "@Scenes/Shows/Shows"
import { AlbumsScreen } from "@Scenes/Albums/Albums"
import { SelectPartner } from "@Scenes/SelectPartner/SelectPartner"
import { useColor, useTheme } from "palette"
import { GlobalStore } from "../store/GlobalStore"
import { createStackNavigator } from "@react-navigation/stack"
import { SettingsScreen } from "@Scenes/Settings.tsx/Settings"

// tslint:disable-next-line:interface-over-type-literal
export type TabNavigatorStack = {
  Artists: undefined
  Shows: undefined
  Albums: undefined
}

const Tab = createBottomTabNavigator<TabNavigatorStack>()

export const TabNavigatorStack = () => {
  const color = useColor()
  const {
    theme: { fonts },
  } = useTheme()

  return (
    // <NavigationContainer independent>
    <Tab.Navigator
      screenOptions={({ route }) => {
        let routeSpecificOptions: BottomTabNavigationOptions = {}

        switch (route.name) {
          case "Artists":
            routeSpecificOptions = { tabBarAccessibilityLabel: "Artists", tabBarLabel: "Artists" }
            break
          case "Albums":
            routeSpecificOptions = { tabBarAccessibilityLabel: "Albums", tabBarLabel: "Albums" }
            break
          case "Shows":
            routeSpecificOptions = { tabBarAccessibilityLabel: "Shows", tabBarLabel: "Shows" }
            break
          default:
            break
        }
        return {
          tabBarItemStyle: {
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarIconStyle: { display: "none" },
          tabBarLabelStyle: {
            fontFamily: fonts.sans.medium,
            fontSize: 14,
          },
          tabBarActiveTintColor: color("blue100"),
          tabBarInactiveTintColor: color("black60"),
          ...routeSpecificOptions,
        }
      }}
    >
      <Tab.Screen name="Artists" component={ArtistsScreen} />
      <Tab.Screen name="Shows" component={ShowsScreen} />
      <Tab.Screen name="Albums" component={AlbumsScreen} />
    </Tab.Navigator>
    // </NavigationContainer>
  )
}

// tslint:disable-next-line:interface-over-type-literal
export type MainAuthenticatedStackProps = {
  Settings: undefined
  TabNavigatorStack: undefined
}

export const MainAuthenticatedStackNavigator = createStackNavigator<MainAuthenticatedStackProps>()

// // tslint:disable-next-line:variable-name

export const MainAuthenticatedStack = () => {
  return (
    <MainAuthenticatedStackNavigator.Navigator>
      <MainAuthenticatedStackNavigator.Screen
        name="TabNavigatorStack"
        component={TabNavigatorStack}
        options={{ headerShown: false }}
      />
      <MainAuthenticatedStackNavigator.Screen name="Settings" component={SettingsScreen} />
    </MainAuthenticatedStackNavigator.Navigator>
  )
}

export const AuthenticatedStack = () => {
  const selectedPartner = GlobalStore.useAppState((state) => state.activePartnerID)

  if (!selectedPartner) {
    return <SelectPartner />
  }

  return <MainAuthenticatedStack />
}
