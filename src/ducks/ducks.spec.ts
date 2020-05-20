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

import * as counterDuckAPI  from '../../examples/counter/'
import * as dingdongDuckAPI from '../../examples/ding-dong/'
import * as pingpongDuckAPI from '../../examples/ping-pong/'
import * as switchDuckAPI   from '../../examples/switch/'

import { Duck } from '../duck/duck'

test('construction()', async t => {
  t.throws(() => new Ducks({}), 'should not happy without options.ducks')
  t.throws(() => new Ducks({ ducks: {} }), 'should not happy without options.ducks entry')

  const counterDuck = new Duck(counterDuckAPI)
  const dingdongDuck = new Duck(dingdongDuckAPI)
  const pingpongDuck = new Duck(pingpongDuckAPI)

  t.doesNotThrow(() => new Ducks({
    ducks: {
      counter : counterDuck,
      dong    : dingdongDuck,
      pong    : pingpongDuck,
    },
  }), 'should be able to construct with ducks')
})

test('reducer()', async t => {
  const counterDuck = new Duck(counterDuckAPI)

  const ducks = new Ducks({
    ducks: {
      counter : counterDuck,
    },
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

  t.equal(counterDuck.selectors.getCounter(), 0, 'should get counter 0 after initialization')
  counterDuck.operations.tap()
  t.equal(counterDuck.selectors.getCounter(), 1, 'should get counter 1 after tap')
})

test('constructor() missing option.middleware', async t => {
  const dingdongDuck = new Duck(dingdongDuckAPI)
  const pingpongDuck = new Duck(pingpongDuckAPI)

  const ducks = new Ducks({
    ducks: {
      dong    : dingdongDuck,
      pong    : pingpongDuck,
    },
  })

  t.throws(
    () => createStore(
      state => state,
      compose(
        ducks.enhancer(),
      ),
    ),
    'should throw when missing required middlewares in Ducks constructor options',
  )
})

test('constructor() with option.middleware', async t => {
  const dingdongDuck = new Duck(dingdongDuckAPI)
  const pingpongDuck = new Duck(pingpongDuckAPI)

  const epicMiddleware = createEpicMiddleware()
  const sagaMiddleware = createSagaMiddleware()

  const ducks = new Ducks({
    ducks: {
      dong    : dingdongDuck,
      pong    : pingpongDuck,
    },
    middlewares: {
      epicMiddleware,
      sagaMiddleware,
    },
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
  const dingdongDuck = new Duck(dingdongDuckAPI)
  const pingpongDuck = new Duck(pingpongDuckAPI)

  const epicMiddleware = createEpicMiddleware()
  const sagaMiddleware = createSagaMiddleware()

  const ducks = new Ducks({
    ducks: {
      dong    : dingdongDuck,
      pong    : pingpongDuck,
    },
    middlewares: {
      epicMiddleware,
      sagaMiddleware,
    },
  })

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

  t.equal(pingpongDuck.selectors.getPong(), 0, 'should get pong 0 on initialization')
  t.equal(dingdongDuck.selectors.getDong(), 0, 'should get dong 0 on initialization')

  pingpongDuck.operations.ping()
  dingdongDuck.operations.ding()

  t.equal(pingpongDuck.selectors.getPong(), 1, 'should get pong 1 after operations.ping()')
  t.equal(dingdongDuck.selectors.getDong(), 1, 'should get dong 1 after operations.ding()')
})

test('Ducks with other reducers work together', async t => {
  const counterDuck = new Duck(counterDuckAPI)

  const ducks = new Ducks({
    ducks: {
      counter : counterDuck,
    },
  })

  const store = createStore(
    combineReducers({
      switch: switchDuckAPI.default,
    }),
    compose(
      ducks.enhancer(),
    ),
  )

  void store
  store.subscribe(() => console.info(store.getState()))

  t.equal(counterDuck.selectors.getCounter(), 0, 'should get counter 0 on initialization')
  t.equal(store.getState().switch.status, false, 'should get false from switch status on initialization')

  counterDuck.operations.tap()
  t.equal(counterDuck.selectors.getCounter(), 1, 'should get counter 1 after tap')

  store.dispatch(switchDuckAPI.actions.toggle())
  t.equal(store.getState().switch.status, true, 'should get true from switch status after dispatch actions.toggle()')
})
