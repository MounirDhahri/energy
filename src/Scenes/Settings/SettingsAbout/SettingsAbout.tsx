import { MenuItem } from "@helpers/components/MenuItem"
import { StackScreenProps } from "@react-navigation/stack"
import { Flex, Join, Separator } from "palette"
import React from "react"
import { version } from "../../../../package.json"
import { SettingsScreenStack } from "../Settings"

interface SettingsPrivacyDataRequestScreenProps extends StackScreenProps<SettingsScreenStack, "SettingsAbout"> {}

export const SettingsAboutScreen: React.FC<SettingsPrivacyDataRequestScreenProps> = ({ navigation }) => {
  return (
    <Flex flex={1} backgroundColor="white">
      <Join separator={<Separator />}>
        <MenuItem
          title="Terms of Use"
          onPress={() => {
            navigation.navigate("Webview", { url: "/terms", title: "Terms of Use" })
          }}
        />
        <MenuItem
          title="Privacy Policy"
          onPress={() => {
            navigation.navigate("Webview", { url: "/privacy", title: "Privacy Policy" })
          }}
        />
        <MenuItem
          title="Conditions of Sale"
          onPress={() => {
            navigation.navigate("Webview", { url: "/conditions-of-sale", title: "Conditions of Sale" })
          }}
        />
        <MenuItem title="Version" text={version} chevron={false} />
      </Join>
    </Flex>
  )
}
