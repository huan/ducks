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
const dingDongDuck = new Duck(dingDongDuckAPI)
const pingPongDuck = new Duck(pingPongDuckAPI)

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

store.subscribe(console.info)

// Before:
// counterDuck.selectors.getCounter(store)()
// counterDuck.operations.tap(store)()

// After:
counterDuck.selectors.getCounter()
counterDuck.operations.tap()
counterDuck.selectors.getMeaningOfLife(3)

export {
  counterDuck,
  dingDongDuck,
  pingPongDuck,
}
