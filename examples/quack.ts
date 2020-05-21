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
  createStore,
}                       from 'redux'

import assert from 'assert'

import {
  Duck,
  Ducks,
}             from '../src'

import * as counterDuckAPI  from './counter'    // Vanilla Duck: +1
import * as dingDongDuckAPI from './ding-dong'  // Observable Middleware
import * as pingPongDuckAPI from './ping-pong'  // Saga Middleware
import * as switcherDuckAPI from './switcher'   // Vanilla Duck: ON/OFF

const counter  = new Duck(counterDuckAPI)
const dingDong = new Duck(dingDongDuckAPI)
const pingPong = new Duck(pingPongDuckAPI)
const switcher = new Duck(switcherDuckAPI)

/**
 * TODO:
 *  1. bind state mount point
 *    1. bind state to selectors
 *    1. bind store to perations
 *  1. implement enhancer for ducks for
 *    1. adding the reducer
 *    1. run the sagas/epics
 */

const ducks = new Ducks({
  counter,
  dingDong,
  pingPong,
  switcher,
})

const initialState = undefined

const store = createStore(
  // ducks.reducer,
  state => state,
  initialState,
  ducks.enhancer(),
)

// store.subscribe(() => console.info(store.getState()))

// Before:
// counterDuck.selectors.getCounter(store)()
// counterDuck.operations.tap(store)()

// console.info('state', store.getState())

/**
 * Vanilla: Counter
 */
assert.strictEqual(counter.selectors.getCounter(), 0)
counter.operations.tap()
assert.strictEqual(counter.selectors.getCounter(), 1)
assert.strictEqual(counter.selectors.getMeaningOfLife(3), 42)

/**
 * Vanilla: Switchers
 */
assert.strictEqual(switcher.selectors.getStatus(), false)
switcher.operations.toggle()
assert.strictEqual(switcher.selectors.getStatus(), true)
switcher.operations.toggle()
assert.strictEqual(switcher.selectors.getStatus(), false)

/**
 * Epic Middleware: DingDong
 */
assert.strictEqual(dingDong.selectors.getDong(), 0)
dingDong.operations.ding()
assert.strictEqual(dingDong.selectors.getDong(), 1)

/**
 * Saga Middleware: PingPong
 */
assert.strictEqual(pingPong.selectors.getPong(), 0)
pingPong.operations.ping()
assert.strictEqual(pingPong.selectors.getPong(), 1)

console.info('store state:', store.getState())

export {
  counter,
  dingDong,
  pingPong,
}
