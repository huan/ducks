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
import type {
  ActionCreator,
  Dispatch,
  Middleware,
  Reducer,
}                   from 'redux'

import type { Epic } from 'redux-observable'
import type { Saga } from 'redux-saga'

import type { Ducks } from './ducks/mod.js'

/**
 * Huan(202005): typesafe style Async Action Creator
 */
export interface AsyncActionCreator<A> {
  request: (...args: any[]) => A,
  success: (...args: any[]) => A,
  failure: (...args: any[]) => A,
  cancel?: (...args: any[]) => A,
}

export interface AsyncActionCreatorsMapObject<A = any> {
  [key: string]: ActionCreator<A> | AsyncActionCreator<A>
}

export interface TypesMapObject {
  [type: string]: string,
}

export interface OperationsMapObject {
  [operation: string]: (dispatch: Dispatch) => (...args: any[]) => any,
}

export interface SelectorsMapObject <S extends {} = any> {
  [selector: string]: (state: S) => (...args: any[]) => any,
}

export interface MiddlewaresMapObject {
  [middleware: string]: Middleware,
}

export interface EpicsMapObject {
  [epic: string]: Epic,
}

export interface SagasMapObject {
  [saga: string]: Saga,
}

/**
 *
 * Ducksify API Interface for Ducks Modular Proposal
 *  (a.k.a. Redux Reducer Bundles)
 *
 */
export interface Duck {
  /**
   *
   * Ducks Proposal:
   *  Ducks: Redux Reducer Bundles
   *    - A proposal for bundling reducers, action types and actions when using Redux
   *
   *  https://github.com/erikras/ducks-modular-redux
   *
   */

  // Command handlers: return an Event each:
  actions: AsyncActionCreatorsMapObject,

  // CQRS - `operations` for Command
  operations?: OperationsMapObject,
  // CQRS - `selectors` for Query
  selectors?: SelectorsMapObject,

  types?: TypesMapObject,

  // Domain Aggregates: reducer & middlewares
  default: Reducer,

  /**
   *
   * Ducksify Extension: Currying & API Interface
   *  https://github.com/huan/ducks#3-ducksify-extension-currying--ducksify-interface
   *
   */
  // Middlewares
  middlewares?: MiddlewaresMapObject,

  // Middleware entries
  epics? : EpicsMapObject,
  sagas? : SagasMapObject,

  setDucks?: (ducks: Ducks<any>) => void
}

export interface DucksMapObject {
  [namespace: string]: Duck,
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
