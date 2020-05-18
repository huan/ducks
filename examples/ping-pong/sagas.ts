import {
  takeEvery,
}             from 'redux-saga/effects'

import * as types   from './types'

import {
  emitPong,
}             from './sagas-helpers'

function * pingSaga () {
  yield takeEvery(types.PING, emitPong)
}

export {
  pingSaga,
}
