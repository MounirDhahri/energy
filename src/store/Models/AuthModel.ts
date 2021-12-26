import { action, Action, thunk, Thunk } from "easy-peasy"
import Config from "react-native-config"
import { GlobalStoreModel } from "./GlobalStoreModel"
import { getUserAgent } from "../../helpers/getUserAgent"

interface AuthModelState {
  userAccessToken: string | null
  xAppToken: string | null
  xApptokenExpiresIn: string | null
}

const authModelState: AuthModelState = {
  userAccessToken: null,
  xAppToken: null,
  xApptokenExpiresIn: null,
}
export interface AuthModel extends AuthModelState {
  setState: Action<this, Partial<AuthModelState>>
  getXAppToken: Thunk<this, void, {}, GlobalStoreModel, Promise<string>>
  signInUsingEmail: Action<this, { email: string; password: string }>
}

export const AuthModel: AuthModel = {
  ...authModelState,

  setState: action((state, payload) => Object.assign(state, payload)),
  signInUsingEmail: action(() => {}),
  getXAppToken: thunk(async (actions, _payload, context) => {
    const { xAppToken, xApptokenExpiresIn } = context.getState()
    if (xAppToken && xApptokenExpiresIn && new Date() < new Date(xApptokenExpiresIn)) {
      return xAppToken
    }

    const gravityBaseURL = context.getStoreState().config.environment.strings.gravityURL

    const tokenURL = `${gravityBaseURL}/api/v1/xapp_token?${JSON.stringify({
      client_id: Config.ARTSY_API_CLIENT_KEY,
      client_secret: Config.ARTSY_API_CLIENT_SECRET,
    })}`

    try {
      const resJson = await (
        await fetch(tokenURL, {
          headers: {
            "User-Agent": getUserAgent(),
          },
        })
      ).json()

      if (resJson.xapp_token && resJson.expires_in) {
        actions.setState({
          xAppToken: resJson.xapp_token,
          xApptokenExpiresIn: resJson.expires_in,
        })
        return resJson.xapp_token
      }
    } catch (error) {
      throw new Error("Unable to get x-app-token" + error)
    }
  }),
}
