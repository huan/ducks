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
  combineReducers,
  Reducer,
  StateFromReducersMapObject,
  ActionFromReducersMapObject,
}                                 from 'redux'

import { Duck } from '../duck'

export interface DucksMapObject {
  [namespace: string]: Duck,
}

export type DuckReducersMapObject <D extends DucksMapObject> = {
  [key in keyof D]: D[key]['reducer']
}

// export type DuckActionsMapObject <D extends DucksMapObject> = {
//   [key in keyof D]: ActionFromReducersMapObject<D[key]['actions']>
// }

function combineDuckery <D extends DucksMapObject> (
  ducks: D
): Reducer <
  StateFromReducersMapObject<DuckReducersMapObject<D>>,
  ActionFromReducersMapObject<DuckReducersMapObject<D>>
> {
  let duckReducers: DuckReducersMapObject<D> = {} as any

  Object.keys(ducks).forEach(namespace => {
    duckReducers = {
      ...duckReducers,
      [namespace]: ducks[namespace].reducer,
    }
  })

  return combineReducers(duckReducers)
}

export {
  combineDuckery,
}