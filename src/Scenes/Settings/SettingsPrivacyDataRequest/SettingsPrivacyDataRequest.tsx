import { LinkText } from "@helpers/components/LinkText"
import { sendEmail } from "@helpers/utils/sendEmail"
import { StackScreenProps } from "@react-navigation/stack"
import { Box, Button, Flex, Join, Sans, Spacer } from "palette"
import React from "react"
import { SettingsScreenStack } from "../Settings"

interface SettingsPrivacyDataRequestScreenProps
  extends StackScreenProps<SettingsScreenStack, "SettingsPrivacyDataRequest"> {}

export const SettingsPrivacyDataRequestScreen: React.FC<SettingsPrivacyDataRequestScreenProps> = ({ navigation }) => {
  return (
    <Flex flex={1} backgroundColor="white">
      <Spacer my={1} />
      <Box mx={2}>
        <Join separator={<Spacer mb={2} />}>
          <Sans size="3" textAlign="left">
            Please see Artsy’s{" "}
            <LinkText
              onPress={() => {
                navigation.navigate("Webview", { url: "/privacy", title: "Privacy Policy" })
              }}
            >
              Privacy Policy
            </LinkText>{" "}
            for more information about the information we collect, how we use it, and why we use it.
          </Sans>
          <Sans size="3" textAlign="left">
            To submit a personal data request tap the button below or email{" "}
            <LinkText
              onPress={() => {
                sendEmail({ toAddress: "privacy@artsy.net", subject: "Personal Data Request" })
              }}
            >
              privacy@artsy.net.
            </LinkText>{" "}
          </Sans>
          <Button
            variant="fillGray"
            block
            size="large"
            mt={1}
            onPress={() => {
              sendEmail({
                toAddress: "privacy@artsy.net",
                subject: "Personal Data Request",
                body: "Hello, I'm contacting you to ask that...",
              })
            }}
          >
            Do not sell my personal information
          </Button>
        </Join>
      </Box>
    </Flex>
  )
}
