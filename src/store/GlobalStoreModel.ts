import { AuthModel, getAuthModel } from "./AuthModel"

interface GlobalStoreStateModel {
  auth: AuthModel
}

export interface GlobalStoreModel extends GlobalStoreStateModel {}

export const GlobalStoreModel: GlobalStoreModel = {
  auth: getAuthModel(),
}
