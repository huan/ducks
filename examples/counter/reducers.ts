import { Action } from 'redux'

import * as types from './types'

const initialState = {
  counter: 0,
}

/**
 * Reducers to calculate Aggregate state:
 */
const reducer = (state = initialState, action: Action) => {
  if (action.type === types.TAP) {
    return ({
      ...state,
      counter: (state.counter || 0) + 1,
    })
  }
  return state
}

export default reducer