import * as types from './types'

/**
 * Domain Aggregates with Command handlers
 *  that return an Event each:
 */
const tap   = () => ({ type: types.TAP })
const reset = () => ({ type: types.RESET })

export {
  tap,
  reset,
}
