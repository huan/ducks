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
  createReducer,
  ActionType,
}                       from 'typesafe-actions'
import { DeepReadonly } from 'utility-types'

import * as actions from './actions'

const initialState: DeepReadonly<{
  total: number,
}> = {
  total: 0,
}

const reducer = createReducer<typeof initialState, ActionType<typeof actions>>(initialState)
  .handleAction(actions.tap, (state, action) => ({
    ...state,
    total: (state.total || 0) + action.payload.times,
  }))

export default reducer
export type State = ReturnType<typeof reducer>
