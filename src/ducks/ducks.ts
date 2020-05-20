import {
  StoreEnhancer,
  combineReducers,
  AnyAction,
  compose,
  Middleware,
  Store,
  Dispatch,
}                               from 'redux'

import { EpicMiddleware, Epic } from 'redux-observable'
import { SagaMiddleware, Saga } from 'redux-saga'

import reduceReducers from 'reduce-reducers'

import { TMP_STORE } from '../config'
import { Duck } from '../duck/'

import { combineDucks } from './combine-ducks'

interface DucksOptions <T extends DucksMapObject> {
  ducks: T,
  middlewares: {
    epicMiddleware?: EpicMiddleware<AnyAction>,
    sagaMiddleware?: SagaMiddleware,
  },
}

export interface DucksMapObject {
  [namespace: string]: Duck,
}

const DEFAULT_DUCKS_OPTIONS: DucksOptions <any> = {
  ducks: {},
  middlewares: {},
}

class Ducks <T extends DucksMapObject> {

  store: Store

  protected readonly options: DucksOptions<T>

  get reducer () {
    const ducksReducer = combineDucks(this.options.ducks)

    return combineReducers({
      ducks: ducksReducer,
    })

  }

  get middlewares (): Middleware[] {
    const middlewareList = Object.values(this.options.ducks)
      .map(duck => duck.api.middlewares)
      .filter(Boolean)
      .map(middlewares => Object.values(middlewares!))
      .flat()
    return middlewareList
  }

  constructor (options: Partial<DucksOptions<T>>) {
    if (!options.ducks || Object.keys(options.ducks).length <= 0) {
      throw new Error('You need to provide some ducks for building a Ducks')
    }

    this.options = {
      ...DEFAULT_DUCKS_OPTIONS,
      ...options,
    }
    this.store = TMP_STORE

  }

  /**
   * export type StoreEnhancer<Ext = {}, StateExt = {}> = (
   *   next: StoreEnhancerStoreCreator
   * ) => StoreEnhancerStoreCreator<Ext, StateExt>
   * export type StoreEnhancerStoreCreator<Ext = {}, StateExt = {}> = <
   *   S = any,
   *   A extends Action = AnyAction
   * >(
   *   reducer: Reducer<S, A>,
   *   preloadedState?: PreloadedState<S>
   * ) => Store<S & StateExt, A> & Ext
   */
  enhancer (): StoreEnhancer {
    const ducksEnhancer: StoreEnhancer = next => (reducer, preloadedState) => {

      /**
       * Reducers
       */

      // Huan(202005) FIXME: use generic template to replace any
      let mixedReducer = reduceReducers(
        preloadedState as any || null,
        reducer as any,
        this.reducer as any,
      )

      let store = next(
        mixedReducer,
        preloadedState,
      )

      /**
       * Middlewares
       */
      const middlewareEnhancer = (_store: Store) => {
        return (next: Dispatch) => (action: AnyAction) => {
          return compose<any>(...this.middlewares)(next)(action)
        }
      }

      store = {
        ...store,
        dispatch: middlewareEnhancer(store)(store.dispatch),
      }

      /**
       * Ducks
       */
      this.initializeDucks(store)

      return store

    }

    /**
     * Enhancer
     */
    return ducksEnhancer

  }

  configureStore () {
    // TODO: init store for convenience
    return {}
  }

  /**
   * Initialize ducks
   */
  protected getRootEpic (): undefined | Epic {
    const epics = Object.values(this.options.ducks)
      .map(duck => duck.api.epics)
      .filter(Boolean)
      .map(epics => Object.values(epics!))
      .flat()

    if (epics.length <= 0) {
      return undefined
    }

    /**
     * Load Epics Combinator
     *
     *  We are using `require` at here because we will only load `redux-observable` module when we need it
     *
     */
    const combineEpics = require('redux-observable')

    return combineEpics(...epics) as Epic
  }

  protected getRootSaga (): undefined | Saga {
    const sagas = Object.values(this.options.ducks)
      .map(duck => duck.api.sagas)
      .filter(Boolean)
      .map(sagas => Object.values(sagas!))
      .flat()

    if (sagas.length <= 0) {
      return undefined
    }

    /**
     * Load Saga Effects
     *
     *  We are using `require` at here because we will only load `redux-saga` module when we need it
     *
     */
    const effects = require('redux-saga/effects')

    return function * rootSaga () {
      yield effects.all(
        sagas.map(
          saga => saga()
        )
      )
    } as Saga
  }

  protected initializeDucks (store: Store<any, any>) {
    if (this.store !== TMP_STORE) {
      throw new Error('store has already initialized')
    }
    this.store = store

    /**
     * Configure Duck
     */
    Object.keys(this.options.ducks).forEach(namespace => {
      this.options.ducks[namespace].setStore(this.store)
      this.options.ducks[namespace].setNamespace(namespace)
    })

    /**
     * Run Epic
     */
    const rootEpic = this.getRootEpic()
    if (rootEpic) {
      const epicMiddleware = this.options.middlewares.epicMiddleware
      if (!epicMiddleware) {
        throw new Error('epicMiddleware is required, but it has not been passed in the ducks.')
      }
      epicMiddleware.run(rootEpic)
    }

    /**
     * Run Saga
     */
    const rootSaga = this.getRootSaga()
    if (rootSaga) {
      const sagaMiddleware = this.options.middlewares.sagaMiddleware
      if (!sagaMiddleware) {
        throw new Error('sagaMiddleware is required, but it has not been passed in the ducks.')
      }
      sagaMiddleware.run(rootSaga)
    }

  }

}

export {
  Ducks,
}
