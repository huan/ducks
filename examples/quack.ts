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
import assert from 'assert'

import { createStore } from 'redux'

import { Ducks } from '../src/mod.js'

import * as switcherDuck from './switcher/mod.js'   // Vanilla Duck: ON/OFF
import * as counterDuck  from './counter/mod.js'    // TypeSafe Actions: +1
import * as dingDongDuck from './ding-dong/mod.js'  // Observable Middleware
// import * as pingPongDuck from './ping-pong/mod.js'  // Saga Middleware

const ducks = new Ducks({
  counter  : counterDuck,
  dingDong : dingDongDuck,
  // pingPong : pingPongDuck,
  switcher : switcherDuck,
})

const {
  counter,
  dingDong,
  // pingPong,
  switcher,
}               = ducks.ducksify()

/**
 * Create the store.
 *
 * You can use `ducks.configureStore()` to create the same store
 * as the following code does, for your convenience.
 */
const store = createStore(
  state => state,     // Here's our normal Redux Reducer
  ducks.enhancer(),   // We use Ducks by adding this enhancer to our store, and that's it!
)

// Show the initial store state structure data
const state = store.getState()
console.info('# Initial Store State:', JSON.stringify(state, null, 2))

// Show the initialized store state structure
// store.subscribe(() => console.info(store.getState()))

/**
 * Vanilla: Switchers
 */
assert.strictEqual(switcher.selectors.getStatus(), false)
switcher.operations.toggle()
assert.strictEqual(switcher.selectors.getStatus(), true)

/**
 * TypeSafe Actions: Counter
 */
assert.strictEqual(counter.selectors.getCounter(), 0)
counter.operations.tap()
assert.strictEqual(counter.selectors.getCounter(), 1)
assert.strictEqual(counter.selectors.getMeaningOfLife(3), 42)

/**
 * Epic Middleware: DingDong
 */
assert.strictEqual(dingDong.selectors.getDong(), 0)
dingDong.operations.ding()
assert.strictEqual(dingDong.selectors.getDong(), 1)

/**
 * Saga Middleware: PingPong
 *
 * Huan(202109): disable saga
 *  See: https://github.com/huan/ducks/issues/4
 */
// assert.strictEqual(pingPong.selectors.getPong(), 0)
// pingPong.operations.ping()
// assert.strictEqual(pingPong.selectors.getPong(), 1)

// Show the new store state structure data
console.info('# Final Store State:', JSON.stringify(store.getState(), null, 2))

/**
 * We can export the Ducks to provide the Ducks Bundles!
 */
export {
  counter,
  dingDong,
  switcher,
  // pingPong,
}
