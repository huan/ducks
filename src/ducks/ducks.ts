/**
 *   Ducks - https://github.com/huan/ducks
 *
 *   @copyright 2020 Huan LI (李卓桓) <https://github.com/huan>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import {
  StoreEnhancer,
  // AnyAction,
  compose,
  Middleware,
  Store,
  applyMiddleware,
  Reducer,
}                               from 'redux'

import { Epic, EpicMiddleware } from 'redux-observable'
import { Saga, SagaMiddleware } from 'redux-saga'

import {
  DUCKS_NAMESPACE,
  TMP_STORE,
  VERSION,
}                      from '../config'

import { Duck }         from '../duck/'

import { combineDucks }     from './combine-ducks'
import { insertReducers }   from './insert-reducers'

interface DucksOptions <T extends DucksMapObject> {
  ducks: T,
  // middlewares: {
  //   epicMiddleware?: EpicMiddleware<AnyAction>,
  //   sagaMiddleware?: SagaMiddleware,
  // },
}

export interface DucksMapObject {
  [namespace: string]: Duck,
}

const DEFAULT_DUCKS_OPTIONS: DucksOptions <any> = {
  ducks: {},
  // middlewares: {},
}

class Ducks <T extends DucksMapObject> {

  static VERSION = VERSION

  store: Store

  protected asyncMiddlewares: {
    epicMiddleware?: EpicMiddleware<any>,
    sagaMiddleware?: SagaMiddleware,
  }

  protected readonly options: DucksOptions<T>

  get reducer () {
    return combineDucks(this.options.ducks)
  }

  get middlewares (): Middleware[] {
    const middlewareList = Object.values(this.options.ducks)
      .map(duck => duck.api.middlewares)
      .filter(Boolean)
      .map(middlewares => Object.values(middlewares!))
      .flat()

    return middlewareList
  }

  constructor (
    options: Partial<DucksOptions<T>>,
  ) {
    if (!options.ducks || Object.keys(options.ducks).length <= 0) {
      throw new Error('You need to provide some ducks for building a Ducks')
    }

    this.options = {
      ...DEFAULT_DUCKS_OPTIONS,
      ...options,
    }
    this.store = TMP_STORE

    this.asyncMiddlewares = {}
  }

  enhancer (): StoreEnhancer {
    if (!this.asyncMiddlewares.epicMiddleware && this.getRootEpic()) {
      this.asyncMiddlewares.epicMiddleware = require('redux-observable').createEpicMiddleware()
    }
    if (!this.asyncMiddlewares.sagaMiddleware && this.getRootSaga()) {
      this.asyncMiddlewares.sagaMiddleware = require('redux-saga').default() as SagaMiddleware
    }

    const asyncMiddlewares = Object.values(this.asyncMiddlewares).filter(Boolean) as Middleware[]

    return compose(
      this.storeEnhancer(), // Huan(202005): this should be put before applyMiddleware (to initiate asyncMiddlewares before storeEnhancer)
      applyMiddleware(
        ...asyncMiddlewares,
        ...this.middlewares
      ),
    )
  }

  /**
   * 1. Add Ducks Reducers to Store
   * 2. Bind Store to Ducks
   */
  protected storeEnhancer () {
    const enhancer: StoreEnhancer<
      {},
      ReturnType<
        Ducks<T>['reducer']
      >
    > = next => (reducer: Reducer<any, any>, preloadedState: any) => {

      let newReducer = insertReducers(
        reducer,
        {
          [DUCKS_NAMESPACE]: this.reducer as any, // Huan(202005) FIXME: any ?
        },
      )

      // FIXME: any
      let store = next<any, any>(
        newReducer,
        preloadedState,
      )

      this.initializeDucks(store)

      return store
    }
    return enhancer
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
    const combineEpics = require('redux-observable').combineEpics

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
      // console.info('initializeDucks() namespace', namespace)
      // console.info('initializeDucks() state', this.store.getState())
      this.options.ducks[namespace].setStore(this.store)
      this.options.ducks[namespace].setNamespaces(DUCKS_NAMESPACE, namespace)
    })

    /**
     * Run Epic
     */
    const rootEpic = this.getRootEpic()
    if (rootEpic) {
      let epicMiddleware = this.asyncMiddlewares.epicMiddleware
      if (!epicMiddleware) {
        throw new Error('epicMiddleware is required but not found in the this.asyncMiddlewares.')
      }
      epicMiddleware.run(rootEpic)
    }

    /**
     * Run Saga
     */
    const rootSaga = this.getRootSaga()
    if (rootSaga) {
      let sagaMiddleware = this.asyncMiddlewares.sagaMiddleware
      if (!sagaMiddleware) {
        throw new Error('sagaMiddleware is required but not found in the this.asyncMiddlewares.')
      }
      sagaMiddleware.run(rootSaga)
    }
  }

}

export {
  Ducks,
}
