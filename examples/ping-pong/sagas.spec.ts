#!/usr/bin/env node -r ts-node/register
import { test } from 'tstest'

import {
  takeEvery,
  put,
}               from 'redux-saga/effects'

import * as actions from './actions'
import * as sagas   from './sagas'
import * as types   from './types'

import {
  emitPong,
}           from './sagas-helpers'

test('pingSaga()', async t => {
  t.deepEqual(
    sagas.pingSaga().next().value,
    takeEvery(types.PING, emitPong),
    'should not get emitPong without actions.ping()',
  )
})

test('emitPong()', async t => {
  t.deepEqual(
    emitPong().next().value,
    put(actions.pong()),
  )
})
