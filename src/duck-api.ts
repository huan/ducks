import {
  ActionCreatorsMapObject,
  Reducer,
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

export interface DuckAPI {
  actions     : ActionCreatorsMapObject,
  operations  : OperationsMapObject,
  selectors   : SelectorsMapObject,
  types       : TypesMapObject,

  middleware  : any,  // FIXME

  default    : Reducer,
}
