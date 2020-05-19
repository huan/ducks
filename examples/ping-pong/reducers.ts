import { AnyAction } from 'redux'

import * as types from './types'

const initialState = {
  pong: 0,
}

const reducer = (state = initialState, action: AnyAction) => {
  if (action.type === types.PONG) {
    return ({
      ...state,
      pong: (state.pong || 0) + 1,
    })
  }
  return state
}

export default reducer
