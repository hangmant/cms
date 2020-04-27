import { useContext } from 'react'
import { GlobalContext } from '../contexts/globalContext'

export const useGlobalLoader = () => {
  const { globalState, dispatchGlobalState } = useContext(GlobalContext)

  const startLoading = () => {
    dispatchGlobalState({ type: 'START_LOADING' })
  }

  const finishLoading = () => {
    dispatchGlobalState({ type: 'FINISH_LOADING' })
  }

  const isLoading = globalState.totalRequests !== 0

  return { startLoading, finishLoading, isLoading }
}
