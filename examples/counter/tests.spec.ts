#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
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
  validateDuck,
}                     from '../../src/mod.js'

import * as duck from './mod.js'

validateDuck(duck)

test('counter', async t => {
  const store = createStore(duck.default)

  let n = duck.selectors.getCounter(store.getState())()
  t.equal(n, 0, 'should be 0 after init')

  store.dispatch(duck.actions.tap())

  n = duck.selectors.getCounter(store.getState())()
  t.equal(n, 1, 'should be 1 after tap')
})

test('operations', async t => {
  const store = createStore(duck.default)

  duck.operations.tap(store.dispatch)()

  const n = duck.selectors.getCounter(store.getState())()
  t.equal(n, 1, 'should be 1 after operations.tap(store)()')
})
