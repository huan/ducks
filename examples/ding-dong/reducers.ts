import { Action } from 'redux'

import * as types from './types'

const initialState = {
  dong: 0,
}

/**
 * Reducers to calculate Aggregate state:
 */
const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.DONG:
      return ({
        ...state,
        dong: (state.dong || 0) + 1,
      })
    default:
      return state
  }
}

export {
  reducer,
}
