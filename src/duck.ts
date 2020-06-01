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
  Store,
}                         from 'redux'

import {
  VERSION,
}                   from './config'

import {
  Api,
  OperationsMapObject,
  SelectorsMapObject,
}                         from './api'

/**
 * Map types from a Map Object
 *  https://github.com/microsoft/TypeScript/issues/24220#issuecomment-390063153
 */

type DuckOperations <O extends OperationsMapObject> = {
  [key in keyof O]: ReturnType<O[key]>
}
type DucksifyOperations <D extends Api> = DuckOperations <D extends { operations: any } ? D['operations'] : {}>

type DuckSelectors <S extends SelectorsMapObject> = {
  [key in keyof S]: ReturnType<S[key]>
}
type DucksifySelectors <D extends Api> = DuckSelectors <D extends { selectors: any } ? D['selectors'] : {}>

class Duck <A extends Api = any> {

  static VERSION = VERSION

  get store () {
    if (!this._store) {
      throw new Error('Duck store has not been set yet: Duck can only be used after its store has been initialized.')
    }
    return this._store!
  }
  _store?: Store

  namespaces: string[]

  get reducer (): A['default']    { return this.api.default }

  get actions () : A['actions']   { return this.api.actions }
  get types ()   : A['types']     { return this.api.types }

  // get epics () : A['epics'] { return this.api.epics }
  // get sagas () : A['sagas'] { return this.api.sagas }

  get operations () {
    return this.duckOperations
  }

  get selectors () {
    return this.duckSelectors
  }

  protected duckSelectors  : DucksifySelectors<A>
  protected duckOperations : DucksifyOperations<A>

  protected get state () : ReturnType<A['default']> {

    // console.info('[duck] state:', this.store.getState())
    // console.info('[duck] namespaces:', this.namespaces)
    // console.info('[duck] state[namespaces[0]]:', this.store.getState()[this.namespaces[0]])
    // console.info('[duck] state[namespaces[1]]:', this.store.getState()[this.namespaces[1]])

    const duckStateReducer = (duckState: any, namespace: string, idx: number) => {
      if (namespace in duckState) {
        return duckState[namespace]
      }
      throw new Error('duckStateReducer() can not get state from namespace: ' + this.namespaces[idx] + ' with index: ' + idx)
    }

    const duckState = this.namespaces.reduce(
      duckStateReducer,
      this.store.getState(),
    )
    return duckState
  }

  constructor (
    public api: A,
  ) {
    this.namespaces = []

    /**
     * We provide a convenience way to call `selectors` and `operations`
     *  by encapsulating the `store` and `state`(includes the `namespace`)
     *  and take care of them for users
     *
     * Huan(202005): I'd like to call this: ducksify
     */
    this.duckOperations = this.ducksifyOperations(this.api)
    this.duckSelectors  = this.ducksifySelectors(this.api)
  }

  public setStore (store: Store): void {
    if (this._store) {
      throw new Error('A store has already been set, and it can not be set twice.')
    }
    this._store = store
  }

  public setNamespaces (...namespaces: string[]): void {
    if (this.namespaces.length > 0) {
      throw new Error('Namespaces has already been set, and it can not be set twice.')
    }
    this.namespaces = namespaces
  }

  protected ducksifyOperations (
    api: A,
  ): DucksifyOperations<A> {
    let duckOperations: DuckOperations<any> = {}

    const operations = api.operations
    if (!operations) {
      return duckOperations
    }

    const that = this

    Object.keys(operations).forEach(operation => {
      /**
       * Inferred function names
       *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
       */
      duckOperations = {
        ...duckOperations,
        [operation]: function (...args: any[]) {
          return operations[operation](
          /**
           * We have to make sure `store` has been initialized before the following code has been ran
           */
            that.store.dispatch
          )(...args)
        },
      }
    })
    return duckOperations
  }

  protected ducksifySelectors (
    api: A,
  ): DucksifySelectors<A> {
    let duckSelectors: DuckSelectors<any> = {}
    const selectors = api.selectors

    if (!selectors) {
      return duckSelectors
    }

    const that = this
    Object.keys(selectors).forEach(selector => {
      /**
       * Inferred function names
       *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
       */
      duckSelectors = {
        ...duckSelectors,
        [selector]: function (...args: any[]) {
          return selectors[selector](
            that.state,
          )(...args)
        },
      }
    })
    return duckSelectors
  }

}

export {
  Duck,
}
