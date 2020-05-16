/**
 * https://github.com/Nehle/horux/blob/master/src/compose.js
 *  https://github.com/Nehle/horux/blob/master/EXAMPLES.md
 */
const compose = (reducers = []) => {
  if (!Array.isArray(reducers)) {
    throw new Error('Argument supplied to to "compose" is not an array')
  }

  for (let i = 0; i < reducers.length; i += 1) {
    if (typeof reducers[i] !== 'function') {
      throw new Error(`Element at position ${i} in "compose" is not a reducer`)
    }
  }

  const getNext = (position, action) => (state) => {
    if (position >= reducers.length) {
      return state
    }
    const next = getNext(position + 1, action)
    if (reducers[position].length < 3) {
      return next(reducers[position](state, action))
    }
    return reducers[position](state, action, next)
  }

  return (state, action) => getNext(0, action)(state)
}

export default compose


//////////////

// https://github.com/shoutem/redux-composers/blob/develop/src/chainReducers.js

import _ from 'lodash';

/**
 * Chains multiple reducers, each reducer will get the state returned by
 * the previous reducer. The final state will be the state returned by
 * the last reducer in the chain.
 * @param reducers: Order of reducers in array defines the order of execution of reducers in chain
 * @returns {Function}: A reducer that invokes every reducer inside the reducers array in chain
 *  order, and constructs a state object or array depending on nature of reducers.
 */
export default function chainReducers(reducers) {
  return (state, action) => (
    _.reduce(
      reducers,
      (chainState, reducer) => reducer(chainState, action),
      state
    )
  );
}
