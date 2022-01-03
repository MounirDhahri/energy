import React from "react"
import { Flex, Button } from "palette"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { MainNavigationStack } from "MainNavigationStack"
import { GlobalStore } from "../../store/GlobalStore"
import { graphql, useLazyLoadQuery } from "react-relay"
import { HomeUser } from "./HomeUser"
import { HomeQueryResponse } from "__generated__/HomeQuery.graphql"

interface HomeNavigationProps extends NativeStackScreenProps<MainNavigationStack, "Home"> {}

export const HomeScreen: React.FC<HomeNavigationProps> = ({}) => {
  const data = useLazyLoadQuery(
    graphql`
      query HomeQuery {
        me {
          ...HomeUser_me
        }
      }
    `,
    {}
  ) as HomeQueryResponse

  return (
    <Flex flex={1} justifyContent="center" alignItems="center">
      <HomeUser me={data?.me} />
      <Button
        onPress={async () => {
          await GlobalStore.actions.auth.signOut()
        }}
      >
        Log out
      </Button>
    </Flex>
  )
}
