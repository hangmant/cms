import React, { useReducer } from 'react'
import { User } from '../interfaces/user.interface'
import {
  globalContextReducer,
  GlobalState,
  GlobalAction,
} from './reducers/global-context.reducer'

type GlobalContextValue = {
  globalState: GlobalState
  dispatchGlobal: React.Dispatch<GlobalAction>
  user: User
}

type GlobalContextProviderProps = {
  children: React.ElementRef<any>
  user: User
}

const GlobalContext = React.createContext<GlobalContextValue | undefined>(undefined)

function GlobalContextProvider({ children, user }: GlobalContextProviderProps) {
  const [globalState, dispatchGlobal] = useReducer(globalContextReducer, {
    user,
  } as GlobalState)

  const value: GlobalContextValue = {
    globalState,
    dispatchGlobal,
    user: globalState.user,
  }

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

const GlobalContextConsumer = GlobalContext.Consumer

export { GlobalContext, GlobalContextConsumer, GlobalContextProvider }
