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
  reducer: R,
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

    const currOriginalState = {} as any // ReturnType<typeof reducer>
    const currInsertedState = {} as any // StateFromReducersMapObject<typeof insertReducers>

    if (state) {
      Object.keys(state).forEach(key => {
        if (key in insertReducers) {
          currInsertedState[key] = state[key]
        } else {
          currOriginalState[key] = state[key]
        }
      })
    }

    const nextOriginalState = reducer(currOriginalState, action)
    const nextInsertedState = insertReducer(currInsertedState, action)

    if (nextOriginalState === currInsertedState && nextInsertedState === currInsertedState) {
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
