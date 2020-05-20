import { Action } from 'redux'

import * as types from './types'

const initialState = {
  status: false,
}

const reducer = (state = initialState, action: Action) => {
  if (action.type === types.TOGGLE) {
    return ({
      ...state,
      status: !state.status,
    })
  }
  return state
}

export default reducer
