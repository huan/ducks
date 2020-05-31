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
import test  from 'tstest'

import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
}                   from 'redux'

import { createEpicMiddleware } from 'redux-observable'
import createSagaMiddleware     from 'redux-saga'

import { Ducks } from './ducks'

import * as counterApi  from '../../examples/counter/'
import * as dingdongApi from '../../examples/ding-dong/'
import * as pingpongApi from '../../examples/ping-pong/'
import * as switcherApi from '../../examples/switcher/'

test('construction()', async t => {
  t.throws(() => new Ducks({}), 'should not happy with empty duckery')

  t.doesNotThrow(() => new Ducks({
    counter : counterApi,
    dong    : dingdongApi,
    pong    : pingpongApi,
  }), 'should be able to construct with ducks')
})

test('reducer()', async t => {
  const ducks = new Ducks({
    counter : counterApi,
  })

  const initialState = {}
  const store = createStore(
    state => state,
    initialState,
    compose(
      ducks.enhancer(),
    ),
  )

  void store
  // store.subscribe(() => console.info(store.getState()))

  const { counter } = ducks.ducksify()

  t.equal(counter.selectors.getCounter(), 0, 'should get counter 0 after initialization')
  counter.operations.tap()
  t.equal(counter.selectors.getCounter(), 1, 'should get counter 1 after tap')
})

test('constructor() with option.middleware', async t => {
  const epicMiddleware = createEpicMiddleware()
  const sagaMiddleware = createSagaMiddleware()

  const ducks = new Ducks({
    dong    : dingdongApi,
    pong    : pingpongApi,
  })

  t.doesNotThrow(
    () => createStore(
      state => state,
      compose(
        ducks.enhancer(),
        applyMiddleware(
          epicMiddleware,
          sagaMiddleware,
        ),
      ),
    ),
    'should not throw when satisfied the middleware in Ducks constructor options',
  )
})

test('Epics & Sagas middlewares', async t => {
  const epicMiddleware = createEpicMiddleware()
  const sagaMiddleware = createSagaMiddleware()

  const ducks = new Ducks({
    dong    : dingdongApi,
    pong    : pingpongApi,
  })

  const {
    dong,
    pong,
  } = ducks.ducksify()

  const store = createStore(
    state => state,
    compose(
      ducks.enhancer(),
      applyMiddleware(
        epicMiddleware,
        sagaMiddleware,
      ),
    ),
  )

  void store

  t.equal(pong.selectors.getPong(), 0, 'should get pong 0 on initialization')
  t.equal(dong.selectors.getDong(), 0, 'should get dong 0 on initialization')

  pong.operations.ping()
  dong.operations.ding()

  t.equal(pong.selectors.getPong(), 1, 'should get pong 1 after operations.ping()')
  t.equal(dong.selectors.getDong(), 1, 'should get dong 1 after operations.ding()')
})

test('Ducks with other reducers work together', async t => {
  const ducks = new Ducks({
    counter : counterApi,
  })

  const { counter } = ducks.ducksify()

  const store = createStore(
    combineReducers({
      switch: switcherApi.default,
    }),
    compose(
      ducks.enhancer(),
    ),
  )

  void store
  // store.subscribe(() => console.info(store.getState()))

  t.equal(counter.selectors.getCounter(), 0, 'should get counter 0 on initialization')
  t.equal(store.getState().switch.status, false, 'should get false from switch status on initialization')

  counter.operations.tap()
  t.equal(counter.selectors.getCounter(), 1, 'should get counter 1 after tap')

  store.dispatch(switcherApi.actions.toggle())
  t.equal(store.getState().switch.status, true, 'should get true from switch status after dispatch actions.toggle()')
})

test('configureStore() smoke testing', async t => {
  const ducks = new Ducks({
    counter : counterApi,
  })

  const { counter } = ducks.ducksify()

  const store = ducks.configureStore()
  void store
  // store.subscribe(() => console.info(store.getState()))

  t.equal(counter.selectors.getCounter(), 0, 'should get counter 0 on initialization')
  counter.operations.tap()
  t.equal(counter.selectors.getCounter(), 1, 'should get counter 1 after tap')
})

test('configureStore() called twice', async t => {
  const ducks = new Ducks({
    counter : counterApi,
  })

  t.doesNotThrow(() => ducks.configureStore(), 'should not throw for the first time')
  t.throws(() => ducks.configureStore(), 'should throw for the second time')
})

test('ducksify(namespace & api)', async t => {
  const ducks = new Ducks({
    counter : counterApi,
    switcher: switcherApi,
  })

  const {
    counter,
    switcher,
  } = ducks.ducksify()

  const counterByName = ducks.ducksify('counter')
  const switcherByName = ducks.ducksify('switcher')

  const counterByApi = ducks.ducksify(counterApi)
  const switcherByApi = ducks.ducksify(switcherApi)

  t.equal(counter, counterByName, 'counter should be same with by name')
  t.equal(counter, counterByApi, 'counter should be same with by api')

  t.equal(switcher, switcherByName, 'switcher should be same with by name')
  t.equal(switcher, switcherByApi, 'switcher should be same with by api')
})
