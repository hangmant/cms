import React, { useReducer } from 'react'

type GlobalStateType = {
  totalRequests: number
}

type GlobalContextType = {
  globalState: GlobalStateType
  dispatchGlobalState: React.Dispatch<any>
}

const GlobalContext = React.createContext<GlobalContextType | undefined>(undefined)

const initialState: GlobalStateType = {
  totalRequests: 0,
}

type GlobalAction = {
  type: string
}

const globalContextReducer = (state: GlobalStateType, action: GlobalAction) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        totalRequests: state.totalRequests + 1,
      }
    case 'FINISH_LOADING':
      return {
        ...state,
        totalRequests: state.totalRequests - 1,
      }
    default:
      return state
  }
}

const GlobalContextProvider = ({ children }) => {
  const [globalState, dispatchGlobalState] = useReducer(globalContextReducer, initialState)
  const value = {
    globalState,
    dispatchGlobalState,
  }

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

const GlobalContextConsumer = GlobalContext.Consumer

export { GlobalContext, GlobalContextConsumer, GlobalContextProvider }
