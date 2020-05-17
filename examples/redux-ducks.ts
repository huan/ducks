import {
  createStore,
  applyMiddleware,
}                     from 'redux'

import {
  Duck,
  Ducks,
}             from '../src/'

import counterDuck from './counter/'

const ducks = new Ducks()
ducks.use(
  counterDuck,
)

const initialState = {}
const store = createStore(
  ducks.reducer,
  initialState,
  applyMiddleware(ducks.middleware),
)

store.subscribe(console.info)
