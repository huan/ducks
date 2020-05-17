import {
  ActionCreatorsMapObject,
  Reducer,
}                               from 'redux'

import { Epic } from 'redux-observable'
import { Saga } from 'redux-saga'

interface TypesMapObject {
  [type: string]: string,
}

interface OperationsMapObject {
  [operation: string]: (...args: any[]) => any,
}

interface SelectorsMapObject {
  [selector: string]: (...args: any[]) => any,
}

interface EpicsMapObject {
  [epic: string]: Epic,
}

interface SagasMapObject {
  [saga: string]: Saga,
}

/**
 * Allow a module to implement an interface #420
 *  https://github.com/microsoft/TypeScript/issues/420
 */
export interface DuckAPI {
  /**
   * Command handlers
   *  that return an Event each:
   */
  actions     : ActionCreatorsMapObject,

  /**
   * CQRS - Command Query Responsibility Segregation
   *  https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs
   *
   *  1. `operations` for Command
   *  2. `selectors` for Query
   */
  operations  : OperationsMapObject,
  selectors   : SelectorsMapObject,

  types       : TypesMapObject,

  /**
   * Domain Aggregates:
   *  1. reducer
   *  2. middlewares
   */
  default    : Reducer,

  /**
   * Middlewares
   */
  epics? : EpicsMapObject,
  sagas? : SagasMapObject,
}
