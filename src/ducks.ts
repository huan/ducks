import {
  StoreEnhancer,
  StoreEnhancerStoreCreator,
  Reducer,
  PreloadedState,
  Action,
  AnyAction,
  Store,
  StoreCreator,
}                               from 'redux'

import { EpicMiddleware } from 'redux-observable'
import { SagaMiddleware } from 'redux-saga'

import { Duck } from './duck'

interface DucksOptions {
  // state.ducks.* or state.* ?
  ducksNamespace: boolean,

  epicMiddleware?: EpicMiddleware<AnyAction>,
  sagaMiddleware?: SagaMiddleware,
}

class Ducks {

  public options: DucksOptions

  public duckList: Duck[]

  constructor (options?: Partial<DucksOptions>) {
    this.options = {
      ducksNamespace: true,
      ...options,
    }

    this.duckList = []
  }

  apply <Ext = {}, StateExt = {}> (
    ...duckList: Duck[],
  ): StoreEnhancer<Ext, StateExt> {

    return (createStore: StoreCreator) => <S, A extends AnyAction>(
      reducer: Reducer<S, A>,
      ...args: any[]
    ) => {
      const store = createStore(reducer, ...args)
      let dispatch: Dispatch = () => {
        throw new Error(
          'Dispatching while constructing your middleware is not allowed. ' +
            'Other middleware would not be applied to this dispatch.'
        )
      }

      const middlewareAPI: MiddlewareAPI = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args)
      }
      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      dispatch = compose<typeof dispatch>(...chain)(store.dispatch)

      return {
        ...store,
        dispatch
      }
    }


  //   const enhancerStoreCreator: StoreEnhancerStoreCreator<Ext, StateExt> = <S = any, A extends Action = AnyAction>(
  //     reducer: Reducer<S, A>,
  //     preloadedState?: PreloadedState<S>,
  //   ) => {
  //     void reducer
  //     void preloadedState
  //     const a: Store<S & StateExt, A> & Ext = {} as any
  //     return a
  //   }

  //   return enhancerStoreCreator
  // }

}

export {
  Ducks,
}
