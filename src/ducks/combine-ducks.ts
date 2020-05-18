import {
  combineReducers,
}                     from 'redux'

import { Duck } from '../duck/'

export interface DucksMapObject {
  [namespace: string]: Duck,
}

type DuckReducerMapObject <D extends DucksMapObject> = {
  [key in keyof D]: D[key]['reducer']
}

function combineDucks <D extends DucksMapObject> (
  ducks: D
) {
  let duckReducers: DuckReducerMapObject<D> = {} as any

  Object.keys(ducks).forEach(namespace => {
    duckReducers = {
      ...duckReducers,
      [namespace]: ducks[namespace].reducer,
    }
  })

  return combineReducers(duckReducers)
}

export {
  combineDucks,
}
