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
import { AnyAction } from 'redux'

import * as types from './types'

const initialState = {
  total: 0,
}

const reducer = (state = initialState, action: AnyAction) => {
  if (action.type === types.TAP) {
    return ({
      ...state,
      total: (state.total || 0) + action.payload.times,
    })
  }
  return state
}

export default reducer
