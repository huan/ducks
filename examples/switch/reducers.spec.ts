#!/usr/bin/env ts-node

import { test } from 'tstest'

import reducer from './reducers'

import * as actions from './actions'

test('toggle reducer initial state', async t => {
  let state = reducer(undefined, {} as any)
  t.deepEqual(state, { status: false }, 'should return the initial state')

  state = reducer(state, actions.toggle())
  t.deepEqual(state, { status: true }, 'should be true after taggle()')

  state = reducer(state, actions.toggle())
  t.deepEqual(state, { status: false }, 'should be false after taggle() again')
})
