/**
 * TODO:
 *  1. bind state mount point
 *    1. bind state to selectors
 *    1. bind store to perations
 *  1. implement enhancer for ducks for
 *    1. adding the reducer
 *    1. run the sagas/epics
 */
import {
  applyMiddleware,
  compose,
  createStore,
}                       from 'redux'

import { createEpicMiddleware } from 'redux-observable'
import createSagaMiddleware     from 'redux-saga'

import {
  Duck,
  Ducks,
}             from '../src'

import * as counterDuckAPI  from './counter'    // Vanilla Duck
import * as dingDongDuckAPI from './ding-dong'  // Redux Observable
import * as pingPongDuckAPI from './ping-pong'  // Redux Saga

const epicMiddleware = createEpicMiddleware()
const sagaMiddleware = createSagaMiddleware()

const counterDuck = new Duck(counterDuckAPI)
const dingDongDuck = new Duck(dingDongDuckAPI, 'you_can_override_the_mount_point')
const pingPongDuck = new Duck(pingPongDuckAPI)  // if the api lack of the `namespace` and not specified at here, then it will use a random generated a string

const ducks = new Ducks({
  epicMiddleware,
  sagaMiddleware,
})

const initialState = {}
const store = createStore(
  state => state,
  initialState,
  compose(
    ducks.apply(
      counterDuck,
      dingDongDuck,
      pingPongDuck,
    ),
    applyMiddleware(
      epicMiddleware,
      sagaMiddleware,
    ),
  ),
)

counterDuck.selectors.getCounter()

// Before:
// counterDuck.selectors.getCounter(store)()
// counterDuck.operations.tap(store)()

// After:
counter.selectors.getConter()
counter.operations.tap()

export {
  counter as counterDuck,
}

store.subscribe(console.info)
