import AsyncStorage from "@react-native-async-storage/async-storage"
import { persist } from "easy-peasy"

export interface AuthModel {
  userAccessToken: string | null
  xAppToken: string | null
  xApptokenExpiresIn: string | null
}

const authModel = {
  userAccessToken: null,
  xAppToken: null,
  xApptokenExpiresIn: null,
}

export const getAuthModel = () =>
  persist(authModel, {
    storage: AsyncStorage,
  })
