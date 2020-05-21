import {
  ActionFromReducersMapObject,
  combineReducers,
  Reducer,
  ReducersMapObject,
  StateFromReducersMapObject,
}                                 from 'redux'

// const ducksReducer = {
//   ...reducer,
//   [DUCKS_NAMESPACE]: this.reducer,
// }

type StateFromInsertReducers<
  R extends Reducer,
  M extends ReducersMapObject<any>,
> = StateFromReducersMapObject<M>
  & (R extends Reducer<infer RS> ? RS : never)

type ActionFromInsertReducers<
  R extends Reducer,
  M extends ReducersMapObject<any>,
> = ActionFromReducersMapObject<M>
  & R extends Reducer<any, infer RA> ? RA : never

/**
 * We have to do some tricky with insertReducer.
 *  becasue the Redux reduce system will check matching for the the keys of the state and reducers.
 */
function insertReducers <
  R extends Reducer,
  M extends ReducersMapObject,
> (
  originReducer: R,
  insertReducers: M,
): Reducer<
  StateFromInsertReducers<R, M>,
  ActionFromInsertReducers<R, M>
> {
  const insertReducer = combineReducers(insertReducers)

  const newReducer: Reducer<
    StateFromInsertReducers<R, M>,
    ActionFromInsertReducers<R, M>
  > = (state, action) => {

    const prevOriginalState = {} as any // ReturnType<typeof reducer>
    const prevInsertedState = {} as any // StateFromReducersMapObject<typeof insertReducers>

    if (state) {
      Object.keys(state).forEach(key => {
        if (key in insertReducers) {
          prevInsertedState[key] = state[key]
        } else {
          prevOriginalState[key] = state[key]
        }
      })
    }

    const nextOriginalState = originReducer(prevOriginalState, action)
    // console.info('nextOriginalState === prevOriginalState', nextOriginalState === prevOriginalState)
    const nextInsertedState = insertReducer(prevInsertedState, action)
    // console.info('nextInsertedState === prevInsertedState', nextInsertedState === prevInsertedState)

    if (nextOriginalState === prevOriginalState && nextInsertedState === prevInsertedState) {
      return state
    }

    return {
      ...nextOriginalState,
      ...nextInsertedState,
    }
  }

  return newReducer
}

export {
  insertReducers,
}
