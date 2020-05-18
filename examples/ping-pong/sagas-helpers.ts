import {
  put,
}             from 'redux-saga/effects'

import * as actions from './actions'

export function * emitPong () {
  yield put(actions.pong())
}
