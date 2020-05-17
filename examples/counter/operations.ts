import * as actions from './actions'

/**
 * CQRS - Command Query Responsibility Segregation
 *  https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs
 *
 *  1. `operations` for Command
 *  2. `selectors` for Query
 */
const reset = ({ dispatch }) => dispatch(actions.reset())
const tap   = ({ dispatch }) => dispatch(actions.tap())

export {
  reset,
  tap,
}
