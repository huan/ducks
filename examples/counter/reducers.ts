import { Action } from 'redux'

import * as types from './types'

const initialState = {
  total: 0,
}

const reducer = (state = initialState, action: Action) => {
  if (action.type === types.TAP) {
    return ({
      ...state,
      total: (state.total || 0) + 1,
    })
  }
  return state
}

export default reducer
