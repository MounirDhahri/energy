import React from "react"
import { StoreProvider, createStore } from "easy-peasy"
import { GlobalStoreModel } from "./GlobalStoreModel"

function createGlobalStore() {
  const store = createStore<GlobalStoreModel>(GlobalStoreModel)
  return store
}

let globalStoreInstance = createGlobalStore()

export const GlobalStoreProvider: React.FC<{}> = ({ children }) => {
  return <StoreProvider store={globalStoreInstance}>{children}</StoreProvider>
}
