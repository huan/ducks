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

const counter  = new Duck(counterDuckAPI)
const dingDong = new Duck(dingDongDuckAPI)
const pingPong = new Duck(pingPongDuckAPI)

const ducks = new Ducks({
  ducks: {
    counter,
    dingDong,
    pingPong,
  },
  middlewares: {
    epicMiddleware,
    sagaMiddleware,
  },
})

const initialState = {}
const store = createStore(
  state => state,
  initialState,
  compose(
    ducks.enhancer(),
    applyMiddleware(
      epicMiddleware,
      sagaMiddleware,
    ),
  ),
)

store.subscribe(() => console.info(store.getState()))

// Before:
// counterDuck.selectors.getCounter(store)()
// counterDuck.operations.tap(store)()

// console.info('state', store.getState())

// After:
console.info(counter.selectors.getCounter())
console.info(counter.operations.tap())
console.info(counter.selectors.getCounter())
console.info(counter.selectors.getMeaningOfLife(3))

export {
  counter,
  dingDong,
  pingPong,
}
