import { AnyAction } from 'redux'

import * as types from './types'

const reducer = (state: any, action: AnyAction) => {
  if (action.type === types.PONG) {
    return ({
      ...state,
      pong: (state.pong || 0) + 1,
    })
  }
  return state
}

export default reducer
