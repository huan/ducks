#!/usr/bin/env node -r ts-node/register
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

import {
  createStore,
}                         from 'redux'

import {
  validateDucksApi,
}                     from '../../src'

import * as api from '.'

validateDucksApi(api)

test('toggle', async t => {
  const store = createStore(api.default)

  let s = api.selectors.getStatus(store.getState())()
  t.equal(s, false, 'should be false after init')

  store.dispatch(api.actions.toggle())

  s = api.selectors.getStatus(store.getState())()
  t.equal(s, true, 'should be true after toggle')
})
