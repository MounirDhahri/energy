import React from "react"
import { StoreProvider, createStore } from "easy-peasy"
import { GlobalStoreModel } from "./GlobalStoreModel"

const STORE_VERSION = 0

function createGlobalStore() {
  const store = createStore<GlobalStoreModel>(GlobalStoreModel, {
    name: "GlobalStore",
    version: STORE_VERSION,
    devTools: __DEV__,
  })
  return store
}

let globalStoreInstance = createGlobalStore()

export const GlobalStoreProvider: React.FC<{}> = ({ children }) => {
  return <StoreProvider store={globalStoreInstance}>{children}</StoreProvider>
}
