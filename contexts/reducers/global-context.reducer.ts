export type GlobalState = {
  totalRequests: number
}

export type GlobalAction = {
  type: string
}

export function globalContextReducer(state: GlobalState, action: GlobalAction) {
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
