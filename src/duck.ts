import { Store } from 'redux'

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

const THROW_STORE = {
  dispatch: () => { throw new Error('not initialized...') },
  getState: () => { throw new Error('not initialized...') },
} as any as Store

class Duck <API extends DuckAPI = DuckAPI> {

  store     : Store
  namespace : API['namespace']

  get reducer (): API['default']    { return this.api.default }

  get actions () : API['actions']   { return this.api.actions }
  get types ()   : API['types']     { return this.api.types }

  get epics () : API['epics'] { return this.api.epics }
  get sagas () : API['sagas'] { return this.api.sagas }

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
    // console.info('[duck] state[namespace]:', this.store.getState()[this.namespace])
    return this.store.getState()[this.namespace]
  }

  constructor (
    public api: API,
    namespace?: string,
  ) {
    this.store = THROW_STORE

    /**
     * The namespace is the mount point of the state.
     *
     * It will be decided by following the below steps:
     *  1. Override by constructor: namespace in constructor arguments
     *  2. The default: namespace in api.namespace
     *  3. Given one: a random string will be used.
     */
    if (namespace) {
      this.namespace = namespace
    } else if (api.namespace) {
      this.namespace = api.namespace
    } else {
      // a random string sill be used for the namespace (mount ponit)
      this.namespace = Math.random().toString(36).substr(2)
    }

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
    if (this.store !== THROW_STORE) {
      throw new Error('A store can only be initialized once for one Duck.')
    }
    this.store = store
  }

  private ducksifyOperations (
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
            that.store
          )(...args)
        },
      }
    })
    return duckOperations
  }

  private ducksifySelectors (
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
