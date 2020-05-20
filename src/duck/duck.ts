import {
  Store,
}                         from 'redux'

import {
  TMP_STORE,
  VERSION,
}                   from '../config'

import {
  DuckAPI,
  OperationsMapObject,
  SelectorsMapObject,
}                         from './duck-api'

/**
 * Map types from a Map Object
 *  https://github.com/microsoft/TypeScript/issues/24220#issuecomment-390063153
 */

type DuckOperations <O extends OperationsMapObject> = {
  [key in keyof O]: ReturnType<O[key]>
}

type DuckSelectors <S extends SelectorsMapObject> = {
  [key in keyof S]: ReturnType<S[key]>
}

class Duck <API extends DuckAPI = DuckAPI> {

  static VERSION = VERSION

  protected store: Store
  namespaces: string[]

  get reducer (): API['default']    { return this.api.default }

  get actions () : API['actions']   { return this.api.actions }
  get types ()   : API['types']     { return this.api.types }

  // get epics () : API['epics'] { return this.api.epics }
  // get sagas () : API['sagas'] { return this.api.sagas }

  get operations () {
    return this.duckOperations
  }

  get selectors () {
    return this.duckSelectors
  }

  protected duckSelectors  : DuckSelectors<API['selectors']>
  protected duckOperations : DuckOperations<API['operations']>

  protected get state () : ReturnType<API['default']> {

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
    public api: API,
  ) {
    this.store     = TMP_STORE
    this.namespaces = []

    /**
     * We provide a convenience way to call `selectors` and `operations`
     *  by encapsulating the `store` and `state`(includes the `namespace`)
     *  and take care of them for users
     *
     * Huan(202005): I'd like to call this: ducksify
     */
    this.duckOperations = this.ducksifyOperations(this.api.operations)
    this.duckSelectors  = this.ducksifySelectors(this.api.selectors)
  }

  public setStore (store: Store): void {
    if (this.store !== TMP_STORE) {
      throw new Error('A store can only be initialized once for one Duck.')
    }
    this.store = store
  }

  public setNamespaces (...namespaces: string[]): void {
    if (this.namespaces.length > 0) {
      throw new Error('Namespaces can only be initialized once for one Duck.')
    }
    this.namespaces = namespaces
  }

  protected ducksifyOperations (
    operations: API['operations'],
  ): DuckOperations<API['operations']> {
    let duckOperations: DuckOperations<any> = {}

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
            that.store.dispatch
          )(...args)
        },
      }
    })
    return duckOperations
  }

  protected ducksifySelectors (
    selectors: API['selectors'],
  ): DuckOperations<API['selectors']> {
    let duckOperations: DuckOperations<any> = {}

    const that = this
    Object.keys(selectors).forEach(selector => {
      /**
       * Inferred function names
       *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
       */
      duckOperations = {
        ...duckOperations,
        [selector]: function (...args: any[]) {
          return selectors[selector](
            that.state,
          )(...args)
        },
      }
    })
    return duckOperations
  }

}

export {
  Duck,
}
