import React, { useReducer } from 'react'
import { User } from '../interfaces/user.interface'
import { globalContextReducer, GlobalState } from './reducers/global-context.reducer'
import { useQuery } from '@apollo/react-hooks'
import { ME } from '../apollo/queries'

type GlobalContextValue = {
  globalState: GlobalState
  dispatchGlobalState: React.Dispatch<any>
  user: User
}

type GlobalContextProviderProps = {
  children: React.ElementRef<any>
  user: User
}

const GlobalContext = React.createContext<GlobalContextValue | undefined>(undefined)

const initialState: GlobalState = {
  totalRequests: 0,
}

function GlobalContextProvider({ children, user }: GlobalContextProviderProps) {
  const [globalState, dispatchGlobalState] = useReducer(globalContextReducer, initialState)
  const { data } = useQuery(ME)

  const value: GlobalContextValue = {
    globalState,
    dispatchGlobalState,
    user: data?.me || user,
  }

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

const GlobalContextConsumer = GlobalContext.Consumer

export { GlobalContext, GlobalContextConsumer, GlobalContextProvider }
