import {
  ActionCreatorsMapObject,
  Reducer,
  Middleware,
}                               from 'redux'

interface TypesMapObject {
  [type: string]: string,
}

interface OperationsMapObject {
  [operation: string]: (...args: any[]) => any,
}

interface SelectorsMapObject {
  [selector: string]: (...args: any[]) => any,
}

interface MiddlewareMapObject {
  [middleware: string]: Middleware,
}

export interface DuckAPI {
  actions     : ActionCreatorsMapObject,
  middlewares : MiddlewareMapObject,  // TODO: support Dependency for redux-observable, etc
  operations  : OperationsMapObject,
  selectors   : SelectorsMapObject,
  types       : TypesMapObject,

  default    : Reducer,
}
