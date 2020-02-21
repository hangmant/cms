import React, { useReducer } from 'react'

const GlobalContext = React.createContext()

const initialState = {
  totalRequests: 0,
}

const globalContextReducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        totalRequests: state.totalRequests + 1,
      }
      break
    case 'FINISH_LOADING':
      return {
        ...state,
        totalRequests: state.totalRequests - 1,
      }
      break

    default:
      break
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
