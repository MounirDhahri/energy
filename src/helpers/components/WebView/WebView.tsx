import { StackScreenProps } from "@react-navigation/stack"
import { SettingsScreenStack } from "@Scenes/Settings/Settings"
import { unsafe__getEnvironment } from "@store/GlobalStore"
import { CloseIcon, Flex, Separator, Text } from "palette"
import React from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import WebView from "react-native-webview"

interface WebviewScreenProps extends StackScreenProps<SettingsScreenStack, "Webview"> {}

export const Webview: React.FC<WebviewScreenProps> = ({ navigation, route }) => {
  const webURL = unsafe__getEnvironment().strings.webURL
  const { url, title } = route?.params

  const uri = url.startsWith("/") ? webURL + url : url

  return (
    <Flex flex={1}>
      <Flex alignItems="center" flexDirection="row" py={1} backgroundColor="white">
        <Flex mx={1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CloseIcon />
          </TouchableOpacity>
        </Flex>

        <Flex alignItems="center" position="absolute" left={0} right={0} pointerEvents="none">
          <Text variant="md">{title}</Text>
        </Flex>
      </Flex>

      <Separator />

      <WebView source={{ uri }} />
    </Flex>
  )
}
