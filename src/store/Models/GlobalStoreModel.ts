import { AuthModel } from "./AuthModel"
import { ConfigModel } from "./ConfigModel"
import { action, Action } from "easy-peasy"

type ActiveMode = "viewer" | "manager"
interface GlobalStoreStateModel {
  auth: AuthModel
  config: ConfigModel

  activePartnerID: string | null
  activeMode: ActiveMode
}

export interface GlobalStoreModel extends GlobalStoreStateModel {
  setActivePartnerID: Action<this, string | null>
  setActiveMode: Action<this, ActiveMode>
}

export const GlobalStoreModel: GlobalStoreModel = {
  auth: AuthModel,
  config: ConfigModel,

  activePartnerID: null,
  activeMode: "manager",

  setActivePartnerID: action((state, partnerID) => {
    state.activePartnerID = partnerID
  }),
  setActiveMode: action((state, mode) => {
    state.activeMode = mode
  }),
}
