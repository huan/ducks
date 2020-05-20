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

import {
  combineReducers,
  createStore,
}                       from 'redux'
import createMockStore from 'redux-mock-store'

import * as counterDuckAPI from '../../examples/counter/'

import { Duck } from './duck'

test('VERSION', async t => {
  t.ok(Duck.VERSION, 'has VERSION')
})

test('setStore()', async t => {
  const duck = new Duck(counterDuckAPI)

  const store = createMockStore()()

  t.throws(() => duck.selectors.getMeaningOfLife(42), 'should throw before setStore()')

  duck.setStore(store)
  t.doesNotThrow(() => duck.selectors.getMeaningOfLife(42), 'should not throw after setStore()')
})

test("ducksify functions' names", async t => {
  /**
   * Inferred function names
   *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
   */
  const duck = new Duck(counterDuckAPI)

  Object.keys(counterDuckAPI.selectors).forEach(selector => {
    const duckSelectorsFunc = duck.selectors[selector as keyof typeof duck.selectors]
    const apiSelectorsFunc  = counterDuckAPI.selectors[selector as keyof typeof duck.selectors]

    t.equals(
      duckSelectorsFunc.name,
      apiSelectorsFunc.name,
      'selectors function name should keep the same after ducksify',
    )
  })
})

test('ducksified selectors & operations', async t => {
  const duck = new Duck(counterDuckAPI)

  const NAMESPACE = 'duck'

  const reducer = combineReducers({
    [NAMESPACE]: duck.reducer,
  })
  const store = createStore(reducer)

  duck.setStore(store)
  duck.setNamespaces(NAMESPACE)

  // store.subscribe(() => {
  //   console.info('store.subscribe() store.getState()', store.getState())
  // })

  let counter = duck.selectors.getCounter()
  t.equal(counter, 0, 'should be 0 before initialized')

  duck.operations.tap()
  counter = duck.selectors.getCounter()
  t.equal(counter, 1, 'should be 1 after tap')
})
