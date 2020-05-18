#!/usr/bin/env ts-node

import { test } from 'tstest'

import { combineReducers } from 'redux'

import reducer from './reducers'

import * as actions from './actions'

test('counter reducer initial state', async t => {
  const INITIAL_STATE = {
    total: 0,
  }

  let state = reducer(undefined, {} as any)
  t.deepEqual(state, { total: 0 }, 'should return the initial state')

  state = reducer(INITIAL_STATE, actions.tap())
  t.deepEqual(state, { total: 1 }, 'should increase 1 after tap()')
})

test('counter reducer initial state', async t => {
  const INITIAL_STATE = {
    counter: {
      total: 0,
    },
  }

  const combinedReducer = combineReducers({
    counter: reducer,
  })

  let state = combinedReducer(undefined, {} as any)
  t.deepEqual(state, { counter: { total: 0 } }, 'should return the initial state')

  state = combinedReducer(INITIAL_STATE, actions.tap())
  t.deepEqual(state, { counter: { total: 1 } }, 'should increase 1 after tap()')
})
