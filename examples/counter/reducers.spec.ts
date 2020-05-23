#!/usr/bin/env ts-node

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
import { test } from 'tstest'

import { combineReducers } from 'redux'

import reducer from './reducers'

import * as actions from './actions'

test('counter reducer initial state', async t => {
  let state = reducer(undefined, {} as any)
  t.deepEqual(state, { total: 0 }, 'should return the initial state')

  state = reducer(state, actions.tap())
  t.deepEqual(state, { total: 1 }, 'should increase 1 after tap()')

  state = reducer(state, actions.tap(2))
  t.deepEqual(state, { total: 3 }, 'should increase 3 after tap(2)')
})

test('counter reducer with combineReducers()', async t => {
  const combinedReducer = combineReducers({
    counter: reducer,
  })

  let state = combinedReducer(undefined, {} as any)
  t.deepEqual(state, { counter: { total: 0 } }, 'should return the initial state')

  state = combinedReducer(state, actions.tap())
  t.deepEqual(state, { counter: { total: 1 } }, 'should increase 1 after tap()')
})
