import {
  ActionCreatorsMapObject,
  Reducer,
  Store,
}                               from 'redux'

import { Epic } from 'redux-observable'
import { Saga } from 'redux-saga'

export interface TypesMapObject {
  [type: string]: string,
}

export interface OperationsMapObject <S=Store>{
  [operation: string]: (store: S) => (...args: any[]) => any,
}

export interface SelectorsMapObject<S extends Object = any> {
  [selector: string]: (state: S) => (...args: any[]) => any,
}

export interface EpicsMapObject {
  [epic: string]: Epic,
}

export interface SagasMapObject {
  [saga: string]: Saga,
}

export interface DuckAPI {
  /**
   *
   * Ducks Propusal: https://github.com/erikras/ducks-modular-redux
   *  Ducks: Redux Reducer Bundles - A proposal for bundling reducers, action types and actions when using Redux
   *
   */

  // Command handlers: return an Event each:
  actions: ActionCreatorsMapObject,

  // CQRS - `operations` for Command
  operations  : OperationsMapObject,
  // CQRS - `selectors` for Query
  selectors   : SelectorsMapObject,

  types       : TypesMapObject,

  // Domain Aggregates: reducer & middlewares
  default    : Reducer,

  /**
   *
   * Extension for the Ducks Propusal
   *
   */
  // Middlewares
  epics? : EpicsMapObject,
  sagas? : SagasMapObject,

  // The namespace is the mount point of the state
  namespace?: string,

}

/**
 * Allow a module to implement an interface #420
 *  https://github.com/microsoft/TypeScript/issues/420
 */

/**
 * CQRS - Command Query Responsibility Segregation
 *  https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs
 *
 *  1. `operations` for Command
 *  2. `selectors` for Query
 */
