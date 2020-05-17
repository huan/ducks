import {
  createStore,
  applyMiddleware,
}                       from 'redux'

import { createEpicMiddleware } from 'redux-observable'
import createSagaMiddleware     from 'redux-saga'

import {
  Ducks,
}             from '../src'

import * as counterDuck  from './counter'    // Vanilla Duck
import * as dingDongDuck from './ding-dong'  // Redux Observable
import * as pingPongDuck from './ping-pong'  // Redux Saga

const ducks = new Ducks()
ducks.use(
  counterDuck,
  dingDongDuck,
  pingPongDuck,
)

const epicMiddleware = createEpicMiddleware()
const sagaMiddleware = createSagaMiddleware()

const initialState = {}
const store = createStore(
  state => state,
  initialState,
  applyMiddleware(
    epicMiddleware,
    sagaMiddleware,
  ),
)

store.subscribe(console.info)
