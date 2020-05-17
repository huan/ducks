import {
  takeEvery,
  put,
}               from 'redux-saga/effects'

import * as actions from './actions'
import * as types   from './types'

function * emitDong () {
  put(actions.pong())
}

function * watchPingSaga () {
  yield takeEvery(types.PING, emitDong)
}

export {
  watchPingSaga,
}
