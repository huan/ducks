import {
  ActionFromReducersMapObject,
  Reducer,
  ReducersMapObject,
  StateFromReducersMapObject,
}                               from 'redux'

import reduceReducersFromArray from 'reduce-reducers'

type LiftStateFromReducersMapObject <T> = StateFromReducersMapObject<T>[
  keyof StateFromReducersMapObject<T>
]

function reduceReducersFromMapObject <T extends ReducersMapObject> (
  reducers: T,
): Reducer<
  LiftStateFromReducersMapObject<T>,
  ActionFromReducersMapObject<T>
> {
  return reduceReducersFromArray(
    ...Object.values(reducers)
  )
}

export {
  reduceReducersFromMapObject,
}
