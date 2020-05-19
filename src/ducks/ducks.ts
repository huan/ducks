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
  compose,
  Middleware,
  Store,
  applyMiddleware,
}                               from 'redux'

import reduceReducers from 'reduce-reducers'

import { EpicMiddleware } from 'redux-observable'
import { SagaMiddleware } from 'redux-saga'

import { TMP_STORE } from '../config'
import { Duck } from '../duck/'

import { combineDucks } from './combine-ducks'

interface DucksOptions <T extends DucksMapObject> {
  ducks: T,
  middlewares: {
    epicMiddleware?: EpicMiddleware<AnyAction>,
    sagaMiddleware?: SagaMiddleware,
  },
  ducksNamespace: boolean,
}

export interface DucksMapObject {
  [namespace: string]: Duck,
}

const DEFAULT_DUCKS_OPTIONS: DucksOptions <any> = {
  ducks: {},
  ducksNamespace: true,
  middlewares: {},
}

interface DucksInterface {
  createStore: StoreCreator,
}

class Ducks <T extends DucksMapObject> implements DucksInterface {

  store: Store

  protected readonly options: DucksOptions<T>

  get reducer () { return combineDucks(this.options.ducks) }

  get middlewares (): Middleware[] {
    const m = Object.values(this.options.ducks)
      .map(duck => duck.api.middlewares)
      .filter(Boolean)
      .map(middlewares => Object.values(middlewares!))
      .flat()
    return m
  }

  constructor (options?: Partial<DucksOptions<T>>) {
    this.options = {
      ...DEFAULT_DUCKS_OPTIONS,
      ...options,
    }
    this.store = TMP_STORE
  }

  enhancer <D extends DucksMapObject, Ext = {}, StateExt = {}> (): StoreEnhancer<Ext, StateExt> {

    const ducksReducer = this.reducer

    const enhancer = (store: Store) => {
      this.store = store

      /**
       * Initialize ducks
       */
      Object.keys(this.options.ducks).forEach(namespace => {
        this.options.ducks[namespace].setStore(store)
        this.options.ducks[namespace].setNamespace(namespace)
      })

      return (next: any) => (action: any) => compose(
        applyMiddleware(...this.middlewares)
      )(next)(action)
    }

    return enhancer as any
  }

  createStore () {
    return {}
  }

}

export {
  Ducks,
}
