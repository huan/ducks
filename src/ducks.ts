import {
  StoreEnhancer,
  // StoreEnhancerStoreCreator,
  Reducer,
  // PreloadedState,
  // Action,
  combineReducers,
  AnyAction,
  // Store,
  StoreCreator,
}                               from 'redux'

import reduceReducers from 'reduce-reducers'

import { EpicMiddleware } from 'redux-observable'
import { SagaMiddleware } from 'redux-saga'

import { Duck } from './duck'

import { composeDucks } from './compose-ducks'

interface DucksOptions {
  ducksNamespace: boolean,

  epicMiddleware?: EpicMiddleware<AnyAction>,
  sagaMiddleware?: SagaMiddleware,
}

export interface DucksMapObject {
  [namespace: string]: Duck,
}

type DuckReducerMapObject <D extends DucksMapObject> = {
  [key in keyof D]: D[key]['reducer']
}

const DEFAULT_DUCKS_OPTIONS: DucksOptions = {
  ducksNamespace: true,
}

class Ducks {

  public options: DucksOptions

  public duckList: Duck[]

  get reducer (storeReducer: Reducer): Reducer {
    if (this.options.ducksNamespace) {
      const nsReducer = combineReducers({
        'ducks':
      })
      return reduceReducers()
    }
    return
  }

  constructor (options?: Partial<DucksOptions>) {
    this.options = {
      ...DEFAULT_DUCKS_OPTIONS,
      ...options,
    }

    this.duckList = []
  }

  getDucksReducer <D extends DucksMapObject>(ducks: D) {
    let duckReducers: DuckReducerMapObject<any> = {}

    Object.keys(ducks).forEach(namespace => {
      /**
       * Inferred function names
       *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
       */
      duckReducers = {
        ...duckReducers,
        [namespace]: ducks[namespace].reducer,
      }
    })
    return combineReducers(duckReducers)
  }

  apply <Ext = {}, StateExt = {}> (
    ...duckList: Duck[]
  ): StoreEnhancer<Ext, StateExt> {
    if (duckList.length) {
      this.duckList = duckList
    }
    return (createStore: StoreCreator) => <S, A extends AnyAction>(
      reducer: Reducer<S, A>,
      ...args: any[]
    ) => {
      const store = createStore(reducer, ...args)
      return store
    }
  }

}

export {
  Ducks,
}
