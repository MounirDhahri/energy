import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { HomeScreen } from "@Scenes/Home/Home"
import { LoginScreen } from "@Scenes/Login/Login"
import { GlobalStore } from "@store/GlobalStore"

// tslint:disable-next-line:interface-over-type-literal
export type MainNavigationStack = {
  Home: undefined
  Login: undefined
}

const Stack = createNativeStackNavigator<MainNavigationStack>()

export const MainNavigationStack = () => {
  const isLoggedIn = !!GlobalStore.useAppState((store) => store.auth.userAccessToken)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  )
}
