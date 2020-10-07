import { User } from '../../interfaces/user.interface'

export type GlobalState = {
  user
}

export type GlobalAction = {
  type: GlobalActionType
  payload?: Partial<User> | object | any
}

export enum GlobalActionType {
  UPDATE_USER = 'UPDATE_USER',
}

export function globalContextReducer(state: GlobalState, action: GlobalAction) {
  switch (action.type) {
    case GlobalActionType.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action?.payload,
        },
      }
    default:
      return state
  }
}
